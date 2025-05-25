/* Scrape different resources available at UCI such as...
- ICS club websites
- UCI's Udemy
- career website
*/
import puppeteer from 'puppeteer';

(async () => {
    /* launch browser to open page */
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
    console.log(await page.content());

    await browser.close();
})();