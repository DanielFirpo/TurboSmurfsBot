# TurboSmurfsBot
#### A basic web bot that checks https://turbosmurfs.gg/free-lol-account every 24 hours for you.

![Bot Screenshot](https://raw.githubusercontent.com/DanielFirpo/TurboSmurfsBot/master/GithubImages/Capture.PNG)

## What is this for?

I noticed that a website ([https://turbosmurfs.gg](https://turbosmurfs.gg)) is giving away free level 30 League of Legends smurf accounts on their "Free LoL Account" page ([https://turbosmurfs.gg/free-lol-account](https://turbosmurfs.gg/free-lol-account)).
The site lets you "open a lootbox" every 24 hours that usually contains a coupon, but also has a small chance to give you a free level 30 account. I've been wanting to learn how to make a web bot for a while now and this site seemed like a good way to do that.
This bot will check for a free account every 24 hours, so you can set it running and then forget about it, and it might grab you a free account!

## Installation

These instructions are for Windows but should be similar for OS X users.

#### 1. Install Node.js 

Install Node.js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/). Keep all install options default.

#### 2. Download Bot

Download the zip file from the green "Code" button at the top of this page.

![Download Screenshot](https://raw.githubusercontent.com/DanielFirpo/TurboSmurfsBot/master/GithubImages/tempsnip.png)

Unzip the downloaded folder.

####  3. Install npm packages.

Open a new cmd command prompt. Navigate inside the 'TurboSmurfsBot-master' folder you just unzipped (should contain bot.js and other files) with `cd` command. For example if you downloaded to your Desktop: `cd Desktop`, then `cd TurboSmurfsBot-master`.

Type `npm i`.

## Running

Open a new cmd command prompt. Navigate inside the 'TurboSmurfsBot-master' folder you unzipped (should contain bot.js and other files) with `cd` command. For example if you downloaded to your Desktop: `cd Desktop`, then `cd TurboSmurfsBot-master`.

Type `node bot.js`.

OR

Double click the `start.bat` file.


The bot will have you do some one-time setup, and after it will check every 24 hours for you. Check the console every 24 hours for results. The bot will also save a screenshot of any free account result in the bot's folder.

## Auto-Running on Startup

For Windows 8+

Right click `start.bat` > create shortcut.

Press windows key + R

Type `shell:startup` and press enter.

Copy/Cut `start.bat - Shortcut`, then paste into newly opened Startup folder.

The bot will now open automatically when Windows starts.
