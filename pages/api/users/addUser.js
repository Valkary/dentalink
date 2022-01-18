import { conn } from '../../../functions/db_connection';
import middleware from '../../../middleware/middleware';
import bcrypt from 'bcrypt';
import nextConnect from 'next-connect';
import fs from "fs";

const saveFile = async (file) => {
  const { path, originalFilename } = file;
  const name = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${originalFilename}`;
  const data = fs.readFileSync(path);
  
  try {
    fs.writeFileSync(`images/profile_pictures/${name}`, data);
    fs.unlinkSync(path);
    console.log(`> Profile picture successfully saved in the server at ${path}`);
    return { success: true, path: `/images/profile_pictures/${name}`, name: originalFilename };
  } catch (err) {
    console.log("> User's profile picture could not be stored in the server");
    console.error(err);
    return { success: false, error: err};
  } 
};

const hash_password = (password) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
  
    bcrypt.hash(password[0], salt, (err, hash) => {
      return err ? reject(err) : resolve(hash);
    });
  });
}

const insertPatient = async (username, password, first_names, last_names, security_lvl, profile_picture_id) => {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO users (username, password, security_lvl, first_names, last_names, profile_picture) VALUES (?,?,?,?,?,?)", [username, password, security_lvl, first_names, last_names, profile_picture_id], (err, result) => {
      if (err) throw err;
      console.log("> User succesfully inserted on the database!");
      return err ? reject(err) : resolve(result.insertId);
    });
  });
};

const insertImageToDatabase = async (path, name) => {
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO images (path, name) VALUES (?,?)", [path, name], (err, result) => {
      if (err) throw err;
      return err ? reject(err) : resolve(result.insertId);
    });
  });
};

const verifyUsernameElegibility = async (username) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT COUNT(*) as count FROM users WHERE username = ?", [username], (err, result) => {
      if (err) throw err;
      return err ? reject(err) : resolve(result[0].count < 1);
    })
  });
};

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  return new Promise(async (resolve, reject) => {
    console.log("> Recieving new user information...");
    const { username, password, first_names, last_names, security_lvl } = req.body;

    if(await verifyUsernameElegibility(username)) {
      const { profile_picture } = req.files;
      const file = Object.entries(profile_picture)[0][1];
      const hashed_pwd = await hash_password(password);

      if(file.size > 0) {
        console.log("> Saving new user's profile picture to the server...");
        const save_file = await saveFile(file);
        const { success, path, name } = save_file;

        if(success) {
          const image_id = await insertImageToDatabase(path, name);
          console.log("> Image stored in database. Inserting user to db...");
          insertPatient(username, hashed_pwd, first_names, last_names, security_lvl, image_id);
        } else {
          console.log("> Problem storing profile picture. Inserting user to database...");
          insertPatient(username, hashed_pwd, first_names, last_names, security_lvl, null);
        }
      } else {
        console.log("> No profile picture added. Inserting user to database...");
        insertPatient(username, hashed_pwd, first_names, last_names, security_lvl, null);
      }

      res.status(200).send({ success: true, message: "Usuario agregado a la base de datos!" });
      resolve();
    } else {
      res.status(200).send({ success: false, message: "Nombre de usuario no elegible" });
      resolve();
    }
  });
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler;