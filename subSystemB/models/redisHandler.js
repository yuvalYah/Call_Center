
const redis = require("redis");
var uuid = require("node-uuid");

const client = redis.createClient();

(async () => {

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');
})();

client.on('connect', function() {
    console.log('Connected!');
});

function  sendData (dataToSend){
    client.set(uuid(), dataToSend).then();
};
module.exports = {sendData};

