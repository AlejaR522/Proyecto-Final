import { registerUser, loginUser } from "../services/authService.js";

//  REGISTRO
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const result = await registerUser({ nombre, email, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error: error.message });
  }
};

//  LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos." });
    }

    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: "Error en login", error: error.message });
  }
};


