const mysql = require('mysql2');

const node1 = mysql.createConnection({
  host: 'ccscloud.dlsu.edu.ph',
  user: 'root',
  password: 'F2qmexnhkb8GYjENHB5zyJaV',
  database: 'mco2',
  port: 20144
});

const node2 = mysql.createConnection({
  host: 'ccscloud.dlsu.edu.ph',
  user: 'root',
  password: 'F2qmexnhkb8GYjENHB5zyJaV',
  database: 'mco2',
  port: 20145
});

const node3 = mysql.createConnection({
  host: 'ccscloud.dlsu.edu.ph',
  user: 'root',
  password: 'F2qmexnhkb8GYjENHB5zyJaV',
  database: 'mco2',
  port: 20146
});

module.exports = node1;
