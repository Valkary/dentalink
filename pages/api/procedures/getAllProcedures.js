import { conn } from '../../../functions/db_connection';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      conn.query("SELECT * FROM procedures", (err, result) => {
        if (err) throw err;

        res.status(200).send(result);
        resolve();
      })
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};