# Crypt Alert Notifier
A program to send automated crypto price alerts. Bitcoin and Ethereum supported as of now.

## Description
This program serves as a price tracking system for crypto enthusiasts and sends an automated email to notify if any alert is triggered. [Coinbase API](https://developers.coinbase.com/api/v2) is used in this application for fetching current market prices.

## Requirements

* Node.js
* Redis Server should be up and running
* An email id to send email alerts (Preferably not Gmail. [Read more.](https://nodemailer.com/usage/using-gmail/) )  

## Installation

* Clone the Repository.
* (IMP) Create a file `config.js` and store your `PASSWORD`, `EMAIL` & `SERVICE` (Email Provider) .

    ```javascript
    module.exports = {
        EMAIL: "YOUR_EMAIL",
        PASSWORD: "YOUR_PASSWORD",
        PROVIDER: "YOUR EMAIL PROVIDER" //GMAIL, HOTMAIL & OTHERS
    }
    ```
    [Refer here](https://nodemailer.com/smtp/well-known/) to see if your email provider is supported. 
* Install dependencies by
    ```javascript
    npm install
    ```
* Run the backend Server by
    ```javascript
    npm run server
    ```
## Author
Akshansh Rewariya [@Akshansh99](https://github.com/Akshansh99)