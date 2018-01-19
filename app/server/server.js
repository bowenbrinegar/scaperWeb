const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');
const db = require('./models/index');

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/populatedb");

const cherrio = require('cheerio');
const request = require('request');

const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const publicPath = path.join(__dirname +'/public')

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: '.handlebars',
  layoutsDir: 'app/server/views/layouts',
  partialsDir: 'app/server/views/partials'
})


app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");
app.set('views', __dirname + '/views');
app.use('/', express.static(publicPath));

require('./routing/appRoutes')(app, cherrio, request, db);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});