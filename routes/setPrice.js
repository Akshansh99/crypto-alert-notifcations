const express = require('express');
const fs = require("fs");
const router = express.Router();
const PriceCal = require("../functions/PriceCal")
const isSignedIn = require('../middleware/isSignedIn');
require("../functions/cronjob");

router.post('/',isSignedIn,(req,res)=>{
    const coin = req.body.coin.toString();

    //create a cookie for the coin chosen
    res.cookie('coinSet',coin);

    //redirect to choose the alert price
    res.redirect('/setPrice');
});
  
router.get('/',isSignedIn,async (req,res)=>{
    const {cookies} = req;

    //Fetching price of requested crypto
    const curr_price = await PriceCal(cookies.coinSet);
    const curr_value = parseFloat(curr_price.data.data.rates.USD);

    res.render("../views/setAlert.ejs",{
      //crypto name
      coin: cookies.coinSet,
      //crypto price
      coinPrice : curr_value,
      email: cookies.email
    })
});

router.post('/showDetails',async (req,res)=>{
  const {cookies} = req;
  const {price1} = req.body;

  //create cookie for the price alert
  res.cookie('price',price1.toString());

  //Fetching price of requested crypto
  const prices = await PriceCal(cookies.coinSet);
  const curr_val = prices.data.data.rates.USD;

  //check for lower or higher price alert
  let type_alert = (curr_val>=price1) ? "below":"above";

  //Adding to DB
  fs.readFile("database.json", "utf8", async(err, data)=>{

    let jsonObject = JSON.parse(data);
    let arr = jsonObject.jobs;

    //Max of 10 alerts allowed
    if(arr.length<10){

      //Alert Object
      const objAdd = {
        "price" : req.body.price1.toString(),
        "type" : type_alert,
        "email" : req.cookies.email.toString(),
        "coin" : cookies.coinSet.toString()
      }

      arr.push(objAdd);

      let json = JSON.stringify(jsonObject);
      fs.writeFile("database.json", json, "utf8", err => {
          if (err) console.log("Error in append ", err);
          else console.log("Successfully added in database");
        });
    }
  })

  //redirect to finished route
  res.redirect('/success');
});


module.exports = router;