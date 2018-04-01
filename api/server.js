const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

let port = process.env.PORT || 8585;
const db = 'mongodb://localhost:27017/suggestion-db';

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.use('/api', require('./controllers'));
app.listen(port);

console.log('listening on port', port);