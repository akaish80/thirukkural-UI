const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Example: Proxy endpoint
app.get('/api/getKurral', async (req, res) => {
  const targetUrl = 'https://api.mythirukurral.com/thirkurral/adikaram'; // e.g., /api/proxy?url=https://external.api/endpoint
  const apiKey = 'b2uz54VCfa5adH5YFDkmL73IWwJBEwUw4rk7TWGp';

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'x-api-key': apiKey,
        method: 'GET'
        // Add other headers if needed
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from target API', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});