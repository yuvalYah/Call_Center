const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 3000

//------------ kafka------------
const kafka = require('./controller/kafkaProduce');
const bodyParser = require('body-parser');

//------------MySQL-------------
const mysql = require('./models/MySqlConnect');
const clients = require('./clients.json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------


app.set('view engine', 'ejs');
app.use(express.static("public"));

// app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));
app.get('/', (req, res) => res.render('SaveUser' ,{data: clients}));


app.get('/CallCenterController.js', (req, res) => res.sendFile('Controller/CallCenterController.js', { root: __dirname }));
app.get('/MySqlConnect.js', (req, res) => res.sendFile('models/MySqlConnect.js', { root: __dirname }));
app.get('/data.js', (req, res) => res.sendFile('models/data.js', { root: __dirname }));




//------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { kafka.publishTotalCalls(msg) });
    socket.on("callDetails", (msg) => {
        console.log(msg);
        kafka.publishCallDetails(msg);
    });
});



//------------------------------------


server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


