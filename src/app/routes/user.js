const express = require('express');
const router = express.Router();
const UserDao = require('../../config/database/dao/UserDao');
const Validator = require('../validations/Validator');
const Jwt = require('../validations/Jwt');
const Response = require('../validations/Response');

const userDao = new UserDao();

router.put('/register', (req, res, next) => {
	let validation = Validator.userValidation(req, res);
	if(validation) next();
}, (req, res) => {
	let user = req.body;
	userDao.saveEntity(user).
	then(user => res.status(201).send(Response.onSuccess(user))).
	catch(err => res.status(500).send(Response.onFail(err)));
});

router.post('/login', (req, res, next) => {
	let validation = Validator.userValidation(req, res);
	if(validation) next();
}, (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	userDao.login(email, password).then(user => {
		if (user) {
			let token = Jwt.generateJwt(user.id);
			res.status(200).send(Response.onSuccess(user, token));
		} else res.status(404).send(Response.onFail('User not found or wrong password!'));
	}).catch(err => res.status(500).send(Response.onFail(err)));
});

router.post('/update', (req, res, next) => {
	let validation = Validator.userValidation(req, res);
	let jwtVerification = Jwt.verifyJwt(req, res);
	if(validation && jwtVerification) next();
	next();
}, (req, res) => {
	let user = req.body;
	userDao.updateEntity(user).
	then(isUpdated => res.status(200).send(Response.onSuccess(isUpdated))).
	catch(err => res.status(500).send(Response.onFail(err)));
});

router.delete('/delete', (req, res, next) => {
	let jwtVerification = Jwt.verifyJwt(req, res);
	if(jwtVerification) next();
}, (req, res) => {
	let userId = req.body.id;
	userDao.deleteEntity(userId).
	then(isDeleted => res.status(200).send(Response.onSuccess(isDeleted))).
	catch(err => res.status(500).send(Response.onFail(err)));
});

router.get('/read', (req, res, next) => {
	let jwtVerification = Jwt.verifyJwt(req, res);
	if(jwtVerification) next();
}, (req, res) => {
	userDao.readEntities().
	then(users => res.status(200).send(Response.onSuccess(users))).
	catch(err => res.status(500).send(Response.onFail(err)));
});

module.exports = router;
