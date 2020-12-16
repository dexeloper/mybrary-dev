if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

const express = require('express');
const app = express(); // express app generation, from now on the word 'app' will be used evrywhere on server.js(root file) to make a get or post request to our server, refer express documentation
const expressLayouts = require('express-ejs-layouts'); // these(line3-11) are obviously for front end as Kyle will not be using React for this application

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');// importing mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});// connecting to our LOCAL mongodb database
const db = mongoose.connection; // checking database connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000); // making a PRODUCTION || LOCAL server domain
