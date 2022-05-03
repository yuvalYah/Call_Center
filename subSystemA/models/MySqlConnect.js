const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
var c1=[111111111,"Yuval" , "Yahod" , "Petah Tikva" , "24-06-1998", "Female" , "0"];
var c2=[222222222,"Maayan" , "Sulimani" , "Rehovot" , "24-05-1995", "Female" , "0"];
var c3=[333333333,"Dvir" , "Cohen" , "Rehovot" , "14-02-1999", "Male" , "0"];
var cli=[c1 , c2,c3];


function initSocket() {
    //socket is global
    socket = io.connect("http://localhost:3000");
}

async function rendClientFromList(){  
    var ind = Math.floor(Math.random() * 3)
    return cli[ind];
}


//creat connection
const db = mysql.createConnection({
    host: 'localhost' ,
    user:'root',
    password:'ori7878',
    database: 'my_db'
})


//connect to MySql
// db.connect(err => {
//     if (err) throw err;
//     console.log("Connected!");
    
// })
// // Take rendome client from sql
// app.get('/getclients' , function(req, res) {
//     randomClient(function(err, results) {
//       if (err)
//         throw err; // or return an error message, or something
//       else
//         res.send(results); // as a demo, we'll send back the results to the client;
//                            // if you pass an object to 'res.send()', it will send
//                            // a JSON-response.
//     });
// });

let output;
  
const setOutput = (rows) => {
    output = rows;
    console.log(output);
}
  
db.connect(async(err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
    }
});
async function selectRandomClient(){  
    console.log("Connected to Database");
  
    let query = 'SELECT * FROM clients WHERE client_id = 111111111';
    await db.query(query, (err, rows) => {
        if (err) {
            console.log("internal error", err);
            return;
        }
          
        // This is the important function
        output =  rows;
    });
    return output;
}
async function rendClient(){
    console.log(output)
    return output;
}
// console.log(selectRandomClient())
// var x;
// setTimeout(() => { x = rendClient()}, 2000);
// setTimeout(() => { console.log(Promise.resolve(x.fuch(first_name)))}, 3000);


// // var masho = stam()
var x = rendClientFromList();
console.log(x[0]);
console.log(x);
// await db.query("SELECT client_id , first_name , last_name, city , birth_date, gender, prev_calls FROM clients ORDER BY RAND() LIMIT 1", 

module.exports = { selectRandomClient, rendClient ,rendClientFromList};


