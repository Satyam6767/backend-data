const express = require('express');
const app = express();

const Person = require('./models/Person')
const db = require('./db')


const PORT = process.env.PORT || 9000
require('dotenv').config();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("new hello world")
})

app.listen(PORT, () => {
    console.log('server  run at 9000')

})

app.post('/person', async (req, res) => {

    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
    
});
app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType });
            console.log("response fetched");
            res.status(200).json(response);
        }
        else {
            res.status(400).json({ error: "invalid work type" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})



app.put('/:id',async (req, res)=>{
    try{

        const PersonId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(PersonId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        })
        if(!response)
        {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json(response);
    }
    
    catch(err){
        console.log(err);
       res.status(500).json({ error: "Internal server error" });
    }
} )



app.delete('/:id',async (req, res)=>{
    try{

        const PersonId = req.params.id;
        const DeletePersonData = req.body;

        const response = await Person.findByIdAndDelete(PersonId, DeletePersonData)
        if(!response)
        {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json({ message: 'Person deleted successfully' });
    }
    
    catch(err){
        console.log(err);
       res.status(500).json({ error: "Internal server error" });
    }
} )




























