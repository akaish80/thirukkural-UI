const fs = require('fs');
const path = require('path');
let Fuse = null;
try {
  // use fuse.js for better fuzzy matching when available
  // require dynamically so unit tests or environments without the package don't crash
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  Fuse = require('fuse.js');
} catch (e) {
  Fuse = null;
}

function safeLoadJson(filePath) {
  try {
    const txt = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(txt);
  } catch (err) {
    // return null so caller can try alternate paths
    return null;
  }
}

function loadPaalList() {
  const jsPath = path.join(__dirname, '..', 'Common', 'paalList_data.js');
  const jsonPath = path.join(__dirname, '..', 'Common', 'paalList_data.json');
  try {
    // try require first (works if it's a module exporting an array/object)
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const mod = require(jsPath);
    if (mod && (Array.isArray(mod) || typeof mod === 'object')) return mod;
  } catch (e) {
    // fallback to JSON
  }
  return safeLoadJson(jsonPath) || [];
}

function loadAikaram() {
  const file = path.join(__dirname, '..', 'Common', 'aikaram.json');
  return safeLoadJson(file) || [];
}

function loadKurralData() {
  const primary = path.join(__dirname, '..', 'Common', 'kurral_data.with_adikaram.json');
  const fallback = path.join(__dirname, '..', 'Common', 'kurral_data.cleaned.json');
  const orig = path.join(__dirname, '..', 'Common', 'kurral_data.json');
  return safeLoadJson(primary) || safeLoadJson(fallback) || safeLoadJson(orig) || [];
}

function normalizeText(s) {
  if (!s) return '';
  return String(s).toLowerCase();
}

function searchKurrals(kurrals, query, topN = 10) {
  if (!query) return [];
  const q = String(query).trim();

  // if fuse available, build or reuse index
  try {
    if (Fuse && Array.isArray(kurrals) && kurrals.length > 0) {
      const options = {
        keys: ['Tamil', 'English', 'Transliteration', 'EnglishMeaning', 'line1', 'line2'],
        threshold: 0.4,
        ignoreLocation: true,
        useExtendedSearch: true,
        includeScore: true,
      };
      const fuse = new Fuse(kurrals, options);
      const res = fuse.search(q, { limit: topN });
      return res.map(r => r.item);
    }
  } catch (e) {
    // fallback to simple search below
    // eslint-disable-next-line no-console
    console.warn('Fuse search failed, falling back to simple search:', e.message);
  }

  // fallback simple substring scoring
  const qnorm = normalizeText(q);
  const parts = qnorm.split(/\s+/).filter(Boolean);

  const scored = kurrals.map((item, idx) => {
    const t = [item.Tamil, item.English, item.Transliteration, item.EnglishMeaning, item.line1, item.line2]
      .filter(Boolean)
      .join(' | ')
      .toLowerCase();
    let score = 0;
    for (const p of parts) {
      if (t.includes(p)) score += 10;
      if (t.startsWith(p)) score += 5;
    }
    const kId = Number(item.Kurral_id || item.kurral_id || item.id);
    if (!isNaN(kId) && q === String(kId)) score += 100;
    return { idx, score, item };
  });

  const filtered = scored.filter(s => s.score > 0).sort((a,b) => b.score - a.score || a.idx - b.idx);
  return filtered.slice(0, topN).map(s => s.item);
}

function findByAdikaram(kurrals, adikaram) {
  const n = Number(adikaram);
  if (isNaN(n)) return [];
  return kurrals.filter(k => Number(k.adikaram_number) === n);
}

function findByPaal(paalList, paalNumber) {
  const n = Number(paalNumber);
  if (isNaN(n)) return null;
  return paalList.find(p => Number(p.paal_number || p.Paal_number) === n) || null;
}

module.exports = function buildService() {
  const paalList = loadPaalList();
  const aikaram = loadAikaram();
  const kurrals = loadKurralData();

  return {
    paalList,
    aikaram,
    kurrals,
    search(query, topN = 10) {
      // special parsing: if query mentions adikaram:NN or paal:NN or kurral:NN
      const q = String(query || '').trim();
      const mAd = q.match(/adikaram[:#\s]*(\d+)/i);
      if (mAd) return { adikaram: Number(mAd[1]), results: findByAdikaram(kurrals, mAd[1]) };
      const mP = q.match(/paal[:#\s]*(\d+)/i);
      if (mP) return { paal: Number(mP[1]), paalInfo: findByPaal(paalList, mP[1]), results: [] };
      const mK = q.match(/kurral[:#\s]*(\d+)/i) || q.match(/^(\d+)$/);
      if (mK) return { kurral: Number(mK[1]), results: kurrals.filter(k => Number(k.Kurral_id) === Number(mK[1])) };

      // fallback to fuzzy search across fields
      const results = searchKurrals(kurrals, q, topN);
      // also check if query contains words that match adikaram names
      const adMatch = aikaram.find(a => normalizeText(a.Tamil).includes(q) || normalizeText(a.English).includes(q));
      return { results, adikaramInfo: adMatch || null };
    },

    getKurralById(id) {
      return kurrals.find(k => Number(k.Kurral_id) === Number(id)) || null;
    },

    getAdikaramInfo(n) {
      return aikaram.find(a => Number(a.adikaram_number) === Number(n)) || null;
    }
  };
};
