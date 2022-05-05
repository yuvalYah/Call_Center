const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const port = 3002;
const fs = require("fs");


const kafkaCuns = require('./controller/KafkaCunsumer');
const mongodb = require('./models/ConnectMongoDB');
const bigmlm  = require('./models/BigML');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//--------------ejs---------------------
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.render('Dashboard'));


app.get("/buildModel",async (req,res) => {
      await bigmlm.buildModel();
      res.redirect('/');

  })
  .get("/csv", mongodb.wirteMongoToCSV)
  .get('/predictCall/:city/:gender/:age/:prev/:prod/:mood', async (req, res) => {
      var arr = [  req.params.city,
                req.params.gender,
                req.params.age,
                req.params.prev,
                req.params.prod,
                req.params.mood];
    const value = await bigmlm.predict(arr);

    // alert(value);
    // res.redirect('/');
    // req.session['predictValue'] = value;
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/app.js" type="text/javascript"></script>
        <title>Document</title>
    </head>
    <body>
        <h1 align="center" style="color:rgb(16, 10, 118)">Predic result : ${value}</h1>
        <body style="background-color:rgb(174, 201, 235);">
        
        
    </body>
    </html>`;

    res.send(html);
    // res.sendFile('public/predict.html', {root: __dirname })
    // res.send("Prediction result : " + value);
    

});



server.listen(port, () => console.log(`System C app listening at http://localhost:${port}`));