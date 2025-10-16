import db from "../db.js"

export function getJobs(req, res) {
    db.query("SELECT * FROM empleos", (err, results) => {
    if (err) {
      console.error("Error al obtener empleos:", err);
      return res.status(500).json({ error: "Error al obtener empleos" });
    }
    res.json(results);
  });
}