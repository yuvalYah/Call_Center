const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const port = 3002;
// const fastcsv = require("fast-csv");
// const fs = require("fs");

const kafkaCuns = require('./controller/KafkaCunsumer');
const mongodb = require('./models/ConnectMongoDB');
const bigml  = require('./models/BigML');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//--------------ejs---------------------
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.render('Dashboard'));

app.post('/ConnectMongoDB.js', (req, res) => res.sendFile('./models/ConnectMongoDB.js', { root: __dirname }));

app.post('/BigML.js', (req, res) => res.sendFile('./models/BigML.js', { root: __dirname }));


///------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    // socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    // socket.on("callDetails", (msg) => {
    //     console.log(msg);
    //     kafka.publish(msg); 
    // });
});

server.listen(port, () => console.log(`System C app listening at http://localhost:${port}`));