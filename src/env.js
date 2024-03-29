
module.exports={
     domain: "cs.stonybrook.edu",
     verifyEmailBody:(key)=>{
          return 'validation key: <'+key+'>';
     },
     verifySubject: "Please verify your email!",
     verifyAdmin: ()=>{return "auth@" + module.exports.domain},
     verifyEmail: (key,email)=>{
          return {
               from: module.exports.verifyAdmin(),
               to: email,
               subject: module.exports.verifySubject,
               text: module.exports.verifyEmailBody(key),
          };
     },
     debugEmail: "croye@cs.stonybrook.edu",
     statusOk: {"status": "OK"},
     statusError: {"status":"ERROR"},
     mongoUrl: ()=>{
          if(process.argv.includes("-d")){
               return "mongodb://mongo:27017/docker-node-mongo2"
          }else if(process.argv.includes("-stage")){
               return "mongodb://130.245.170.213:27017/docker-node-mongo"
          }else{
               return "mongodb://192.168.122.25:27017/docker-node-mongo"
          }
     }
}
