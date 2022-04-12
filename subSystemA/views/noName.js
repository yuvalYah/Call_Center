const express = require('express')
const con_mysql = require('../models/MySqlConnect.js')
const app = express()
const port = 3000
class client{

}

async function init() {
    // while(1){
        const rndInt = Math.floor(Math.random() * 20) + 1
        console.log("while")
        // sleep(rndInt * 1000);
        // setTimeout(function(){ alert("Sup!");  }, 2000);//wait 2 seconds
        
        // con_mysql.selectRandomClient();
        var ans=[];
        // console.log("ans  : ");
        // var ans1 = await con_mysql.selectRandomClient(ans);
        let userToken = con_mysql.selectRandomClient(ans);
        console.log(userToken) // Promise { <pending> }

        userToken.then(console.log(con_mysql.selectRandomClient(ans)));
        var ans1;
        setTimeout(() => {ans1  = con_mysql.selectRandomClient(ans) ;  console.log(ans1)}, 2000);
        console.log("ans  : ");
        
        console.log(ans1);

}

console.log(con_mysql.rendClientFromList());