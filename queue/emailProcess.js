const nodemailer = require("nodemailer");
const {PASSWORD,EMAIL,SERVICE} = require("../config");
//Create bull process which is executed if found in redis queue
const emailProcess = async (job) =>{

    try{

      //Email Information Object
      const obj = {
        "from" : EMAIL,
        ...job.data
      }

      //Instantiating mailing transport
      const transport = nodemailer.createTransport({
        service: SERVICE,
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },  
          tls: {
              rejectUnauthorized: false
          }
      });

      //Sending email
      let info = await transport.sendMail(obj);
      console.log("Message sent: %s", info.messageId);

    }
    catch(error){
      console.log(error);
    }

}

module.exports = emailProcess;