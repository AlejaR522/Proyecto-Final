const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// Servir los archivos del frontend (HTML, CSS, imágenes)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Ruta principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
