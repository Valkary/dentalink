import { conn } from "../../functions/db_connection";

export default function getAllTables(req, res) {
  return new Promise((resolve, reject) => {
    console.log(process.env.DB_USERNAME);
    if(req.method === "POST"){
      try {
        conn.query(`SELECT t.id, tt.name, tp.name, t.identifier FROM teeth t INNER JOIN teeth_types tt ON t.type = tt.id INNER JOIN teeth_positions tp ON tp.id = t.position;`, (err, result) => { 
          if (err) throw err;
          console.log(result);
          res.status(200).json(result);
          resolve();
        });
      } catch(error) {
        res.status(error.status || 500).json({ message: error.message });
      }
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};
