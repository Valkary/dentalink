import { conn } from '../../../functions/db_connection';

const build_object = (positions, idx, diente_obj, colores) => {
  switch(positions[idx]) {
    case "Superior": {
      diente_obj.colores.top = colores[idx];
      break;
    }
    case "Izquierda": {
      diente_obj.colores.left = colores[idx];
      break;
    }
    case "Centro": {
      diente_obj.colores.center = colores[idx];
      break;
    }
    case "Derecha": {
      diente_obj.colores.right = colores[idx];
      break;
    }
    case "Inferior": {
      diente_obj.colores.bottom = colores[idx];
      break;
    }
  }

  return diente_obj;
}

export default function getDenture(req, res) {
  return new Promise((resolve, reject) => {
    if(req.method === "POST"){
      const { isAdult, patientID } = req.body;
      const positions = ["1,2,3,4", "5,6,7,8"];

      conn.query(`SELECT JSON_ARRAYAGG(teeth_types.name) as names, JSON_ARRAYAGG(teeth.id) as dientes, JSON_ARRAYAGG(registros.area) as areas, JSON_ARRAYAGG(tooth_areas.name) as positions, JSON_ARRAYAGG(tooth_status.color) as colores FROM teeth LEFT JOIN(SELECT registros.id_patient, registros.id_tooth, registros.id_procedure, registros.status, registros.area FROM (SELECT th.*, RANK() OVER (PARTITION BY th.id_tooth, th.area ORDER BY date DESC) as date_rank FROM tooth_history th INNER JOIN teeth t ON t.id = th.id_tooth WHERE th.id_patient = ${patientID}) as registros WHERE date_rank = 1) as registros ON teeth.id = registros.id_tooth LEFT JOIN tooth_areas ON tooth_areas.id = registros.area LEFT JOIN tooth_status ON tooth_status.id = registros.status LEFT JOIN teeth_types ON teeth.type = teeth_types.id WHERE teeth.position IN(${ isAdult ? positions[0] : positions[1] });`, (err, result) => {
        if (err) throw err;

        const { names, dientes, positions, colores } = result[0];

        let diente_obj = {
          id: dientes[0],
          name: names[0],
          colores: {
            top: "#FFFFFF",
            left: "#FFFFFF",
            center: "#FFFFFF",
            right: "#FFFFFF",
            bottom: "#FFFFFF",
          }
        }

        const rearrange_result = []; 
        
        dientes.map((diente, idx) => {
          if (diente === diente_obj.id) {
            build_object(positions, idx, diente_obj, colores);
          } else {
            const new_object = {
              id: dientes[idx],
              name: names[idx],
              colores: {
                top: "#FFFFFF",
                left: "#FFFFFF",
                center: "#FFFFFF",
                right: "#FFFFFF",
                bottom: "#FFFFFF",
              }
            }
            
            build_object(positions, idx, new_object, colores);
            
            const tmp_diente_obj = diente_obj;
            diente_obj = new_object;
            rearrange_result.push(tmp_diente_obj);
            
            if(idx === dientes.length - 1) {
              rearrange_result.push(diente_obj);
            }
          }
        });
        
        res.status(200).send(rearrange_result);
        resolve();
      })
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};