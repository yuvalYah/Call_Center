const mongo = require("./ConnectMongoDB");
// const express = require('express');
const bigml = require('bigml');

const { cache } = require("ejs");
const connection = new bigml.BigML('yuvalpe000','2062dfd3ebbe871584a1e669e15518f40bf0118d');

const source = new bigml.Source(connection);
let modelInfo = {};


//to biuld new model
async function buildModel(){

    await mongo.wirteMongoToCSV();
    var source = new bigml.Source(connection);
    source.create('./callData.csv', function (error, sourceInfo) {
        if (!error && sourceInfo) {
            var dataset = new bigml.Dataset(connection);
            dataset.create(sourceInfo, function (error, datasetInfo) {
                if (!error && datasetInfo) {
                    var model = new bigml.Model(connection);
                    model.create(datasetInfo, function (error, model) {
                        if (!error && model) {
                            console.log("Model building successful! in code: " + model.code);
                            
                            modelInfo = model;
                        } else {
                            console.log("Error!! There is problom in creating model");
                        }
                    });
                } else {
                    console.log("Error!! There is problom in creating dataset");
                }
            });
        } else {
            console.log("Error!! There is problom in creating source");
        }
    });
    
}
//to predict the topic
function predict(arr){
    
    // if(modelInfo = {}){
    //     var str = "No Model available now! Please click \"Build Model\"";
    //     console.log(str);
    //     return str;
    // }
    console.log("User value : " + arr);

    const callToPredict = {'_id':1,'city':arr[0], 'gender': arr[1],'age':parseInt(arr[2]) , 'prevCalls':parseInt(arr[3]), 'product':arr[4]};
    const prediction = new bigml.Prediction(connection);
    //
    return new Promise((resolve,reject)=>{
        prediction.create(modelInfo, callToPredict ,function (error, predictionInfo) {
            if (!error && predictionInfo) {
                
                console.log("Prediction result :"+predictionInfo.object.output);
                resolve(predictionInfo.object.output);
            } else {
                console.log("Error in prediction");
            }
        });
        
    });
    
 
};

// buildModel();
module.exports = {buildModel ,predict};