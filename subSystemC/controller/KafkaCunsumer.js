const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const mongo = require("../models/MongoDB");

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
  //upload to mongo
  mongo.insertToMongo(m.value.toString());
});

module.exports.consumer = consumer;