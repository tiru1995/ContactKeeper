const express=require('express');
const router=express.Router()
const authmiddleware=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User =require("../models/user")
const contact=require('../models/contact')

router.get('/',authmiddleware,async(req,res)=>{
   try {
       const contacts=await contact.find({user:req.user.id}).sort({date:-1})
   res.json(contacts)
    } catch (error) {
       res.status(500).send('server error')
   }
})

router.post('/',[
    authmiddleware,
    [
    check('name','Name is required').not().isEmpty()]
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
           }
           const {name,email,phone,type}=req.body
           try {
               
            const newcontact=new contact({
                name,
                email,
                type,
                phone,
                user:req.user.id
            })
            const updatedcontact=await newcontact.save()
            res.json(updatedcontact)
           } catch (error) {
               console.log(errors.message)
               res.status(500).send('server error')
           }
}) 

router.put('/:id',(req,res)=>{
    res.send('edit contact')
})

router.delete('/:id',(req,res)=>{
    res.send('delete contact')
})
module.exports=router;