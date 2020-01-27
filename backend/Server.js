const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser=require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

//mongodb setup
const dbRoute = 'mongodb://fullstack:Amarpreet96@ds125372.mlab.com:25372/amar_mongo';
mongoose.connect(dbRoute, { useNewUrlParser: true});

let db = mongoose.connection;
//event based connection
db.once('open',()=>{console.log("connected to database")});
db.on('error',console.error.bind(console,'MongoDB connection error :'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/welcome',(req,res)=>{
        res.json({ success: true });
});

router.get('/getData',(req,res)=>{
    Data.find((err,data)=>{
        if(err) return res.send({success: false, error:err})
        return res.send({success:true,data:data})
    })
});

router.post('/updateData',(req,res)=>{
    const {id,update} = req.body;
    Data.findByIdAndUpdate(id,update,{new: true},(err,data)=>{
        if(err) return res.send({success: false, error:err})
        return res.json({ success: true, model : data}); 
    });
});

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });

 router.post('/putData',(req,res)=>{
    let data = new Data();
    const {id,message} = req.body;
    if ((!id && id !== 0) || !message) {
        return res.json({
          success: false,
          error: 'INVALID INPUTS',
        });
      }
    data.id = id;
    data.message = message;
    data.save((err)=>{
        if(err) return res.send({success:false, error :err});
        return res.send({success:true})

    })
 });

  

// append /api for our http requests
app.use('/api', router);

app.listen(PORT,()=>{console.log(`http://localhost:${PORT}/api/welcome`)});

//https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274