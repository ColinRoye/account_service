const debug = require("debug");
const env = require("env");
const db = require("database");

var mongoose = require('mongoose');


module.exports={
     login: async (username, password)=>{
          if(!username){
               debug.log("email can't be blank");
               return env.statusError;
          }
          if(!password){
               debug.log("pass can't be blank");
               return env.statusError;
          }
          let ret;
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
          let verifcationKey = uuidv1();
          let user = {
               username: username,
               email: email,
               active: false,
               password: password,
               verificationKey: verifcationKey
          }
          let ret = await db.setUser(user);
          let key =
          //send verification email
          if(ret.status !== env.statusError){
               if(args.includes("-d")){
                    email = env.debugEmail;
               }
               debug.log("THIS IS SENDING TO THIS EMAIL: "+ email);
               debug.log("EMAIL JSON: " + env.verifyEmail(email,verificationKey));
               transporter.sendMail(env.verifyEmail(email,verificationKey));
          }

          return ret;

     },
     verify: async (username,verificationKey)=>{
          let ret;
          let user = await db.getUserByUsername(username);
          if(user.verificationKey === verificationKey){
               user.isVerified = true;
               ret.status = env.statusOk;
               db.setUser(user);
          }else{
               ret.stataus = env.statusError;
          }
          return ret;
     },



}
