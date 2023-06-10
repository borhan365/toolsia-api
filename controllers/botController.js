
import { existsSync, mkdirSync, writeFileSync, readFile } from "fs";
import puppeteer from "puppeteer";

/*
1. Goto the brand url (https://medex.com.bd/brands)
2. In while loop for Paginations
3. In first page grab list of the product urls.
4. And goto the single page:
  1. Grab product name
  2. Descriptions
  3. Type
  4. Generic name
  5. Manufactured by
  6. Price
*/



const botController = async(req, res) => {
  // if screenshots directory is not exist then create one
  // if (!fs.existsSync("screenshots")) {
  //   fs.mkdirSync("screenshots");
  // }

  // await page.waitForNavigation({ waitUntil: 'networkidle' });

  let browser = null;

  try {

    if (!existsSync("Medicine")) {
      mkdirSync("Medicine");
    }

    // launch headless Chromium browser
    browser = await puppeteer.launch({ headless: false });
    // create new page object
    const page = await browser.newPage();
    let ItemArrObj = []

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);

    // // generics
    await page.goto('https://medex.com.bd/brands?page=723', {
      waitUntil: 'load',
      // Remove the timeout
      timeout: 0
  })

    // first wait for 10 seconds for first page copy
    await page.waitForSelector('.page-item')
    
    await page.waitForTimeout(3000);

    while (await page.$('.page-item:last-child a')) {
      
      // again wait for 10 seconds for next page loading. 
      await page.waitForTimeout(3000);
      // await page.click('.page-item:last-child a')

      if(await page.click('.page-item:last-child a')) {
        await page.click('.page-item:last-child a')
      } 

      // select all links
      await page.waitForSelector('.col-xs-12.col-sm-6.col-lg-4 a')
      const links = await page.$$eval('.col-xs-12.col-sm-6.col-lg-4 a', link => link.map(a => a.href));

      ItemArrObj.push(links)
    }

    // save file into local pc
    const path = './Medicine/brands.json';
    const existArrObj = (ItemArrObj.length > 0) && ItemArrObj

    try {
      writeFileSync(path, JSON.stringify(existArrObj.flat(1), null, 2), 'utf8');
      console.log('Brand data successfully saved');
    } catch (error) {
      console.log('An error has occurred in brand data', error);
    }

    // Read the JSON file
    readFile('./Medicine/brands.json', 'utf8', async (error, data) => {
    if(error){
     console.log(error);
     return;
    }

    // const newArray = Array.prototype.concat.apply([], JSON.parse(data));
    const newFlatArr = JSON.parse(data)

    // loop the imported links from local pc
    const singleProductData = []
    for (let link of newFlatArr) {
      const res = await getPageData(link, page);
      singleProductData.push(res)
    }

    console.log(singleProductData)
    res.send(singleProductData)

    // save file into local pc for product details
    const path = './Medicine/detils.json';
    const existSingleData = singleProductData ? singleProductData : null

    try {
      writeFileSync(path, JSON.stringify(existSingleData, null, 2), 'utf8');
      console.log('Single data successfully saved');
    } catch (error) {
      console.log('An error has occurred on single data', error);
    }

  })

  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    // await browser.close();
    console.log(`\n🎉 Bot landing successfully!`);
  }
}

async function getPageData(url, page) {
  
  await page.goto(url, { waitUntil: 'domcontentloaded'})

  await page.waitForSelector('.page-heading-1-l')
  const name = await page.$eval('.page-heading-1-l span:last-child', name => name.innerText)
  const type = await page.$eval('.page-heading-1-l span small', type => type.innerText)
  const generic = await page.$eval('.col-xs-12.brand-header div:nth-child(2)', type => type.innerText)
  const strength = await page.$eval('.col-xs-12.brand-header div:nth-child(3)', type => type.innerText)
  const manufacturedBy = await page.$eval('.col-xs-12.brand-header div:nth-child(4)', type => type.innerText)

  const price = await page.$eval('.col-xs-12.packages-wrapper .package-container', type => type.innerText)

  return {
    name,
    type,
    generic,
    strength,
    manufacturedBy,
    price
  }

}


export { botController };

