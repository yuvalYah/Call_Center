// const express = require('express');
// const app = express();
// var server = require('http').createServer(app);
// const socketIO = require('socket.io');
// let _socket;
// const port = 4000;
// // const kafkaConsumer = require('./controller/KafkaCunsumer');
// const redisHandler = require("./models/redisHandler");
//
// //--------------ejs---------------------


//
// const uiData = {totalWaitingCalls: 0};
// app.get('/', (req, res) => {
//     res.render('ShowData', uiData);
// });
// app.get('/DashboardController.js', (req, res) => res.sendFile('Controller/DashboardController.js', { root: __dirname }));
// app.get('/Dashboard.css', (req, res) => res.sendFile('Views/Dashboard.css', { root: __dirname }));
//
//
// (async ()=> {
//     kafkaConsumer.onTotalWaitingCallsMessage((total)=> {
//         uiData.totalWaitingCalls=total;
//         _socket.emit("totalWaitingCalls", total);
//     });
//
//     kafkaConsumer.onCallDetailsMessage((callDetails)=> {
//         redisHandler.sendData(callDetails);
//     });
//
//     await kafkaConsumer.connectToKafka();
//     await redisHandler.connectRedis();
//     const hour = 0;
//     const min = 0;
//     redisHandler.setFlushingOnRedis(hour, min);
//
//     const server = express()
//         .use(app)
//         .listen(port, () => console.log(`Listening Socket on http://localhost:4000`));
//
//     const io = new socketIO(server);
//     io.on("connection", (socket) => {
//         _socket=socket;
//         console.log('new user connected');
//     });
// })();
//
//
//

const express = require('express');
const app = express();
const http = require('http');
// const server = http.createServer(app);
const socketIO = require('socket.io');
let _socket;
const port = 4000;


const kafkaConsumer = require('./controller/KafkaCunsumer');
const redisHandler = require("./models/redisHandler");
const redisController= require("./controller/redisController");
const cron = require('node-cron');

app.set('view engine', 'ejs');
app.use(express.static("public"));

const uiData = {totalWaitingCalls: 0};
app.get('/', (req, res) => {
    res.render('ShowData', uiData);
});
//----------Routers-----------//
app.get('/DataController.js', (req, res) => res.sendFile('controller/DataController.js', { root: __dirname }));
app.get('/ShowData.css', (req, res) => res.sendFile('views/ShowData.css', { root: __dirname }));



cron.schedule('* * * * * *', function () {
    var avg = redisHandler.avgWaitingTime10Min();
    io.emit('avgWaitingTime', avg)
});

cron.schedule('* * * * * *', function () {
    var topic = redisController.sendEachTopicAmountToServer();
    io.emit('topic', topic);
});
cron.schedule('* * * * *', function () {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric' })
    const [{ value: hour }, ,{ value: minute }] = dateTimeFormat.formatToParts(date)
    var modlu = Number(minute) % 10;
    if( modlu == 5 || modlu == 0) {
        var time = hour + ":" + minute;
        var data =  controller.Callsevery5minutes(time);
        io.emit('newdata5min', data)
    }
});

(async ()=> {

    kafkaConsumer.onTotalWaitingCallsMessage((total)=> {
        uiData.totalWaitingCalls=total;
        console.log("Recieved from kafka: " + total);
        // _socket.emit("totalWaitingCalls", total);
        // _socket.emit("avgWaitingTime10Min", redisController.sendAvgTime10MinToServer());
    });

    kafkaConsumer.onCallDetailsMessage((callDetails)=> {
        redisHandler.sendData(callDetails.value);
    });

    await kafkaConsumer.connectToKafka();
    console.log("Kafka connected");
    // await redisHandler.connectRedis();
    console.log("Redis connected");
    // const hour = 0;
    // const min = 0;
    // redisHandler.setFlushingOnRedis(hour, min);


})();

const server = express()
    .use(app)
    .listen(port, () => console.log(`Listening Socket on http://localhost:4000`));
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('a user connected');

    // socket.emit("totalWaitingCalls", uiData.totalWaitingCalls);
    // socket.emit("avgWaitingTime10Min", redisController.sendAvgTime10MinToServer());
    // socket.emit("diconnectionAmount", redisController.sendDiconnectionAmountToServer());
});



