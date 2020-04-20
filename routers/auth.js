const express=require('express');
const bcrypt=require('bcryptjs');
const config=require('config')
const jwt=require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User =require("../models/user")
const authmiddleware=require('../middleware/auth')
const router=express.Router()

router.get('/',authmiddleware,async(req,res)=>{
   try {
       const user= await User.findById(req.user.id).select('-password')
       res.json(user)
   } catch ( err) {
       res.status(500).send('server error')
   }
})

router.post('/',[check('email','please include a valid email').isEmail(),
check('password','password is required').exists()],async(req,res)=>{
    const errors =validationResult(req)
   if(!errors.isEmpty()){
return res.status(404).json({errors:errors.array()})
   }
const {email,password}=req.body

try {  
    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({mg:"Invalid creditional"})
    }
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch){
        return res.status(400).json({msg:'Invalid password'})
    }
    const payload={
        user:{
            id:user.id
        }
    }

jwt.sign(payload,config.get('jwtsecret'),{expiresIn:360000},(err,token)=>{
if(err) throw err
res.json({token})
})
} catch (err) {
    res.status(500).send('server error')
}

})

module.exports=router;