const express = require('express');
const app = express();
const path = require('path'); // enables us to serve unix/windows w/o having to write multiple paths
const logger = require('morgan');
const { v2 } = require('cloudinary')
const cloudinary = v2
const fileUpload = require('express-fileupload')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
	limits: { fileSize: 40 * 1024 * 1024 }
}))
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret
});
app.use((req, res, next) => {
	res.locals.data = {};
	next();
});
app.use(express.static('public'));
app.use(require('./config/checkToken'));
app.use(require('./config/checkBodyToken'))
app.use(logger('dev'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));
app.use('/api/reviews', ensureLoggedIn, require('./routes/api/reviews'));
app.use('/api/shops', ensureLoggedIn, require('./routes/api/shops'));
app.use('/api/users', ensureLoggedIn, require('./routes/api/users'));


// catch all -> if url doesn't match with any routes; for react router
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;