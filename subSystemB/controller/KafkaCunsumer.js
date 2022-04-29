const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const redisHandler = require("../models/redisHandler");

const kafkaConf = {
      "group.id": "call center",
      "metadata.broker.list": "rocket.srvs.cloudkafka.com:9094",//"moped-01.srvs.cloudkafka.com:9094,moped-02.srvs.cloudkafka.com:9094,moped-03.srvs.cloudkafka.com:9094".split(","),
      "socket.keepalive.enable": true,
      "security.protocol": "SASL_SSL",
      "sasl.mechanisms": "SCRAM-SHA-256",
      "sasl.username": "e3c3vg85",
      "sasl.password": "Cf8meDs5qoxAZZih62ZWGVDXljRrwful",
      "debug": "generic,broker,security"
};

const prefix = "e3c3vg85-";
const topic = `${prefix}default`;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

const consumer = new Kafka.KafkaConsumer(kafkaConf);

consumer.connect();

consumer.on("ready", function(arg) {
  console.log(`Redis consumer consuming`);
  consumer.subscribe([topic]);
  consumer.consume();
});

consumer.on("data", function(message) {
    console.log("data : ");
    console.log(message.value.toString());
  //upload to redis
  //   var temp = JSON.parse(message.value.toString());// parse from string to objct
  //   var toRedis = {};
  //   toRedis.city = temp.city;
  //   toRedis.gender = temp.gender;
  //   toRedis.age = temp.age;
  //   toRedis.prevCalls = temp.prevCalls;
  //   //time in year
  //   toRedis.product = temp.product;
  //   toRedis.topic = temp.topic;

    redisHandler.sendData(message.value.toString());
    redisHandler.getAllCurrency();

});

module.exports.consumer = consumer;