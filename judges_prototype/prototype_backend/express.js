const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins for dev (restrict in prod)

app.use(cors({
    origin: "https://assist-squared.netlify.app"
}))

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

// Return data API
app.get('/api/resources', async (req, res) => {
  try {
    console.log(`hello`);
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

          /* nav page to url */
    await page.goto('https://career.uci.edu/');

    /* screen size */
    await page.setViewport({width: 1080, height: 1024});

    /* type into search box */
    await page.click('a[aria-label="Search Icon Link"');
    await page.type('.is-search-form', 'computer science');
    await Promise.all ([
        await page.click(".is-search-submit"),
        page.waitForNavigation({ waitUntil: 'networkidle0'})
    ]);

    /* get all page content from search query */
    // console.log(await page.content());
    var pgContent = await page.content();

    // fs.writeFile("output.txt", pgContent, (err) => {
    //     /* error catching */
    //     if (err) throw err;
    // })

    await browser.close();

    /* start creating data */
    const data = pgContent;

    const dom = new JSDOM(pgContent);
    const doc = dom.window.document;
    const titles = doc.querySelectorAll('h2.fl-post-title');
    // var urls = '';
    // var descriptions = '';

    for (let title of titles) {
      // urls += title.querySelectorAll('a');
      // descriptions += title.querySelectorAll('p');
      console.log(title.textContent);
    }

    // for (let url of urls) {
    //   console.log(url.textContent);
    // }

    // for (let desc of descriptions) {
    //   console.log(desc.textContent);
    // }

    // console.log(urls.textContent);
    // console.log(description.textContent);
    
    res.json(data)

  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Error fetching career page content' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
