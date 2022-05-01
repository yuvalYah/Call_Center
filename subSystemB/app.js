const express = require('express');
const app = express();
var server = require('http').createServer(app);
const port = 3001
const kafkaConsumer = require('./controller/KafkaCunsumer');
const redisHandler = require("./models/redisHandler");

//--------------ejs---------------------
app.set('view engine', 'ejs');
app.use(express.static("public"));
const uiData = {totalWaitingCalls: 0};
app.get('/', (req, res) => {
    return res.render('ShowData', uiData);
});
// app.get('/DashboardController.js', (req, res) => res.sendFile('Controller/DashboardController.js', { root: __dirname }));
// app.get('/Dashboard.css', (req, res) => res.sendFile('Views/Dashboard.css', { root: __dirname }));

(async ()=> {
    kafkaConsumer.onTotalWaitingCallsMessage((total)=> {
        uiData.totalWaitingCalls=total;
    });

    kafkaConsumer.onCallDetailsMessage((callDetails)=> {

    });

    await kafkaConsumer.connectToKafka();
    await redisHandler.connectRedis();
    const hour = 0;
    const min = 0;
    redisHandler.setFlushingOnRedis(hour, min);
    const server = app.listen(port);
    // socketHandler.init(server);
    // socketHandler.configureConnections();
})();
