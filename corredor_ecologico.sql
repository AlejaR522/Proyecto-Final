CREATE DATABASE corredor_ecologico;

USE corredor_ecologico;

CREATE TABLE empleos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  descripcion TEXT,
  ubicacion VARCHAR(100)
);
