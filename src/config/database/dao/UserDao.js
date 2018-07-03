const dbConnection = require('../dbConnection');
const queries = require('../queries/queries');
const bcrypt = require('bcrypt');

module.exports = class UserDao {

	async login(email, password) {
		console.log(email)
		let con = await dbConnection();
		try {
			await con.query('START TRANSACTION');
			let user = await con.query(queries.login_user, email);
			await con.query('COMMIT');
			user = JSON.parse(JSON.stringify(user))[0];
			if (!user) return;
			let isPassword = await bcrypt.compare(password, user.password);
			if (isPassword) return user;
		} catch (ex) {
			console.error(ex);
			throw ex;
		} finally {
			await con.release();
			await con.destroy();
		}
	}

	async saveEntity(entity) {
		let con = await dbConnection();
		try {
			await con.query('START TRANSACTION');
			let hash = await bcrypt.hash(entity.password, 10);
			entity.password = hash;
			let userQuery = await con.query(queries.register_user, [entity.name, entity.email, entity.password]);
			await con.query('COMMIT');
			entity.id = userQuery.insertId;
			return entity;
		} catch (ex) {
			await con.query('ROLLBACK');
			console.error(ex);
			throw ex;
		} finally {
			await con.release();
			await con.destroy();
		}
	}

	async updateEntity(entity) {
		let con = await dbConnection();
		try {
			await con.query('START TRANSACTION');
			let hash = await bcrypt.hash(entity.password, 10);
			entity.password = hash;
			await con.query(queries.update_user, [entity.name, entity.email, entity.password, entity.id]);
			await con.query('COMMIT');
			return true;
		} catch (ex) {
			await con.query('ROLLBACK');
			console.error(ex);
			throw ex;
		} finally {
			await con.release();
			await con.destroy();
		}
	}

	async deleteEntity(entityId) {
		let con = await dbConnection();
		try {
			await con.query('START TRANSACTION');
			await con.query(queries.delete_user, entityId);
			await con.query('COMMIT');
			return true;
		} catch (ex) {
			await con.query('ROLLBACK');
			console.error(ex);
			throw ex;
		} finally {
			await con.release();
			await con.destroy();
		}
	}

	async readEntities() {
		let con = await dbConnection();
		try {
			await con.query('START TRANSACTION');
			let users = await con.query(queries.read_users);
			await con.query('COMMIT');
			users = JSON.parse(JSON.stringify(users));
			return users;
		} catch (ex) {
			console.error(ex);
			throw ex;
		} finally {
			await con.release();
			await con.destroy();
		}
	}
}
