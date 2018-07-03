const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(bodyParser.json());
app.use(expressValidator());

//ROUTINGS
const user = require('../app/routes/user');
app.use('/api/user', user);

app.listen(app.get('port'), () => {
	console.log(`Listening on port: ${app.get('port')}`);
});
