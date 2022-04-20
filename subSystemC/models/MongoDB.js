const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://yuval:callcenter@callcenter.aqnej.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const dbName = "callcenter"
const db = client.db(dbName);
const collection = db.collection("bigML");

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected correctly to server");
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//insert docoment to mongo 
async function insertToMongo(msg){
    const p = await collection.insertOne({"_id": msg});
};

module.exports = {insertToMongo };