
const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
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
    var total= uiData.totalWaitingCalls;
    io.emit('totalWaitingCalls', total);
});

cron.schedule('* * * * * *', function () {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric' })
    const [{ value: hour }, ,{ value: minute }] = dateTimeFormat.formatToParts(date)
    var currTime = hour + ":" + minute;
    io.emit('currTime', currTime);
});


//Update topics call all day
cron.schedule('* * * * * *', function () {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric',second: 'numeric' })
    const [{ value: hour }, ,{ value: minute }, , {value: second}] = dateTimeFormat.formatToParts(date)
    var modlu = Number(minute) % 10;
    var modSec = Number(second) % 60;
    if( modSec < 2 && (modlu == 5 || modlu == 0)) {
        topic = redisController.sendEachTopicAmountToServer();
        io.emit('topic', topic);
    }
    //
});

cron.schedule('* * * * *', function () {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric' })
    const [{ value: hour }, ,{ value: minute }] = dateTimeFormat.formatToParts(date)
    var modlu = Number(minute) %10;
    if( modlu ==5  || modlu ==0) {
        var data = [hour , minute,redisController.sendAvgTime5MinToServer()];
        console.log( "x"+data[0] +"  y: " +data[1] + "  avg5min: "+ redisHandler.avgWaitingTime5Min());
        io.emit('avgWaitingTime5min', data);
    }
});
//sending every 5 mints total waiting calls to UI
cron.schedule('* * * * *', function () {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric' })
    const [{ value: hour }, ,{ value: minute }] = dateTimeFormat.formatToParts(date)
    var modlu = Number(minute) %10;
    console.log("uiData.totalWaitingCalls "+uiData.totalWaitingCalls);
    if( modlu == 5  || modlu ==0) {
        var data= [hour, minute, uiData.totalWaitingCalls];
        console.log(data);
        io.emit('totalWaitingCallsEvery5Min', data);
    }
});
/// flush all in 0:00
cron.schedule('* * * * *', function () {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric',minute: 'numeric' })
    const [{ value: hour }, ,{ value: minute }] = dateTimeFormat.formatToParts(date)
    if( hour == 0   && minute == 0) {
        redisHandler._flushAll();
        // console.log("redis flush all!");
    }
});

(async ()=> {

    kafkaConsumer.onTotalWaitingCallsMessage((total)=> {
        uiData.totalWaitingCalls=total;
        console.log("Recieved from kafka: " + total);
    });

    kafkaConsumer.onCallDetailsMessage((callDetails)=> {
        redisHandler.sendData(callDetails.value);
        // var topic = redisController.sendEachTopicAmountToServer();
        // console.log("joining: " +topic.joining);
        // console.log("complaint:"+ topic.complaint);
        // console.log("disconnection:"+ topic.disconnection);
        // console.log("service"+ topic.service);
        // io.emit('topic', topic);

    });

    await kafkaConsumer.connectToKafka();
    console.log("Kafka connected");
    // await redisHandler.connectRedis();
    console.log("Redis connected");
    redisController.avgWaitingTime5MinFromMidNight();
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
    io.emit("topic", redisController.sendEachTopicAmountToServer());
    // socket.emit("totalWaitingCalls", uiData.totalWaitingCalls);
    // socket.emit("avgWaitingTime10Min", redisController.sendAvgTime10MinToServer());
    // socket.emit("diconnectionAmount", redisController.sendDiconnectionAmountToServer());
});



