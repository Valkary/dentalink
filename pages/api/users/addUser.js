import { conn } from '../../../functions/db_connection';
import fs from "fs";

const saveFile = async (file) => {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`/images/profile_picture/${file.name}`, data);
    fs.unlinkSync(file.path);
    if (err) throw err;

    return err ? reject(false) : resolve(true);
  });
};

export default function (req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST") {
      const { username, password, first_names, last_names, profile_picture } = req.body;
      console.log(username, password, first_names, last_names, profile_picture );
      // saveFile(profile_picture);
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};