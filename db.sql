CREATE DATABASE IF NOT EXISTS userdb_dev;
USE userdb_dev ;

-- -----------------------------------------------------
-- Table userdb_dev.tbl_user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY (id))
