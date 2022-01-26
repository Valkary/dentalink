import { conn } from '../../functions/db_connection';
import middleware from '../../middleware/middleware';
import nextConnect from 'next-connect';
import fs from "fs";

const handler = nextConnect();
handler.use(middleware);

const saveFile = async (file) => {
  const { path, originalFilename } = file;
  const name = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${originalFilename}`;
  const data = fs.readFileSync(path);
  
  const write_path = `public/images/history/${name}`;

  try {
    fs.writeFileSync(`public/images/history/${name}`, data);
    fs.unlinkSync(path);
    console.log(`> Profile picture successfully saved in the server at ${write_path}`);
    return { success: true, path: `/images/history/${name}`, name: originalFilename };
  } catch (err) {
    console.log("> User's profile picture could not be stored in the server");
    console.error(err);
    return { success: false, error: err};
  };
};

const insertImageToDatabase = async (path, name) => {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO images (path, name) VALUES (?,?)", [path, name], (err, result) => {
      if (err) throw err;
      return err ? reject(err) : resolve(result.insertId);
    });
  });
};

const relateImageToPatient = async (patient_id, image_id) => {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO image_history (patient_id, images_id) VALUES (?,?)", [patient_id, image_id], (err, result) => {
      if (err) throw err;
      return err ? reject(err) : resolve(result.insertId);
    });
  });
};

handler.post(async (req, res) => {
  return new Promise(async (resolve, reject) => {
    console.log("> Attempting to upload image to server...");
    
    const file = req.files.image[0];
    const { patient_id, image_name } = req.body;

    if(file.size > 0) {
      const { success, path, name, originalFilename, error } = await saveFile(file);
      console.log(success, path, name, originalFilename, error);

      if(success) {
        const insert_image = await insertImageToDatabase(path, image_name);
        const relate_image = await relateImageToPatient(patient_id, insert_image);

        res.status(200).send({ success: true, message: "Imagen correctamente agregada al historial del paciente", insert_id: relate_image });
        resolve();
      } else {
        res.status(200).send({ success: false, message: "Error al insertar la imagen en el servidor" });
        resolve();
      }
    }
  });
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler;