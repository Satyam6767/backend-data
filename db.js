const mongoose = require('mongoose')


// const mongoUrl = 'mongodb://localhost:27017/connectdb';

// const mongoUrl = 'mongodb+srv://satyamkumar6767:H6wKPADVeSfX5630@cluster0.wmbaq.mongodb.net/'


const mongoUrl = process.env.mongoDB_Url;

mongoose.connect(mongoUrl, {
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