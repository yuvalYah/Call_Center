const schedule = require("node-schedule");
const redis = require("ioredis");
var uuid = require("node-uuid");
var Standbytime = [[], [], [], [], [], [], [], [], [], []];

const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0
};

const _redisClient = new redis(conn);

function _flushAll(callBack) {
    _redisClient.flushall((err, success) => {
        if (err) {
            throw new Error(err);
        }
        callBack(success);
    });
}
function sendData (param)  {
    var myObj = JSON.parse(param);
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'})
    const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date)
    var key = hour + ":" + minute

    _redisClient.lpush(key, myObj.totalTime, (err, reply) => {
        if (err) throw err;
    })
    if (myObj.topic == "joining") {
        _redisClient.lpush("joining", 1, (err, reply) => {
            if (err) throw err;
        })
    } else if (myObj.topic == "service") {
        _redisClient.lpush("service", 1, (err, reply) => {
            if (err) throw err;
        })
    } else if (myObj.topic == "complaint") {
        _redisClient.lpush("complaint", 1, (err, reply) => {
            if (err) throw err;
        })
    } else if (myObj.topic == "disconnection") {
        _redisClient.lpush("disconnection", 1, (err, reply) => {
            if (err) throw err;
        })
    }
    // redisDb.publish("message", param);
}

function avgWaitingTime10Min () {
    for (let i = 0; i < 10; i++) {
        const date = Date.now() - (60 * 1000 * i);
        const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'})
        const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date)
        var key = hour + ":" + minute
        var st_time = new Promise((resolve, reject) => {
            _redisClient.lrange(key, 0, -1, (err, reply) => {
                if (err) throw err;
                resolve(reply);
            })
        });
        st_time
            .then(data => {
                Standbytime[i] = data;
            })
            .catch(err => console.log(err));
    }
    var totalwaitime = 0
    var count_calls = 0
    var count_wtaitingformin = 0;
    for (var i = 0; i < 10; i++) {
        for (let j = 0; j < Standbytime[i].length; j++) {
            if (Standbytime[i].length > 0) {
                count_calls++;
                count_wtaitingformin += Number(Standbytime[i][j]);
            }
        }
    }
    if (count_calls > 0) {
        totalwaitime = count_wtaitingformin / count_calls;
    }
    return (totalwaitime / 60).toFixed(2)
}

function setFlushingOnRedis(hourToFlush, minToFlush) {
    const rule = new schedule.RecurrenceRule();
    rule.hour = hourToFlush;
    rule.min = minToFlush;
    schedule.scheduleJob(rule, () => {
        _flushAll((success) => {
            // controllers.restart();
            // socketHandler.getSocket().emit("resetUI");
        });
    });
}
module.exports = {sendData,
    avgWaitingTime10Min,
    setFlushingOnRedis

};

