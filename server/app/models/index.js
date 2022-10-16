const config = require("../config/db.config.js");

const mysql = require('mysql');
const db = mysql.createConnection({
    host : config.HOST,
    user : config.USER,
    password : config.PASSWORD,
    database : config.DB
});

db.connect(err=>{
    if (err) {
        throw err;
    }
});

module.exports = db;