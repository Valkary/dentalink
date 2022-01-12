import { conn } from '../../../functions/db_connection';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){

      const { patient, tooth, area, procedure, status, date } = req.body;
      console.log(patient, tooth, area, procedure, status, date);

      conn.query("INSERT INTO tooth_history (id_patient, id_procedure, id_tooth, date, area, status, description) VALUES (?,?,?,?,?,?,?);", [patient, procedure, tooth, date, area.area_id, status, ""], (err, result) => {
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