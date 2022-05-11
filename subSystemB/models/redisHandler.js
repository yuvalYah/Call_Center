// const schedule = require("node-schedule");
// const redis = require("ioredis");
// var uuid = require("node-uuid");
//
// const conn = {
//     port: 6379,
//     host: "127.0.0.1",
//     db: 0
// };
//
// const _redisClient = new redis(conn);
//
// function _flushAll(callBack) {
//     _redisClient.flushall((err, success) => {
//         if (err) {
//             throw new Error(err);
//         }
//         callBack(success);
//     });
// }
//
// var Standbytime = [[], [], [], [], [], [], [], [], [], []];
// module.exports = {
//
//     // connectRedis: () => {
//     //     return _redisClient.connect();
//     // },
//
//     sendData: (param) => {
//         var myObj = JSON.parse(param);
//         const date = Date.now();
//         const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'})
//         const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date)
//         var key = hour + ":" + minute
//
//         _redisClient.lpush(key, myObj.totalTime, (err, reply) => {
//             if (err) throw err;
//         })
//         if (myObj.topic == "joining") {
//             _redisClient.lpush("joining", 1, (err, reply) => {
//                 if (err) throw err;
//             })
//         } else if (myObj.topic == "service") {
//             _redisClient.lpush("service", 1, (err, reply) => {
//                 if (err) throw err;
//             })
//         } else if (myObj.topic == "complaint") {
//             _redisClient.lpush("complaint", 1, (err, reply) => {
//                 if (err) throw err;
//             })
//         } else if (myObj.topic == "disconnection") {
//             _redisClient.lpush("disconnection", 1, (err, reply) => {
//                 if (err) throw err;
//             })
//         }
//         // redisDb.publish("message", param);
//     },
//
//     // getToRedis: (key) => {
//     //     const response = new Promise((resolve, reject) => {
//     //         _redisClient.lrange(key,0,-1 ,(err, reply) => {
//     //             if (err) throw err;
//     //             resolve(reply);
//     //         })
//     //     });
//     //     return response;
//     // },
//     // diconnectionAmount: () => {
//     //     if(_redisClient.get("disconnection").length){
//     //         return _redisClient.get("disconnection").length;
//     //     }
//     //     return null;
//     // },
//     avgWaitingTime10Min: () => {
//         for (let i = 0; i < 10; i++) {
//             const date = Date.now() - (60 * 1000 * i);
//             const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'})
//             const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date)
//             var key = hour + ":" + minute
//             var st_time = new Promise((resolve, reject) => {
//                 _redisClient.lrange(key, 0, -1, (err, reply) => {
//                     if (err) throw err;
//                     resolve(reply);
//                 })
//             });
//             st_time
//                 .then(data => {
//                     Standbytime[i] = data;
//                 })
//                 .catch(err => console.log(err));
//         }
//         var totalwaitime = 0
//         var count_calls = 0
//         var count_wtaitingformin = 0;
//         for (var i = 0; i < 10; i++) {
//             for (let j = 0; j < Standbytime[i].length; j++) {
//                 if (Standbytime[i].length > 0) {
//                     count_calls++;
//                     count_wtaitingformin += Number(Standbytime[i][j]);
//                 }
//             }
//         }
//         if (count_calls > 0) {
//             totalwaitime = count_wtaitingformin / count_calls;
//         }
//         return (totalwaitime / 60).toFixed(2)
//     },
//     setFlushingOnRedis: (hourToFlush, minToFlush) => {
//         const rule = new schedule.RecurrenceRule();
//         rule.hour = hourToFlush;
//         rule.min = minToFlush;
//         schedule.scheduleJob(rule, () => {
//             _flushAll((success) => {
//                 // controllers.restart();
//                 // socketHandler.getSocket().emit("resetUI");
//             });
//         });
//     }
//
// };
//

//////////////////////////////////////////////////////////////////////////////////////////
const schedule = require("node-schedule");
const redis = require("ioredis");
var uuid = require("node-uuid");
let Standbytime = [[], [], [], [], [], [], [], [], [], []];
let Standbytime2 = [[], [], [], [], [], [], [], [], [], []];
const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0
};
var topicCalls = {};
const _redisClient = new redis(conn);
module.exports=  {
     _flushAll: () => {
        _redisClient.flushall((err, success) => {
            if (err) {
                throw new Error(err);
            }
            // callBack(success);
        });
    },

    sendData: (param) => {
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
    },

     avgWaitingTime10Min: () => {
        var st_time = "";
        for (let i = 0; i < 10; i++) {
            const date = Date.now() - (60 * 1000 * i);
            const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'})
            const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date)
            var key = hour + ":" + minute
            st_time = new Promise((resolve, reject) => {
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
        return (totalwaitime / 60).toFixed(2); // yuval check now return good
    },

    avgWaitingTime5Min: () => {
        var st_time = "";

        for (let i = 0; i < 5; i++) {
            const date = Date.now() - (60 * 1000 * i);
            const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'});
            const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date);
            var key = hour + ":" + minute;
            st_time = new Promise((resolve, reject) => {
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
        var total= (totalwaitime / 60).toFixed(2);


        // console.log("in rediseHendler in avgWaitingTime5Min result : " + (totalwaitime / 60).toFixed(2));

        return total;
    },
    ////// help function get this time and calculate avg time
    // avgWaitingTime5Min: (hour , min) => {
    //     var st_time = "";
    //     var myHour = hour, myMin = min;
    //
    //     for (let i = 0; i < 5; i++) {
    //
    //         var key = myHour + ":" + (myMin-i);
    //
    //         st_time = new Promise((resolve, reject) => {
    //             _redisClient.lrange(key, 0, -1, (err, reply) => {
    //                 if (err) throw err;
    //                 resolve(reply);
    //             })
    //         });
    //         st_time.then(data => {
    //                 Standbytime2[i] = data;
    //
    //             }).catch(err => console.log(err));
    //         if(myMin == 0){
    //             myHour = (hour-1);
    //             myMin = 59;
    //         }
    //     }
    //     var totalwaitime = 0
    //     var count_calls = 0
    //     var count_wtaitingformin = 0;
    //     for (var i = 0; i < 10; i++) {
    //         for (let j = 0; j < Standbytime2[i].length; j++) {
    //             if (Standbytime2[i].length > 0) {
    //                 count_calls++;
    //                 count_wtaitingformin += Number(Standbytime2[i][j]);
    //             }
    //         }
    //     }
    //     if (count_calls > 0) {
    //         totalwaitime = count_wtaitingformin / count_calls;
    //     }
    //     var total= (totalwaitime / 60).toFixed(2);
    //
    //     return total;
    // },
    // avgWaitingTime5MinFromMidNight:() => {
    //      var ret =[[],[]];
    //      const date = Date.now();
    //      const dateTimeFormat = new Intl.DateTimeFormat('en', {hour: 'numeric', minute: 'numeric'});
    //      const [{value: hour}, , {value: minute}] = dateTimeFormat.formatToParts(date);
    //      for (var i = 0; i <= hour ; i++) {
    //          for (var j = 0; j <= minute ; j+=5) {
    //             if( i == hour && j>minute) break;
    //             ret[0].push(i+":"+j);
    //             ret[1].push(this.avgWaitingTime5Min(i,j));
    //          }
    //
    //      }
    //      console.log("ret[0]" + ret[0]);
    //      console.log("ret[1]" + ret[1]);
    //      return ret;
    //
    //
    //
    // },

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
    },

    topic: () => {
        var joining = new Promise((resolve, reject) => {
            _redisClient.lrange("joining", 0, -1, (err, reply) => {
                if (err) throw err;
                resolve(reply);
            })
        });
        joining.then(data => topicCalls.joining = data.length)
        var complaint = new Promise((resolve, reject) => {
            _redisClient.lrange("complaint", 0, -1, (err, reply) => {
                if (err) throw err;
                resolve(reply);
            })
        });
        complaint.then(data => topicCalls.complaint = data.length)
        var disconnection = new Promise((resolve, reject) => {
            _redisClient.lrange("disconnection", 0, -1, (err, reply) => {
                if (err) throw err;
                resolve(reply);
            })
        });
        disconnection.then(data => topicCalls.disconnection = data.length)
        var service = new Promise((resolve, reject) => {
            _redisClient.lrange("service", 0, -1, (err, reply) => {
                if (err) throw err;
                resolve(reply);
            })
        });
        service.then(data => topicCalls.service = data.length)
        //console.log(ProductCalls);
        return topicCalls;
    }
}



