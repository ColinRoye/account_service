const debug = require("./src/debug");
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const args = process.argv;
var port = 3000



app.use(bodyParser());


//optional port setting
if(args.includes("-p")){
     port = args[args.indexOf("-p")+1];
}




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
