const express = require('express');
const cron = require("node-cron");
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
const {sendNewEmail} = require("../queue/emailQueue");
const PriceCal = require("../functions/PriceCal")
const isSignedIn = require('../middleware/isSignedIn');
router.use(express.json({ extended: false }));


router.post('/',isSignedIn,(req,res)=>{
    const coin = req.body.coin.toString();
    //create a cookie for the coin chosen
    res.cookie('coinSet',coin);
    //redirect to choose the alert price
    res.redirect('/setPrice');
  });
  
router.get('/',isSignedIn,(req,res)=>{
    const {cookies} = req;
    //clear the cookie to choose another currency in future
    res.clearCookie('coinSet');
    res.render("../views/setAlert.ejs",{

      //crypto name
      coin: cookies.coinSet,
      //cryptp price
      coinPrice : 50
    })
});

const comparator = async (req)=>{

  //cron-job scheduled to run every 5 seconds
  const func = cron.schedule("*/5 * * * * *", async () => {

    //current price for the currency chosen
    const curr_price = await PriceCal("BTC");
    const curr_value = curr_price.data.data.rates.USD;


    const coin_val = parseInt((curr_value/1000000)*Math.random()*10*5);
    const rand_val = Math.random()*49000;
    console.log(`${curr_value} and ${rand_val}`);
    console.log("....and a cron job occurs");

    if(rand_val>=curr_value){
      await sendNewEmail({

        from: 'akshanshrewariya@gmail.com', // sender address
        to: "a@gmail.com", // list of receivers
        subject: "crypto alert", // Subject line
        // text: "Hello world?", // plain text body
        html: `<b> Hey BTC is at your alert price at ${req.cookies.price}. Invest now!</b>`, // html body
      });
    console.log("alert Triggered!");
    }

  },{
    scheduled:false
  });

  func.start();
}


router.post('/showDetails',async (req,res)=>{
  
  const {price1} = req.body;
  //create cookie for the price alert
  res.cookie('price',price1.toString());

  //current price of the chosen currency
  const prices = await PriceCal("BTC");
  const curr_val = prices.data.data.rates.USD;

  //check for lower or higher price alert
  //create cookie for the alert type
  if(curr_val>=price1) res.cookie("type","below");
  else res.cookie("type","above");

  //redirect to finished route
  res.redirect("/setPrice/finished");;
});

//final route 
router.get("/finished",async (req,res)=>{
  console.log(req.cookies.price);
  //cron-job is executed and checks for if alert is triggered
  comparator(req);
  res.send({status:"ok"});
})


module.exports = router;