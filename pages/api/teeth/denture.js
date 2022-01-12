import { conn } from '../../../functions/db_connection';

const child_denture = [
  {
    id: 33,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 34,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 35,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 36,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 37,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 38,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 39,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 40,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 41,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 42,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 43,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 44,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 45,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 46,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 47,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 48,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 49,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 50,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 51,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 52,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  }
];

const adult_denture = [
  {
    id: 1,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 2,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 3,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 4,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 5,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 6,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 7,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 8,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 9,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 10,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 11,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 12,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 13,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 14,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 15,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 16,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 17,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 18,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 19,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 20,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 21,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 22,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 23,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 24,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 25,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 26,
    name: "Incisor",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 27,
    name: "Canino",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 28,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 29,
    name: "Premolar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 30,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 31,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  },
  {
    id: 32,
    name: "Molar",
    colores: {
      top: "#FFFFFF",
      left: "#FFFFFF",
      center: "#FFFFFF",
      right: "#FFFFFF",
      bottom: "#FFFFFF"
    }
  }
];

const getPatientAge = async (patient_id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT age FROM patients WHERE id = ${patient_id}`, (err, result) => {
      if (err) throw err;
      return err ? reject(err) : resolve(result[0].age);
    });
  });
}

export default function getDenture(req, res) {
  return new Promise(async (resolve, reject) => {
    if(req.method === "POST"){
      const { patientID } = req.body;
      const positions = ["1,2,3,4", "5,6,7,8"];

      const patient_age = await getPatientAge(patientID);
      const isAdult = patient_age >= 18;
      const teeth_count = isAdult ? 32 : 20;

      console.log("> Retrieving teeth data...");
      conn.query(`SELECT JSON_ARRAYAGG(teeth_types.name) as names, JSON_ARRAYAGG(teeth.id) as dientes, JSON_ARRAYAGG(registros.area) as areas, JSON_ARRAYAGG(tooth_areas.name) as positions, JSON_ARRAYAGG(tooth_status.color) as colores FROM teeth LEFT JOIN(SELECT registros.id_patient, registros.id_tooth, registros.id_procedure, registros.status, registros.area FROM (SELECT teeth_history.* FROM (SELECT tooth_history.*, RANK() OVER (PARTITION BY tooth_history.id_tooth, tooth_history.area ORDER BY tooth_history.date DESC) as date_rank FROM tooth_history ORDER BY tooth_history.id ASC) as teeth_history WHERE teeth_history.date_rank = 1 AND teeth_history.id_patient = ${patientID}) as registros WHERE date_rank = 1) as registros ON teeth.id = registros.id_tooth LEFT JOIN tooth_areas ON tooth_areas.id = registros.area LEFT JOIN tooth_status ON tooth_status.id = registros.status LEFT JOIN teeth_types ON teeth.type = teeth_types.id WHERE teeth.position IN(${ isAdult ? positions[0] : positions[1] });`, (err, result) => {
        if (err) throw err;

        const { dientes, positions, colores } = result[0];
        
        console.log("> Rebuilding patient's teeth information...");

        dientes.map((diente, idx) => {
          const selected_denture = isAdult ? adult_denture : child_denture;
          const offset = isAdult ? 1 : 33;
          const pointer = diente - offset;
          
          switch(positions[idx]) {
            case "Superior": {
              selected_denture[pointer].colores.top = colores[idx];
              break;
            }
            case "Izquierda": {
              selected_denture[pointer].colores.left = colores[idx];
              break;
            }
            case "Centro": {
              selected_denture[pointer].colores.center = colores[idx];
              break;
            }
            case "Derecha": {
              selected_denture[pointer].colores.right = colores[idx];
              break;
            }
            case "Inferior": {
              selected_denture[pointer].colores.bottom = colores[idx];
              break;
            }
          };

          return selected_denture[pointer];
        });
        
        console.log("> Build complete. Sending to the client...");
        res.status(200).send(isAdult ? adult_denture : child_denture);
        resolve();
      })
      
    } else {
      res.status(500).json({ message: "Metodo HTTP incorrecto! Solo se acepta POST" });
      reject();
    }
  });
};