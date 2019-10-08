
module.exports={
     domain: "cs.stonybrook.edu",
     verifyEmailBody:(key)=>{
          return 'validation key: <'+key+'>';
     },
     verifySubject: "Please verify your email!";,
     verifyAdmin: "auth@" + domain;,
     verifyEmail: (key,email)=>{
          return {
               from: verifyAdmin,
               to: email,
               subject: verifySubject,
               text: verifyEmailBody(key),
          };
     },
     debugEmail: "croye@cs.stonybrook.edu",
     statusOk: {"status": "OK"},
     statusError: {"status":"ERROR"}

}
