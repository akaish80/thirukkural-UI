#!/usr/bin/env node
// Best-effort JSON recovery script (Node.js)
// Usage: node recover_kurral_json.js --input src/Common/kurral_data.json --output src/Common/kurral_data.cleaned.json --report src/Common/kurral_data.recovery_report.txt

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const argv = process.argv.slice(2);
  const out = { input: null, output: null, report: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if ((a === '--input' || a === '-i') && argv[i + 1]) {
      out.input = argv[++i];
    } else if ((a === '--output' || a === '-o') && argv[i + 1]) {
      out.output = argv[++i];
    } else if ((a === '--report' || a === '-r') && argv[i + 1]) {
      out.report = argv[++i];
    }
  }
  if (!out.input) {
    console.error('Missing --input');
    process.exit(2);
  }
  out.output = out.output || 'src/Common/kurral_data.cleaned.json';
  out.report = out.report || 'src/Common/kurral_data.recovery_report.txt';
  return out;
}

function extractObjects(text) {
  const objs = [];
  let i = 0;
  const n = text.length;
  while (i < n) {
    const start = text.indexOf('{', i);
    if (start === -1) break;
    let depth = 0;
    let inString = false;
    let escape = false;
    let j = start;
    for (; j < n; j++) {
      const ch = text[j];
      if (inString) {
        if (escape) {
          escape = false;
        } else if (ch === '\\') {
          escape = true;
        } else if (ch === '"') {
          inString = false;
        }
      } else {
        if (ch === '"') {
          inString = true;
        } else if (ch === '{') {
          depth++;
        } else if (ch === '}') {
          depth--;
          if (depth === 0) {
            objs.push(text.slice(start, j + 1));
            i = j + 1;
            break;
          }
        }
      }
    }
    if (j >= n) break;
  }
  return objs;
}

function simpleRepair(fragment) {
  // remove trailing commas before } or ]
  let repaired = fragment.replace(/,\s*([}\]])/g, '$1');
  // escape literal newlines inside strings by replacing actual newline chars with \n
  let out = '';
  let inString = false;
  let esc = false;
  for (let i = 0; i < repaired.length; i++) {
    const ch = repaired[i];
    if (inString) {
      if (esc) {
        out += ch;
        esc = false;
      } else if (ch === '\\') {
        out += ch;
        esc = true;
      } else if (ch === '"') {
        out += ch;
        inString = false;
      } else if (ch === '\n' || ch === '\r') {
        out += '\\n';
      } else out += ch;
    } else {
      out += ch;
      if (ch === '"') inString = true;
    }
  }
  return out;
}

function main() {
  const args = parseArgs();
  if (!fs.existsSync(args.input)) {
    console.error('Input file not found:', args.input);
    process.exit(2);
  }
  const text = fs.readFileSync(args.input, 'utf8');
  console.log(`Read ${text.length} chars from ${args.input}`);

  const frags = extractObjects(text);
  console.log(`Extracted ${frags.length} object fragments`);

  const recovered = [];
  const failures = [];
  for (let idx = 0; idx < frags.length; idx++) {
    const frag = frags[idx];
    try {
      const obj = JSON.parse(frag);
      recovered.push(obj);
      continue;
    } catch (eRaw) {
      const frag2 = simpleRepair(frag);
      try {
        const obj = JSON.parse(frag2);
        recovered.push(obj);
        continue;
      } catch (eRep) {
        failures.push({
          index: idx + 1,
          error_raw: String(eRaw),
          error_repaired: String(eRep),
          snippet: frag.slice(0, 400).replace(/\n/g, '\\n') + (frag.length > 400 ? '...' : ''),
        });
      }
    }
  }

  // write output
  const outDir = path.dirname(args.output);
  if (outDir && !fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(args.output, JSON.stringify(recovered, null, 2), 'utf8');

  let rpt = '';
  rpt += `Source: ${args.input}\n`;
  rpt += `Total fragments extracted: ${frags.length}\n`;
  rpt += `Successfully recovered objects: ${recovered.length}\n`;
  rpt += `Failed fragments: ${failures.length}\n\n`;
  for (const f of failures) {
    rpt += `--- Fragment index: ${f.index}\n`;
    rpt += `error_raw: ${f.error_raw}\n`;
    rpt += `error_repaired: ${f.error_repaired}\n`;
    rpt += `snippet: ${f.snippet}\n\n`;
  }
  fs.writeFileSync(args.report, rpt, 'utf8');

  console.log(`Wrote cleaned JSON to ${args.output} with ${recovered.length} objects`);
  console.log(`Wrote report to ${args.report} with ${failures.length} failures`);
}

main();
