import bcrypt from 'bcrypt';

export default function generatePassword(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.pwd, salt, (err, hash) => {
          if (err) { throw err } else {
            res.status(200).json(hash);
            resolve();
          }
        });

        if (err) throw err;
      });
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};