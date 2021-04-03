const fs = require('fs')
const player = require('node-wav-player');
const puppeteer = require('puppeteer-extra')//puppeteer but with plugins

// stealth plugin to bypass cloudfare DDOS protection page
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let doPrizeCheck = async () => {

    const browser = await puppeteer.launch({ headless: true });

    try {

        console.log("\n\nChecking prize...\n\n")

        const page = await browser.newPage();

        const cookiesString = fs.readFileSync("cookies.json");
        const parsedCookies = JSON.parse(cookiesString);

        if (parsedCookies.length !== 0) {
            for (let cookie of parsedCookies) {
                await page.setCookie(cookie);
            }
        }
        await page.goto('https://turbosmurfs.gg/free-lol-account');
        await page.waitFor(10000);

        await page.click('#open_lootbox');

        await page.waitFor(15000);

        const result = await page.evaluate(() => {
            let resultElement = document.querySelector('#case-reward span')

            let resultText = resultElement ? resultElement.innerText : null;
            return resultText;
        });

        if (!result || result.indexOf("%") === -1) {
            //we got a free acc
            console.log("\n\nFree account! A screen shot of the prize result has been saved to file.\n\n")
            await page.screenshot({ path: 'freeacc.png', fullPage: true });

            player.play({
                path: 'freeaccalarm.wav',
            }).then(() => {
            }).catch((error) => {
                console.error(error);
            });

        }
        else {
            console.log("\n\nNot a free account, but you got: " + result + "\n\n")
        }

        browser.close();

        //record last time we checked prize
        fs.writeFile('lastcheck.txt', Date.now().toString(), error => {
            if (error) {
                console.error(error);
                return;
            }
        })

        //reschedule this same function, in 24 hours
        console.log("\n\nSuccessfully checked prize, new prize check scheduled to run in 24 hours.\n\n")
        setTimeout(doPrizeCheck, 86408000);

    }
    catch {
        console.log("\n\nError checking prize. Do you have internet?\n\n\n\n Trying again in 60 seconds.")
        browser.close();
        setTimeout(doPrizeCheck, 60000)
    }

};

module.exports = doPrizeCheck;