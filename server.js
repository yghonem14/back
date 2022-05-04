let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./db/conn');

// Express Route
const keysController = require('./keysController.js')
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	db.createCollection("users", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // close the connection to db when you are done with it
        db.close();
    });
 // perform actions on the collection object
  client.close();
});
/* mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(() => {
console.log('Database successfully connected!')
},
error => {
	console.log('Could not connect to database')
}
) */

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/keys', keysController)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
res.status(404).send('Error 404!')
});

app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});
