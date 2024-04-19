//require('dotenv').config()

const express = require('express') //This will get access to the react app - just like creating an object of express
const recipeRoutes=require('./routes/recipes')
const port=4000
const app=express() //creating an express app

const dbhelper=require('./helpers/helper')

//another middleware to get the body if say from post request
app.use(express.json())

//middleware - fire for all requests that comes in
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//routes 

/* API endpoints
              GET ( / - ROOT ), POST, DELETE, PATCH */

//a get request with request and response objects
// '/' denotes the root

/* No more needed-used just for testing
app.get('/',(req,res)=>{
    res.json({
        msg:'Welcm to the app'
    })
})*/

app.use('/api/recipes',recipeRoutes) //meaning that using /api/recipes can send requests

//listening to port 4000



//Connecting to mongodb

dbhelper.connection().then(()=>{
    console.log('DB connected');
    app.listen(port,()=>{
        console.log('Listening to port ',port)
    })
}).catch((err)=>{
    console.log('DB connection failed');
})
