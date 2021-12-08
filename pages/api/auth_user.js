import bcrypt from 'bcrypt';
import { conn } from '../../functions/db_connection';

export default function loginUser(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { user, pwd } = req.body;
      
      conn.query("SELECT * FROM users WHERE username = ?", user, (err, result) => {
        if (err) throw err;

        if(result.length === 1) {
          const { security_lvl, first_names, last_names, username, password } = result[0];

          bcrypt.compare(pwd, password, (err, result) => {
            if (err) throw err;
            
            if(result) { 
              console.log("> Credenciales correctas. Loggeando el usuario...")
              res.status(200).json({ security_lvl: security_lvl, first_names: first_names, last_names: last_names, username: username, authenticated: true });
              resolve();
            } else {
              res.status(200).json({ message: "Nombre de usuario o contraseña no encontrados" });
              resolve();
            }
          });
        } else {
          res.status(200).json({ message: "Nombre de usuario o contraseña no encontrados" });
          resolve();
        }
      });
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};