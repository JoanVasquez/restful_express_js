module.exports = {
  read_users : 'SELECT * FROM tbl_user',
	register_user : 'INSERT INTO tbl_user(name, email, password) VALUES(?, ?, ?)',
  login_user : 'SELECT * FROM tbl_user WHERE email = ?',
	update_user : 'UPDATE tbl_user SET name = ?, email = ?, password = ? WHERE id = ?',
	delete_user : 'DELETE FROM tbl_user WHERE id = ?'
}
