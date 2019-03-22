const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

let db

router.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  next();
});

MongoClient.connect('mongodb://sandbox:sandbox1@ds119930.mlab.com:19930/grocerylist', (err, database) => {
    if (err) return console.log(err)
    db = database.db('grocerylist')
})

router.get('/', (req, res) => {
  let cursor = db.collection("New-Item").find().toArray(function (err, result) {
      if (err) {
          return console.log(err)
  }
     res.send(result)
  })
})

router.post('/', (req, res) => {
   console.log(req.body)
    db.collection('New-Item').save(req.body, (err,result) =>{
        console.log(req.body)
        if (err) return console.log(err)
        console.log('saved to database')
        })
  })

  router.post('/new', (req , res) => {
    db.collection('New-Item').save(req.body, (err, result) =>{

    })
  })


module.exports = router 