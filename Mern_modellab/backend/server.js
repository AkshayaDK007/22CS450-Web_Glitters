const express = require('express') 
const studentroutes=require('./router/studentrouter')
const port=4000
const app=express() 
const dbhelper=require('./helper/helper')
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/attendance',studentroutes) 
dbhelper.connection().then(()=>{
    console.log('DB connected');
    app.listen(port,()=>{
        console.log('Listening to port ',port)
    })
}).catch((err)=>{
    console.log('DB connection failed');
})
