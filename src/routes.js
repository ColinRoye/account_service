const express = require('express');
const app = express();
const router = require('express').Router();
const debug = require("debug");
const env = require("env");
const auth = require("auth");
const services = requrire("serices")



router.post('/adduser', async (req, res, next)=>{
     res.send(await service.addUser());
}
router.post('/verify', async (req, res, next)=>{
     res.send(await service.verify());
}
router.post('/login', async (req, res, next)=>{
     res.send(await service.login());
}
router.get('/login/:email/:password/:username', async(req, res, next)=>{
     let params = req.params
     result = await sesrvice.login(params.username, params.password, params.email);
     if(result.isSuccess){
          res.cookie("auth", auth.createSession(username));
     }
     res.send(result.status);
}
router.get('/auth', auth.verifySession, async(req,res,next)=>{
     res.send(env.statusOk);
}
