const mysql = require('mysql2');

const central_node = mysql.createConnection({
  host: 'ccscloud.dlsu.edu.ph',
  user: 'root',
  password: 'F2qmexnhkb8GYjENHB5zyJaV',
  database: 'mco2',
  port: 20144
});

module.exports = central_node;
