//Initialisation of resources
const express = require('express'); 
const cookieParser = require("cookie-parser"); //cookie handler
const app = express();
const axios = require('axios'); //api request response handler
const PORT = process.env.PORT || 5000; // local and deployment port
const PriceCal = require('./functions/PriceCal');

app.use(express.json({ extended: false }));

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
      extended: true,
  })
);

app.use(cookieParser());

app.use('/start',require('./routes/signin.js')); //signing in routes
app.use('/selectCoin',require('./routes/selectCoin.js')); //crypto-currency selection
app.use('/setPrice',require('./routes/setPrice.js')); // setting price alert
app.use('/delete',require('./routes/delete.js')); //delete alerts

//Dummy coin information getter
app.get('/:coin',async (req,res)=>{

  try{
    //calling price calculator function
    const prices = await PriceCal(req.params.coin);
    //rendering data
    res.send(prices.data);
  }
  catch(error){
    console.error(error);
  }
});

//Server route
app.listen(PORT,()=>console.log(`The Server running on ${PORT}`));