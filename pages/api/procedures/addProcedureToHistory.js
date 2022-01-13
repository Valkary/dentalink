import { conn } from '../../../functions/db_connection';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      console.log("> Creating procedure to patient's history...");
      const { patient, tooth, area, procedure, status, date, description } = req.body;

      conn.query("INSERT INTO tooth_history (id_patient, id_procedure, id_tooth, date, area, status, description) VALUES (?,?,?,?,?,?,?);", [patient, procedure, tooth, date, area.area_id, status, description], (err, result) => {
        if (err) throw err;

        console.log("> Succesfully created history registry to the database.");
        res.status(200).send(result);
        resolve();
      })
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};