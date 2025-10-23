import db from "../db.js";

// 📌 Registrar una nueva postulación
export const crearPostulacion = (req, res) => {
  const { id_usuario, id_empleo } = req.body;

  if (!id_usuario || !id_empleo) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  const sql = "INSERT INTO postulaciones (id_usuario, id_empleo) VALUES (?, ?)";

  db.query(sql, [id_usuario, id_empleo], (err, result) => {
    if (err) {
      console.error("❌ Error al insertar la postulación:", err);
      return res.status(500).json({ error: "Error al registrar la postulación." });
    }

    res.status(201).json({
      message: "✅ Postulación registrada exitosamente",
      id_postulacion: result.insertId,
    });
  });
};

// 📌 Ver todas las postulaciones (opcional)
export const obtenerPostulaciones = (req, res) => {
  const sql = `
    SELECT p.id, u.nombre AS usuario, e.titulo AS empleo, p.fecha_postulacion, p.estado
    FROM postulaciones p
    JOIN usuarios u ON p.id_usuario = u.id
    JOIN empleos e ON p.id_empleo = e.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener postulaciones:", err);
      return res.status(500).json({ error: "Error al obtener las postulaciones." });
    } 

    res.json(results);
  });
};
