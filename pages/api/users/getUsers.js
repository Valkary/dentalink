import { conn } from '../../../functions/db_connection';

export default function getUsers(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      console.log("> Requesting users from database...");
      conn.query(`SELECT id, username, security_lvl, first_names, last_names FROM users WHERE security_lvl > 0 ORDER BY id;`, (err, result) => {
        if (err) throw err;
        
        console.log("> Succesfully retrieved users data. Sending it to client...");
        res.status(200).send(result);
        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};