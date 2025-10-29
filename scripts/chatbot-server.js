#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const buildService = require('../src/services/chatbotService');

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

const service = buildService();

app.get('/health', (req, res) => res.json({ ok: true, kurrals: service.kurrals.length }));

// Get a kurral by id
app.get('/kurral/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'invalid id' });
  const k = service.getKurralById(id);
  if (!k) return res.status(404).json({ error: 'not found' });
  res.json(k);
});

// Get adikaram info
app.get('/adikaram/:num', (req, res) => {
  const n = Number(req.params.num);
  if (isNaN(n)) return res.status(400).json({ error: 'invalid number' });
  const a = service.getAdikaramInfo(n);
  if (!a) return res.status(404).json({ error: 'not found' });
  // also include kurrals in that adikaram
  const kurrals = service.kurrals.filter(k => Number(k.adikaram_number) === n);
  res.json({ adikaram: a, kurrals });
});

// Chat endpoint: accepts { query, topN }
app.post('/chat', (req, res) => {
  const { query, topN } = req.body || {};
  if (!query || typeof query !== 'string') return res.status(400).json({ error: 'query (string) required' });
  const result = service.search(query, topN || 10);
  res.json({ query, result });
});

const port = process.env.PORT || 3947;
app.listen(port, () => {
  console.log(`Chatbot API listening on http://localhost:${port} — kurrals=${service.kurrals.length}`);
});
