module.exports ={
     print: (str)=>{
          if(process.argv.includes("-d")){
               console.log("DEBUG: " + str)
          }
     }
}
