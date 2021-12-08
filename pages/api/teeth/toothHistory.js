import { conn } from '../../../functions/db_connection';

export default function getToothHistory(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { patient_id, tooth_id } = req.body;

      conn.query(`SELECT th.*, pr.name, ts.color FROM tooth_history th INNER JOIN patients p ON p.id = th.id_patient INNER JOIN teeth t ON t.id = th.id_tooth INNER JOIN procedures pr ON pr.id = th.id_procedure INNER JOIN tooth_status ts ON ts.id = th.status WHERE th.id_patient = ${patient_id} AND th.id_tooth = ${tooth_id} ORDER BY th.date DESC;`, (err, result) => {
        if (err) throw err;
        
        res.status(200).send(result);
        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};