const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const bigml = require("bigml");
const mongo = require("../models/ConnectMongoDB");
const bigmlcon  = require("../models/BigML");

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
const topic = `${prefix}new`;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

const consumer = new Kafka.KafkaConsumer(kafkaConf);

consumer.connect();

consumer.on("ready", function(arg) {
  console.log(`mongoDB consumer consuming`);
  consumer.subscribe([topic]);
  consumer.consume();
});

consumer.on("data", function(m) {
  console.log("data : ");
  console.log(m.value.toString());

  var temp = JSON.parse(m.value.toString());// parse from string to objct
  var toMongo = {};
  toMongo.city = temp.city;
  toMongo.gender = temp.gender;
  toMongo.age = temp.age;
  toMongo.prevCalls = temp.prevCalls;
  toMongo.mood = temp.mood;
  toMongo.product = temp.product;
  toMongo.topic = temp.topic;
  
  mongo.insertToMongo(toMongo);//add to mongo
 
});


module.exports.consumer = consumer;
// module.exports.myBuild = myBuild;