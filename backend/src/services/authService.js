import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from "../db.js";

// 🔹 REGISTRAR USUARIO
export const registerUser = async ({ nombre, email, password, tipo }) => {
  const [userExists] = await connection.promise().query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  if (userExists.length > 0) {
    throw new Error("El correo ya está registrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await connection.promise().query(
    "INSERT INTO usuarios (nombre, email, password, tipo) VALUES (?, ?, ?, ?)",
    [nombre, email, hashedPassword, tipo]
  );

  return { message: "Usuario registrado correctamente" };
};

// 🔹 LOGIN
export const loginUser = async (email, password) => {
  const [rows] = await connection.promise().query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Usuario no encontrado.");
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Contraseña incorrecta.");
  }

  const token = jwt.sign(
    { id: user.id_usuario, tipo: user.tipo },
    process.env.JWT_SECRET || "secretito",
    { expiresIn: "2h" }
  );

  return { message: "Login exitoso", token };
};

