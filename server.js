'use strict'

require('dotenv').config()
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const ws = new require('ws');
const forceSsl = require('express-force-ssl');


const sequelize = require('./config/sequelize.config')

const loginController = require('./controllers/login.controller')

const { onConnection, onMessage } = require('./realtime/handlers')

var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

const ca = fs.readFileSync(__dirname + '/ssl/intermediate.crt', 'utf8')

var credentials = crypto.createCredentials({key: privateKey, cert: certificate});
//creating express server
const app = express();
const httpServer = http.createServer(app);

//creating new websokcet server

const wss = new ws.Server({noServer: true});

//handling connections to socket
wss.on('connection', onConnection)
wss.on('message', onMessage)

//sync with database 
sequelize.sync().then(result => {
  console.log('Tables created and updated')
})
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname));

//using cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'POST, PUT, GET, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, CurrentId'
    );
    res.header(
      'Access-Control-Allow-Credentials', 'true'
    );
    next();
  });

app.get('/mainpage', (req, res) => {
    res.sendFile(path.join(__dirname + '/test.html'))
})

app.get('/anotherpage', (req, res) => {
  res.send('another html file!')
})

app.post('/api/login', loginController)



httpServer.listen(3030, () => console.log('I am listening!'));

