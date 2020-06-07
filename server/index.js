const express = require('express');
const mongo = require('mongodb');
const bodyParser= require('body-parser')
const bcrypt = require('bcrypt');
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient;

const saltRounds = 10;

const url = "mongodb+srv://A01229273:q383qd9ErKxu@basesavanzadas-i7ajq.mongodb.net/test";
const app = express();

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}))
app.use(bodyParser.json({limit: '50mb', extended: true}));  
app.use(cors({origin: '*'}))

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    const db = client.db('Psicologia')
    const collection = db.collection('Users');

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

    app.post('/register', function (req, res) {
      bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
        collection.find({email:req.body.email}).toArray().then((item)=>{
            if(item.length>0){
                res.status(400).send('Existente'); 
            }else{
                collection.insertOne({name:req.body.name,email:req.body.email,type:req.body.type,password:hash,citas:null}).then((response)=>{
                    res.status(200).send(response);  
                }).catch((err)=>{
                    res.status(500).send("No se pudo insertar");  
                    console.log(err);
                })
            }
        }).catch((err)=>{
            res.status(500).send("No se pudo insertar");  
             console.log(err);
        })
      });
    })
     
    app.post('/login', function (req, res) {
      collection.find({email:req.body.email}).toArray().then((item)=>{
        if(item.length>0){
            if (! bcrypt.compareSync(req.body.password, item[0].password)){
                res.status(401).send('Contraseña erronea'); 
            }else{
                res.status(200).send(item); 
            }
        }else{
            res.status(401).send('No Existente'); 
        }
      }).catch((err)=>{
          res.status(401).send('Error del servidor'); 
      }) 
    })

    app.post('/register-date', function (req, res) {

      collection.find({email:req.body.doctor.email}).toArray().then((item)=>{
        console.log(req.body)
        let tempItems;
        let tempItem = {
          date: req.body.date,
          hour: req.body.hour,
          started: req.body.started,
          doctor: req.body.doctor,
          patient: req.body.patient
        }
        if(item[0].citas == null){
          tempItems = []
          tempItems.push(tempItem);
        }else{
          tempItems = item[0].citas;
          tempItems.push(tempItem)
        }
        collection.updateOne({email:req.body.doctor.email},{$set:{citas:tempItems}}).then((item)=>{
        }).catch((err)=>{
          res.status(400).send('Error'); 
        })
      }).catch((err)=>{
          res.status(401).send('Error del servidor'); 
      }) 


      collection.find({email:req.body.email}).toArray().then((item)=>{
        let tempItems;
        let tempItem = {
          date: req.body.date,
          hour: req.body.hour,
          started: req.body.started,
          doctor: req.body.doctor,
          patient: req.body.patient,
          roomNumber: null
        }
        if(item[0].citas == null){
          tempItems = []
          tempItems.push(tempItem);
        }else{
          tempItems = item[0].citas;
          tempItems.push(tempItem)
        }
        collection.updateOne({email:req.body.email},{$set:{citas:tempItems}}).then((item)=>{
          res.status(200).send(tempItems); 
        }).catch((err)=>{
          console.log(err)
          res.status(400).send('Error'); 
        })
      }).catch((err)=>{
          console.log(err);
          res.status(401).send('Error del servidor'); 
      })

    })

    app.post('/get-citas', function (req, res) {
      collection.find({email:req.body.email}).toArray().then((item)=>{
        res.status(200).send(item); 
      }).catch((err)=>{
        console.log(err);
        res.status(500).send("No se pudo insertar");  
      })
    })

    app.post('/start_meeting', function (req, res) {
      collection.updateMany({'citas.date':req.body.date, 'citas.hour':req.body.hour, 'citas.doctor.email':req.body.doctor.email}, { $set: { 'citas.$.started': true, 'citas.$.roomNumber':req.body.roomNumber } }).then((item)=>{
        res.status(200).send(item); 
      }).catch((err)=>{
        console.log(err);
        res.status(500).send("No se pudo insertar");  
      })
    })
  

    app.get('/get-doctors', function (req, res) {
      collection.find({type:'psicologo'}).toArray().then((item)=>{
        res.status(200).send(item); 
      }).catch((err)=>{
        console.log(err);
        res.status(500).send("No se pudo insertar");  
      })
    })
   
  if (err) {
    console.error(err)
    return
  }
})


