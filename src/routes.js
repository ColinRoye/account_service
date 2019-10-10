const express = require("express");
const app = express();
const router = require("express").Router();
const debug = require("./debug");
const env = require("./env");
const auth = require("./auth");
const service = require("./services");


router.post('/adduser', async (req, res, next)=>{
     console.log(test);
     let body = req.body;
     let ret = await service.addUser(body.username, body.password, body.email);
     res.send(ret.status);
});
router.post('/verify', async (req, res, next)=>{
     let body = req.body
     let ret = await service.verify(body.username, body.key);
     res.send(ret.status);
})
router.post('/login', async (req, res, next)=>{
     let body = req.body;
     let ret = await service.login(body.username, body.password);
     debug.log(ret.status)
     if(ret.cookie){
          res.cookie("auth", ret.cookie);
     }
     res.send(ret.status);
})
router.get('/login/:email/:password/:username', async(req, res, next)=>{
     let params = req.params
     ret = await service.login(params.username, params.password, params.email);
     if(ret.status === env.statusOk){
          res.cookie("auth", auth.createSession(username));
     }
     res.send(ret.status);
})
router.get('/logout', async(req, res, next)=>{
     let params = req.params
     //ret = await service.logout();
     //if(ret.status === env.statusOk){
     res.cookie("auth", "");
     //}
     res.send(env.statusOk);
})
// router.get('/auth', false, async(req,res,next)=>{
//      res.send(env.statusOk);
// })
module.exports = router
