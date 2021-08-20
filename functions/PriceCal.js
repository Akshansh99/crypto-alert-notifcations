const axios = require('axios');

const PriceCal = async (coin) =>{
    try{
        return await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${coin}`);
    }
    catch(error){
        console.log("Err");
    }

}

module.exports = PriceCal;