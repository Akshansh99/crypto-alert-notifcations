const CronJob = require("cron").CronJob;
const PriceCal = require('./PriceCal');
const {sendNewEmail} = require("../queue/emailQueue");
const fs = require("fs");

//Cron-job function which runs every 10 seconds
const checkAlert = new CronJob("*/10 * * * * *", 
  async function () {

    //Fetching BTC and ETH current prices
    const priceBTC = await PriceCal("BTC");
    const priceETH = await PriceCal('ETH');
    const curr_price_BTC = priceBTC.data.data.rates.USD;
    const curr_price_ETH = priceETH.data.data.rates.USD;

    //Reading database.json which acts as temp DB for our app
    fs.readFile("database.json", "utf8", async (err, data)=>{
        const jsonObject = JSON.parse(data);
        
        //Array of alerts
        const arr = jsonObject.jobs;

        console.log("cron job working!!!")
  
        //Traversing Alerts array to find if alert should be triggered
        arr.forEach(async (alert,index) => {

            let curr_price = (alert.coin==="BTC")?curr_price_BTC:curr_price_ETH;

            //Alert should be triggered
            //TYPE = ABOVE
            //Usually used for selling at profit margin
            if(alert.type==="above"&&parseFloat(curr_price)>=parseFloat(alert.price)){
                console.log(alert.price);
                console.log(curr_price);
        
                //Adding send email request to Redis
                sendNewEmail({
                to: alert.email.toString(), // list of receivers
                subject: "crypto alert", // Subject line
                html: `<b> Hey ${alert.coin} is above your alert price of $${alert["price"]}. Invest now! </b>`, // html body
                });
    
                //Removing alert from DB
                await arr.splice(index,1);
        
                let json = JSON.stringify(jsonObject);
    
                fs.writeFile("database.json", json, "utf8",async (err) => {
                    if (err) console.log("Error in append ", err);
                    else console.log("Successfully deleted in database");
                });
        
            }
            //Alert should be triggered
            //TYPE = BELOW
            //Usually used for buying at low price
            else 
            if(alert.type==="below"&&parseFloat(curr_price)<=parseFloat(alert.price)){
                console.log(alert.price);
                console.log(curr_price);
        
                //Adding send email request to Redis
                sendNewEmail({
                to: alert.email.toString(), // list of receivers
                subject: "crypto alert", // Subject line
                html: `Hey ${alert.coin} is below alert price of $${alert["price"]}. Invest now!`, // html body
                });

                //Removing alert from DB
                await arr.splice(index,1);
        
                let json = JSON.stringify(jsonObject);
    
                fs.writeFile("database.json", json, "utf8", async (err) => {
                    if (err) console.log("Error in append ", err);
                    else console.log("Successfully deleted in database");
                });
            }
        });
    });
});

//Executing cron-job
checkAlert.start();
