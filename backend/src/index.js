import dotenv from "dotenv";
dotenv.config();



import cors from "cors";
import express from "express";
import AppRoutes from "../src/controllers/index.js";
import path from "path";
import { fileURLToPath } from "url";



const app = express();

// 🔧 Soporte para rutas de archivo (porque usamos ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/api/empleos", AppRoutes)

// Servir los archivos del frontend (HTML, CSS, imágenes)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Ruta principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
export default app;

