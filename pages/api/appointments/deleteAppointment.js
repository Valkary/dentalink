import { conn } from '../../../functions/db_connection';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { id } = req.body;
      console.log("> Deleting appointment...");

      conn.query(`DELETE FROM appointments WHERE id = ?;`, [id], (err, result) => {
        if (err) throw err;

        console.log("> Appointment deleted succesfully!");
        res.status(200).send(result);
        resolve();
      })
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};