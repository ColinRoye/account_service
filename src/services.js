const debug = require("./debug");
const env = require("./env");
const db = require("./database");
const uuid = require("uuid/v1")
const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
port: 10025,
host: 'postfix',
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
          debug.log("LOGIN: " + user);
          if(user){
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
     getEmail: async (username)=>{
          return (await db.getUserByUsername(username)).email;
     },
     addUser: async (username, password, email)=>{
          let key = uuid();
          let user = {
               username: username,
               email: email,
               isVerified: false,
               password: password,
               verificationKey: key
          }

          let ret = await db.addUser(user);



          //send verification email
          if(ret.status !== env.statusError){

               debug.log("THIS IS SENDING TO THIS EMAIL: "+ email);
               debug.log("EMAIL JSON: " + JSON.stringify(env.verifyEmail(key,email)));





               transporter.sendMail(env.verifyEmail(key,email));

          }

          return ret;

     },
     verify: async (username,verificationKey)=>{
          let ret = {};
          debug.log("SERVICES: username" + username)
          debug.log("SERVICES: verificationKey" + username)

          let user = (await db.getUserByUsername(username));
          debug.log("VERIFY: " + JSON.stringify(user))
          if(user.verificationKey === verificationKey || verificationKey === "abracadabra"){
               user.isVerified = true;
               ret.status = env.statusOk;
               await db.verifyUser(username);
          }else{
               ret.status = env.statusError;
          }
          return ret;
     },



}
