const mongoose = require('mongoose')



const mongoDB_Url = process.env.mongoDB_Url;

mongoose.connect(mongoDB_Url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const db = mongoose.connection  ;

db.on('connected', ()=>{
    console.log("connected to mongodb server")
})

db.on('error', (err)=>{
    console.log("error while connecting", err)
})