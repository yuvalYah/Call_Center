
const redis = require("redis");
var uuid = require("node-uuid");

const client = redis.createClient();

(async () => {

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    // const value = await client.get('key');
})();

client.on('connect', function() {
    console.log('Connected!');
});

function  sendData (dataToSend){
    client.set(uuid(), dataToSend).then();
};

// function getAllCurrency(){
//     client.keys("Serial*", function (err, keys) {
//         var allCurrencyData = [];
//         var counter = keys.length;
//         keys.forEach(function (key, i) {
//             redisClient.hgetall(key, function (err, currencyData) {
//                 if(err)
//                     console.log("err");
//                 console.log(currencyData);
//                 allCurrencyData.push(currencyData);
//                 counter--;
//                 if(counter == 0){
//                     console.log("hereee");
//                 }
//                     // callback(null, allCurrencyData);
//             })
//         });
//     });
// };
// getAllCurrency(function(err, allCurrency){
//     console.log("allCurrency");
//
//     console.log(allCurrency);
// });

function getData(){

    // const collectionToReturn = [];
    // return new Promise((result, reject) => {
    //     client.lrange(whichList, 0, -1, (err, reply) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             result(_copyRedisOutputToCollection(reply, collectionToReturn));
    //
    //         }
    //     }).then();
    // });
} ;

// const _copyRedisOutputToCollection = (output, collection) => {
//     output.forEach((elem) => {
//         collection.push(elem);
//     });
//     return collection;
// };
function blabla(){
    client.hmset("this:that:a", {"one": 'two', "three": 'four'}).then();
    client.hmset("this:that:b", {"five": "six", "seven": "eight"}).then();
    var all_parts = {};

    client.keys("this:that:*", function(err, keys) {

        var count = keys.length;
        keys.forEach( function(key) {
            client.hgetall(key, function(err, obj) {
                all_parts[key] = obj;
                --count;
                if (count <= 0) {
                    console.log(all_parts);
                } else {
                    console.log('waiting');
                }
            });
        });
    });
};
blabla();
module.exports = {sendData, blabla};

