// db.js
const mysql = require('promise-mysql');
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myteam_db'
});

function getconnection() {
  return connect
}

module.exports = {getconnection}
