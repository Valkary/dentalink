import { conn } from '../../../functions/db_connection';

export default function getUsers(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { username } = req.body;

      console.log("> Requesting user information from database...");
      conn.query(`SELECT users.id, users.username, users.first_names, users.last_names, images.path FROM users LEFT JOIN images ON users.profile_picture = images.id WHERE users.username = ?;`, [username], (err, result) => {
        if (err) throw err;
        
        console.log("> Succesfully retrieved user data. Sending it to client...");
        res.status(200).send(result);
        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};