const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let port = process.env.PORT || 8585;
const db = 'mongodb://localhost:27017/suggestion-db';

mongoose.Promise = global.Promise;
mongoose.connect(db);

app.use('/api', require('./controllers'));
app.listen(port);

console.log('listening on port', port);