const express=require('express');
const bcrypt=require('bcryptjs');
const config=require('config')
const jwt=require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User =require("../models/user")
const router=express.Router()

router.post('/',[
    check('name','Name isrequired')
    .not().
    isEmpty(),
    check('email','Please enter valid email').isEmail(),
    check('password', 'Please enter password with minimum 6 character')
    .isLength({min:6})
],async(req,res)=>{
   const errors =validationResult(req)
   if(!errors.isEmpty()){
return res.status(404).json({errors:errors.array()})
   }
const {email,password,name}=req.body
   try {
       let user =await User.findOne({email})
       if(user){
          return res.status(400).json({msg:'already user exist'})
       }
       user=new User({
           name,
           email,
           password
       })
       const salt =await bcrypt.genSalt(10);
       user.password= await bcrypt.hash(password,salt)
       await user.save()
       
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