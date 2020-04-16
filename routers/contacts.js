const express=require('express');
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('get contact')
})

router.post('/',(req,res)=>{
    res.send('add contact')
})

router.put('/:id',(req,res)=>{
    res.send('edit contact')
})

router.delete('/:id',(req,res)=>{
    res.send('delete contact')
})
module.exports=router;