const express = require('express');
const app = express();
var server = require('http').createServer(app);
const port = 3002

const kafkaCuns = require('./controller/KafkaCunsumer');
const mongodb = require('./models/MongoDB');
//--------------ejs---------------------
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.render('BigML'));
// app.get('/DashboardController.js', (req, res) => res.sendFile('Controller/DashboardController.js', { root: __dirname }));
// app.get('/Dashboard.css', (req, res) => res.sendFile('Views/Dashboard.css', { root: __dirname }));


server.listen(port, () => console.log(`System C app listening at http://localhost:${port}`));