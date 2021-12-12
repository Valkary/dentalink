import { conn } from '../../../functions/db_connection';

export default function createPatient(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      
      const { names, last_names, sex, age, phone, email, address, postal_code, job, house_phone, office_phone, emergency_contact, emergency_phone, edo_civil, birth_date, prior_illnesses, other_information } = req.body.patient_obj;

      conn.query("INSERT INTO patients (names, last_names, sex, age, phone, email, address, postal_code, job, house_phone, office_phone, emergency_contact, emergency_phone, civil_status, birth_date, prior_illnesses, other_information) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [ names, last_names, sex, age, phone, email, address, postal_code, job, house_phone, office_phone, emergency_contact, emergency_phone, edo_civil, birth_date, JSON.stringify(prior_illnesses), JSON.stringify(other_information) ], (err, result) => {
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