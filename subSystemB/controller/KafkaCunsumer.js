const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const redisHandler = require("../models/redisHandler");

let _consumer;
const prefix = "e3c3vg85-";
const totalCallsTopic = `${prefix}default`;
const callDetailsTopic = `${prefix}new`;

const genMessage = m => new Buffer.alloc(m.length, m);

let _totalWaitingCallsCallback, _callDetailsCallback;

module.exports = {
    connectToKafka: () => {

        const kafkaConf = {
            "group.id": "System B",
            "metadata.broker.list": "rocket.srvs.cloudkafka.com:9094",//"moped-01.srvs.cloudkafka.com:9094,moped-02.srvs.cloudkafka.com:9094,moped-03.srvs.cloudkafka.com:9094".split(","),
            "socket.keepalive.enable": true,
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "SCRAM-SHA-256",
            "sasl.username": "e3c3vg85",
            "sasl.password": "Cf8meDs5qoxAZZih62ZWGVDXljRrwful",
            "debug": "generic,broker,security"
        };

        _consumer = new Kafka.KafkaConsumer(kafkaConf);

        _consumer.on("ready", function (arg) {
            console.log(`Redis consumer consuming`);
            _consumer.subscribe([totalCallsTopic, callDetailsTopic]);
            _consumer.consume();
        });
        _consumer.on("data", function (message) {
            if (message.topic === totalCallsTopic) {
                console.log(`Total calls\n:${message.value.toString()}`);
                _totalWaitingCallsCallback(message.value.toString());


            } else {
                console.log(`call details: \n:${message.value.toString()}`);
                // _callDetailsCallback(message.value);
                redisHandler.sendData(message.value.toString());
            }
        });

        return new Promise((result, reject) => {
            _consumer.connect({}, (err => {
                if (err) {
                    reject(err);
                } else {
                    console.log("kafka connection succesfull")
                    result();
                }
            }));
        });
    },

    onTotalWaitingCallsMessage: (callback) => {
        _totalWaitingCallsCallback = callback
    },

    onCallDetailsMessage: (callback) => {
        _callDetailsCallback = callback
    },

};



