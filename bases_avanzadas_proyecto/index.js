const express = require('express');
const mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


const url = "mongodb+srv://A01229273:q383qd9ErKxu@basesavanzadas-i7ajq.mongodb.net/test";
const app = express();

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    const db = client.db('Psicologia')
    const collection = db.collection('Users');

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

    app.get('/register', function (req, res) {
        res.send('Hello World');
    })
     
    app.get('/login', function (req, res) {
       res.send('Hello World');
    })
   
  if (err) {
    console.error(err)
    return
  }
})


