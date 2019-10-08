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
     verify(){
          this.verify = true;
     }
     async sendVerifyEmail(){
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

}
