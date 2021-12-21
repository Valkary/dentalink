import { conn } from '../../../functions/db_connection';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { patient_id, procedure, date, start, end, cost } = req.body;

      conn.query("INSERT INTO appointments (id_patient, id_procedure, date, start_time, end_time, cost) VALUES (?,?,?,?,?,?)", [patient_id, procedure, date, start, end, cost], (err, result) => {
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