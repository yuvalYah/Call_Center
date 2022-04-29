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


app
  .get("/", bigmlm.buildModel)
  .get("/buildModel", bigmlm.buildModel)
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
    res.send("Prediction result : " + value);
    

})
;



server.listen(port, () => console.log(`System C app listening at http://localhost:${port}`));