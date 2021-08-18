//Initialisation of resources
const express = require('express'); 
const cookieParser = require("cookie-parser"); //cookie handler
const app = express();
const axios = require('axios'); //api request response handler
const PORT = process.env.PORT || 5000; // local and deployment port

// app.use(express.json({ extended: false }));

app.use(
  express.urlencoded({
      extended: true,
  })
);

app.use(cookieParser());

app.set("view engine", "ejs");

//Middleware for cookie authentication
const validateCookie = (req,res,next)=>{
  const {cookies} = req;

  //If there is no email stored in cookie, enter the email 
  if(!('email' in cookies)) next();
  //else redirect to the main page
  else res.redirect("/");
}

// Main start page
app.get("/start",validateCookie,(req,res)=>{

  //Simple render page asking for the email to be sent
  res.render("./signin.ejs");
});

// Select of cryptocurrency is selected through this route
app.get('/',(req,res)=>{
    console.log(req.cookies);

    //Dropdown menu of coins is implemented here
    res.render("./coinSelect.ejs",{
      //email from cookie is sent here
      email:req.cookies.email
    });
});

//dummy post route to find if our request is correct or not 
app.post('/home',(req,res)=>{
  res.json(req.body);
});

//sign in route Post route
app.post('/signin',validateCookie,(req,res)=>{
  //Parse user input into string
  const email = req.body.email.toString();
  
  //Add email to cookie
  res.cookie('email',email);
  
  //send success msg
  res.status(200).json({"msg" : "Signed in with email"})
});

//Dummy price route
app.get('/prices/:currencyPair',(req,res)=>{
    axios.get(`https://api.coinbase.com/v2/prices/${req.params.currencyPair}/buy`)
  .then(function (response) {
    // handle success
    // console.log(response.data);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
});

//PORT setup 
app.listen(PORT,()=>console.log(`The Server running on ${PORT}`));