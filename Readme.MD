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
* Run in Browser
    ```javascript
    localhost:5000\start
    ```

## Usage

* Creating price alerts for cryptocurrencies. 
    * This is achieved using Nodemailer service in combination with Redis Queueing system.
    * Required fields i.e. `email`, `cryptocurrencies` and `alert price` are requested from the user.
    * Cron job is ran every 10 seconds to check if alert price should be triggered or not
    * API request is sent to Coinbase API for price reference.
    * If alert is triggered, we add it to redis queue which then processed.
    * In the processing step, we send an automated email using Nodemailer to the user's email Address. 

![Gif](https://github.com/Akshansh99/crypto-alert-notifcations/blob/master/public/gifs/working.gif)

## Useful Links

* Redis 
    * [What is redis?](https://redis.io/)
    * [Great Video on how to start with Redis Queue](https://www.youtube.com/watch?v=b7DJEAJZsG0&t=997s)
    * Bull JS - Bull is a Node library that implements a fast and robust queue system based on redis. [Read More](https://optimalbits.github.io/bull/)

* [Nodemailer](https://nodemailer.com/about/)
* [Cron-Job](https://en.wikipedia.org/wiki/Cron)


## Author
Akshansh Rewariya [@Akshansh99](https://github.com/Akshansh99)