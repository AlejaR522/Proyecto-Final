import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar a la base de datos:");
        console.error("📛", err.message);
    } else {
        console.log("✅ Conexión exitosa a MySQL");
        console.log("📦 Base de datos:", process.env.DB_NAME);
        console.log("🖥️ Host:", process.env.DB_HOST);
        console.log("👤 Usuario:", process.env.DB_USER);
    }
});

export default db;
