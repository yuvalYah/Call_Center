const mongo = require("./ConnectMongoDB");

var bigml = require('bigml');

const { cache } = require("ejs");
var connection = new bigml.BigML('yuvalpe000','2062dfd3ebbe871584a1e669e15518f40bf0118d')

function initSocket() {
    console.log("init socket")
    socket = io.connect();
}
/**
 * PREDICTION & BUILD PREDICTION MODEL
 */

//to predict the topic
async function predict(){
    // alert("predict");

}

//to biuld new model
async function buildModel(){
    // console.log("Dfdf");
   
   

    // await mongo.wirteMongoToCSV();
    
    var source = new bigml.Source(connection);
    source.create('./callData.csv', function(error, sourceInfo) {
    if (!error && sourceInfo) {
        var dataset = new bigml.Dataset(connection);
        dataset.create(sourceInfo, function(error, datasetInfo) {
        if (!error && datasetInfo) {
            var model = new bigml.Model(connection);
            model.create(datasetInfo, function (error, modelInfo) {
            if (!error && modelInfo) {
                var prediction = new bigml.Prediction(connection);
                prediction.create(modelInfo, {'petal length': 1},function(error, prediction) { console.log(JSON.stringify(prediction));console.log(prediction.code)}); 
            }
            });
        }
        });
    }
    });
    // alert("in wirteMongoToCSV");  
    
}
// buildModel();
module.exports = {buildModel};