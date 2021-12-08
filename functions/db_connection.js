const mysql = require('mysql2');

function makeConnection() {
  const credentials = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  }

  const connection = mysql.createConnection(credentials);
  
  connection.connect((err) => {
    if (err) { throw err } else { console.log('> Succesfully made connection to MySql database!') };
  });

  return connection;
}

export const conn = makeConnection();