import { existsSync, mkdirSync, writeFileSync } from "fs";
import puppeteer from "puppeteer";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrapeWebsite = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    if (!existsSync("Medicine")) {
      mkdirSync("Medicine");
    }

    await page.goto('https://medex.com.bd/generics?herbal=1');
    await page.waitForSelector('.col-xs-12.col-sm-6');

    const hrefs = await page.$$eval('.col-xs-12.col-sm-6 .row.data-row .col-xs-12.data-row-top.dcind-title', (elements) =>
      elements.map((el) => el.innerText.trim())
    );

    const generic = hrefs.map((name) => ({
      en: {
        name: name,
        excerpt: "",
        description: ""
      },
      bn: {
        name: "",
        excerpt: "",
        description: ""
      },
      common: {
        thumb: "",
        monograph: "",
      }
    }));

    const lastPageNumber = await page.$$eval('.pagination .page-item:not(.disabled) .page-link', (links) => {
      const lastPageLink = links[links.length - 2];
      return parseInt(lastPageLink.textContent);
    });

    for (let pageIdx = 2; pageIdx <= lastPageNumber; pageIdx++) {
      try {
        await page.goto(`https://medex.com.bd/generics?herbal=1&page=${pageIdx}`);
        await page.waitForSelector('.col-xs-12.col-sm-6');

        const pageHrefs = await page.$$eval('.col-xs-12.col-sm-6 .row.data-row .col-xs-12.data-row-top.dcind-title', (elements) =>
          elements.map((el) => el.innerText.trim())
        );

        const pageGeneric = pageHrefs.map((name) => ({
          en: {
            name: name,
            excerpt: "",
            description: ""
          },
          bn: {
            name: "",
            excerpt: "",
            description: ""
          },
          common: {
            thumb: "",
            monograph: "",
          }
        }));

        generic.push(...pageGeneric);

        console.log(`Scraped data from page ${pageIdx}`);

        // Add a delay of 1 second after each page
        await delay(1000);
      } catch (error) {
        console.error(`Error occurred on page ${pageIdx}:`, error);
      }
    }

    for (const item of generic) {
      const { name } = item.en;

      try {
        await page.goto(`https://medex.com.bd/generic/${encodeURIComponent(name)}`);
        await page.waitForSelector('.generic-data-container.en');

        const descriptionData = await page.$$eval('.generic-data-container.en > *', (elements) =>
          elements.map((el) => el.innerHTML)
        );

        const description = {
          indications: "",
          composition: "",
          description: "",
          mode_of_action: "",
          dosage: "",
          interaction: "",
          contraindications: "",
          side_effects: "",
          pregnancy_cat: "",
          drug_classes: "",
          storage_conditions: ""
        };

        for (const key of Object.keys(description)) {
          const selector = `#${key}`;
          const index = descriptionData.findIndex((data) => data.includes(selector));

          if (index !== -1) {
            const elementData = descriptionData[index];
            const element = document.createElement('div');
            element.innerHTML = elementData;

            const value = element.querySelector(selector)?.nextSibling?.textContent.trim();
            description[key] = value || "";
          }
        }

        item.en.description = description;

        console.log(`Scraped data for ${name}`);
      } catch (error) {
        console.error(`Error occurred for ${name}:`, error);
      }
    }

    await browser.close();

    res.json(generic);
    console.log("generic", generic);

    // save file into local pc
    const path = './Medicine/brands.json';

    try {
      writeFileSync(path, JSON.stringify(generic.flat(1), null, 2), 'utf8');
      console.log('Brand data successfully saved');
    } catch (error) {
      console.log('An error has occurred in brand data', error);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred during scraping.');
  }
};

export { scrapeWebsite };

