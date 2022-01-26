import { conn } from '../../functions/db_connection';

export default function getUsers(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { patient_id } = req.body;

      console.log("> Requesting image history from database...");
      conn.query(`SELECT images.path, images.name FROM image_history INNER JOIN images ON image_history.images_id = images.id WHERE image_history.patient_id = ? ORDER BY images.id DESC;`, [patient_id], (err, result) => {
        if (err) throw err;
        
        console.log("> Succesfully retrieved user data. Sending it to client...");
        res.status(200).send(result);
        resolve();
      });
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};