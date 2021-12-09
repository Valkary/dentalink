import { conn } from '../../../functions/db_connection';
import moment from 'moment';

export default function getAllPatients(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      conn.query("SELECT ap.date, ap.start_time, ap.end_time, p.names, p.last_names, pr.name as procedimiento FROM appointments ap INNER JOIN patients p ON p.id = ap.id_patient INNER JOIN procedures pr ON pr.id = ap.id_procedure;", (err, result) => {
        let appointments = [];

        for(let i = 0; i < result.length; i++) {
          const { names, last_names, procedimiento, date, start_time, end_time} = result[i];
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const appointment_obj = {
            title: `${names} ${last_names} - ${procedimiento}`,
            start: `${formattedDate} ${start_time}`,
            end: `${formattedDate} ${end_time}`,
          }

          appointments.push(appointment_obj);
        }

        if (err) throw err;

        res.status(200).send(appointments);
        resolve();
      })
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};