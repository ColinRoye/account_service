var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('./../Config').secret;




var UserSchema = new mongoose.Schema({
     username: {
          type: String,
          unique: true,
     },
     password: {
          type: String,
     },
     email: {
          type: String,
          lowercase: true,
          unique: true, required: [true, "can't be blank"],
          match: [/\S+@\S+\.\S+/, 'is invalid'],
          index: true
     },
     verificationKey: String,
     isVerified: Boolean
});

UserSchema.plugin(uniqueValidator, {message: 'is already in use.'});

UserSchema.statics.addUser = (username, password, eamil)=>{
     this.username = username;
     this.email = email;
     this.active = false;
     this.setPassword(password);

}
UserSchema.methods.setPassword = (password)=>{
     this.password = password;
     this.save();
}
UserSchema.methods.validPassword = (password)=>{
     let ret;
     if(password == this.password){
          ret.status = env.statusOk
          debug.log("password matches");
     }else{
          ret.status = env.statusError;
          debug.log("password does NOT match");
     }
     return ret
}
UserSchema.methods.verify = (verificationKey)=>{
     let ret;
     if(verificationKey == this.verificationKey){
          this.isVerified = true;
          ret.status = env.statusOk;
          debug.log("verification key matches")
     }else{
          ret.status = env.statusError
          debug.log("verification key does NOT match");
     }
     return ret;
}
UserSchema.methods.sendVerificationEmail = ()=>{
     //if debug arg
     let email;
     if(args.includes("-d")){
          email = env.debugEmail;
     }else{
          email = this.email
     }
     debug.log("THIS IS SENDING TO THIS EMAIL: "+ email)
     debug.log("EMAIL JSON: " + env.verifyEmail(email,key))

     transporter.sendMail(env.verifyEmail(email,key))
}


mongoose.model('User', UserSchema);


const uuidv1 = require('uuid/v1');
const env = require('env')
class user{
     let id;
     let email;
     let username;
     let password;
     const transporter = nodemailer.createTransport({
          port: 25,
          host: 'localhost',
          tls: {
               rejectUnauthorized: false
          }
     });
     constructor(email, username, password){
          this.id = uuidv1();
          this.verificationKey = uuidv1();
          this.email = email;
          this.username = username;
          this.password = password;
          this.verified = fales;
     }


}
