import { conn } from '../../../functions/db_connection';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){

      console.log("> Retrieving patient appointments...");

      conn.query(`SELECT ap.id, ap.date, ap.start_time, ap.end_time, p.names, p.last_names, pr.name as procedimiento, ap.cost FROM appointments ap INNER JOIN patients p ON p.id = ap.id_patient INNER JOIN procedures pr ON pr.id = ap.id_procedure WHERE DATE(ap.date) > CURDATE() ORDER BY ap.date, ap.start_time ASC;`, (err, result) => {
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