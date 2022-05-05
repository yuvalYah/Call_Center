function initSocket() {
    //socket is global
    socket = io.connect("http://localhost:3000");
}

//creat connection
const db = mysql.createConnection({
    host: 'localhost' ,
    user:'root',
    password:'ori7878',
    database: 'my_db'
})

db.connect(async(err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
    }
    console.log("Connected to MySQL!");
});
async function selectRandomClient(){  
    
    let query = 'SELECT * FROM clients';
    db.query(query, (err, result, fields) => {
        if (err) throw err;   
        
        // console.log("result: " + JSON.stringify(result));
        ////////////////////
        fs.writeFile("clients.json", JSON.stringify(result), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        
            console.log("JSON file has been saved.");
        });
        //////////////////
    });
    console.log("output: " + output);
    return (output);
}

console.log("selectRandomClient()" + selectRandomClient());

module.exports = { selectRandomClient};//, rendClient ,rendClientFromList};


