import { conn } from '../../../functions/db_connection';

export default function isPatientAdult(req, res) {
  return new Promise((resolve, reject) => {
    const { patientID } = req.body;

    if(req.method === "POST"){
      conn.query(`SELECT * FROM patients WHERE id = ${patientID}`, (err, result) => {
        if (err) throw err;

        res.status(200).send(result[0]);
        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
}