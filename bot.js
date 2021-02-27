const puppeteer = require('puppeteer');
const fs = require('fs')
const readline = require("readline");
const input = require('readline-sync');
let doPrizeCheck = require("./prizeCheck");

doSetup();

function doSetup() {

    if (!fs.existsSync("lastcheck.txt")) {
        //first time running program, create file. set last checked to 24+ hours ago so we check now
        fs.writeFile('./lastcheck.txt', (Date.now() - 86409119).toString(), error => {
            if (error) {
                console.error(error);
                return;
            }
        })
    }

    //check if we've saved cookies yet, if we haven't open a browser and have user log in with discord
    if (fs.existsSync("cookies.json")) {
        startPrizeCheckLoop();
    } else {
        doUserAuth();
    }

}

function doUserAuth() {

    console.log("do user auth");

    let login = async () => {
        console.log("asynch");
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://turbosmurfs.gg/free-lol-account');

        async function readLine() {

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            return new Promise(resolve => {

                rl.question('\n\nThis bot requires you to log in with Discord on turbosmurfs.gg so it can save the cookies and use them in the future. \n\nThis bot will not save your password or username, and saved cookies can be deleted at any time (delete cookies.json). \n\n login with Discord on turbosmurfs.gg in the newly opened chrome window, then press enter here when finished.\n\n', (input) => {
                    rl.close();
                    resolve(input)
                });
            })
        }

        await readLine();//wait for user to press enter in console before continuing

        const cookiesObject = await page.cookies('https://turbosmurfs.gg/free-lol-account')

        fs.writeFile("cookies.json", JSON.stringify(cookiesObject),
            function (err) {
                if (err) {
                    console.log(`\n\nError saving session cookies.\n\n`);
                }
                console.log(`\n\nSuccessfully saved session cookies.\n\n`);

                browser.close();

                startPrizeCheckLoop();
            })
    }

    login();
}

function startPrizeCheckLoop() {
    fs.readFile('lastcheck.txt',
        { encoding: 'utf8', flag: 'r' },
        function (err, data) {
            if (err)
                console.log(err);
            else {
                if (Date.now() - data > 86408519) {
                    console.log("\n\nDoing prize check now.\n\n")
                    //it has been 24 hours since last check
                    doPrizeCheck();
                }
                else {
                    console.log("\n\nHas not been 24 hours since last check. Doing next prize check in " + (((86400000 - (Date.now() - data)) / 1000) / 60) / 60  + " hours.\n\n")
                    //has not been 24 hours, wait remaining time then check
                    setTimeout(doPrizeCheck, 86400000 - (Date.now() - data));
                }
            }
        });
}