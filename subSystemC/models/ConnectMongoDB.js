const express = require('express');
const {MongoClient} = require('mongodb');
const fastcsv = require("fast-csv");
const fs = require("fs");

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
    } catch (e) {
        console.error(e);
    }
}

// main().catch(console.error);


//insert docoment to mongo 
async function insertToMongo(msg){
    try{
        await client.connect();
        const p = await collection.insertOne(msg);
    }catch(e){
        console.error(e);
    }finally{
        client.close();
    }
};

async function wirteMongoToCSV(){
    // alert("in wirteMongoToCSV"); 
    await client.connect();
     
    await collection.find({}).toArray((err, data) => {
        if (err) throw err;
        console.log(data);
        const ws = fs.createWriteStream("callData.csv");
        fastcsv.write(data, { headers: true }).on("finish", function() {
            console.log("Write to callData.csv successfully!");
          }).pipe(ws);
      });
    //   return new Promise((res,rej)=>{res();});
};


module.exports = {MongoClient,
    insertToMongo ,
    wirteMongoToCSV};