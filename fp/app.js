const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const childProc = require('child_process');
const compression = require('compression');
const app = express();

const mongoose = require('mongoose');
const mongodb = require('mongodb');

app.use(helmet());
app.use(compression());

const port = process.env.port || 8080;

app.use(bodyParser.json()); // parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// mongodb connection
// mongoose.connect("mongodb+srv://ronmantech:RWfSpqsFWWzRag6F@cluster0-ybapz.gcp.mongodb.net/test?retryWrites=true&w=majority/covidcoach", { useNewUrlParser: true });
const mongoUrl = "mongodb+srv://ronmantech:RWfSpqsFWWzRag6F@cluster0-ybapz.gcp.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: "fp_ece"
})
  .then(() => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch((err) => console.error(err));
const db = mongoose.connection;
// errors with database connection, logs to console.
db.on('error', console.error.bind(console, 'connection error:'));


app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug'); // engine - pug
app.set('views', __dirname + '/views');

const routes = require('./routes/index'); // include routes
app.use('/', routes);

// catch 404 then forward to error handler
app.use((req, res, next) => {
  let err = new Error('404, File Not Found');
  err.status = 404;
  next(err);
});

app.listen(app.get('port'), () => {
  console.log(`app is running on http://localhost:${port}`);
});