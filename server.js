const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db = require('./app/models');

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/populatedb", {
  useMongoClient: true
});

const cherrio = require('cheerio');
const request = require('request');

const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./app/routes/appRoutes')(app, cherrio, request, exphbs, db);
require('./app/routes/htmlRoutes')(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});