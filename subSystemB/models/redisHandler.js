const schedule = require("node-schedule");
const redis = require("redis");
var uuid = require("node-uuid");

let _redisClient = redis.createClient();

function _flushAll (callBack) {
    _redisClient.flushall((err, success) => {
        if (err) {
            throw new Error(err);
        }
        callBack(success);
    });
}

module.exports = {
    connectRedis: () => {
        return _redisClient.connect();
    },
    sendData: (dataToSend) =>{
        _redisClient.set(uuid(), dataToSend).then();
    },

    setFlushingOnRedis: (hourToFlush, minToFlush) => {
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
};

