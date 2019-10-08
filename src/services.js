const debug = require("./debug");
const env = require("./env");
const db = require("./database");
const uuid = require("uuid/v1")
const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
port: 25,
host: 'localhost',
tls: {
   rejectUnauthorized: false
},
});


module.exports={
     login: async (username, password)=>{
          debug.log("USERNAME:"+username)
          if(!username){
               debug.log("username can't be blank");
               return env.statusError;
          }
          if(!password){
               debug.log("pass can't be blank");
               return env.statusError;
          }
          let ret = {};
          let user = await db.getUserByUsername(username);

          if(!user){
               if(user.password === password){
                    ret.status = env.statusOk;
               }else{
                    ret.status = env.statusError;
                    debug.log("user exists, but password invalid")
               }
          }else{
               ret.status = env.statusError;
               debug.log("user does NOT exist")
          }
          return ret;

     },
     addUser: async (username, password, email)=>{
          let key = uuid();
          debug.log(username)
          let user = {
               username: username,
               email: email,
               isVerified: false,
               password: password,
               verificationKey: key
          }

          let ret = await db.addUser(user);
          debug.log("made it here 1")
          //send verification email
          if(ret.status !== env.statusError){
               if(process.argv.includes("-d")){
                    email = env.debugEmail;
               }
               debug.log("THIS IS SENDING TO THIS EMAIL: "+ email);
               debug.log("EMAIL JSON: " + JSON.stringify(env.verifyEmail(email,key)));

               transporter.sendMail(env.verifyEmail(email,key));

          }

          return ret;

     },
     verify: async (username,verificationKey)=>{
          let ret;
          let user = await db.getUserByUsername(username);
          if(user.verificationKey === verificationKey){
               user.isVerified = true;
               ret.status = env.statusOk;
               db.verifyUser(username);
          }else{
               ret.stataus = env.statusError;
          }
          return ret;
     },



}
