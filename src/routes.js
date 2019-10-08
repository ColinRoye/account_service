const express = require('express');
const app = express();
const router = require('express').Router();
const debug = require("debug");
const env = require("env");
const auth = require("auth");



router.post('/adduser', async (req, res, next)=>{
     let body = req.body;
     let ret = await service.addUser();
     res.send(ret.status);
}
router.post('/verify', async (req, res, next)=>{
     let body = req.boyd
     let ret = await service.verify(body.username, body.key);
     res.send(ret.status);
}
router.post('/login', async (req, res, next)=>{
     let body = req.body;
     let ret = await service.login(body.usermane, body.password);
     if(ret.cookie){
          res.cookie("auth", ret.cookie);
     }
     res.send(ret.status);
}
router.get('/login/:email/:password/:username', async(req, res, next)=>{
     let params = req.params
     ret = await service.login(params.username, params.password, params.email);
     if(ret.status === env.statusOk){
          res.cookie("auth", auth.createSession(username));
     }
     res.send(ret.status);
}
router.get('/auth', auth.verifySession, async(req,res,next)=>{
     res.send(env.statusOk);
}
