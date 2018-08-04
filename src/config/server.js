const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//SETTINGS
app.set('port', process.env.PORT || 8080);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    next();
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(expressValidator());

//ROUTINGS
const user = require('../app/routes/user');
app.use('/api/user', user);

app.listen(app.get('port'), () => {
	console.log(`Listening on port: ${app.get('port')}`);
});
