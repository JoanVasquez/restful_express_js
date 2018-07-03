const mysql = require('promise-mysql');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const configObj = JSON.parse(JSON.stringify(config));

module.exports = async () => {
  try{
    let pool;
    let con;
    if(pool) con = pool.getConnection();
    else pool = await mysql.createPool(configObj);
    con = pool.getConnection();
    return con;
  }catch(ex){
    throw ex;
  }
}
