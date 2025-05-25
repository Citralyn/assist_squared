const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins for dev (restrict in prod)

// Proxy agreements API
app.get('/api/agreements', async (req, res) => {
  const { sendingInstitutionId } = req.query;
  const url = `https://assist.org/api/agreements?receivingInstitutionId=120&sendingInstitutionId=${sendingInstitutionId}&academicYearId=75&categoryCode=major`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching agreements' });
  }
});

// Proxy articulation API
app.get('/api/articulation/Agreements', async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'Missing key parameter' });
  }

  const url = `https://assist.org/api/articulation/Agreements?Key=${key}`;
  console.log(`Fetching articulation from: ${url}`);

  try {
    const response = await fetch(url);
    console.log(`Status: ${response.status}`);

    const text = await response.text(); // Read as text for better error logging
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (jsonError) {
      console.error('Failed to parse JSON:', text);
      res.status(500).json({ error: 'Invalid JSON from assist.org', raw: text });
    }
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Error fetching articulation' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
