const express =require('express');
const app=express();



app.get('/',(req,res)=>res.json({msg:'welcome to contactkeeper'}))
app.use('/api/users', require('./routers/users'))
app.use('/api/contacts', require('./routers/contacts'))
app.use('/api/auth', require('./routers/auth'))




const Port = process.env.PORT || 5000
app.listen(Port, ()=>console.log(`server is running in port ${Port}`))