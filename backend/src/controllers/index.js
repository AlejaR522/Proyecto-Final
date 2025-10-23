import express from "express";
import { getJobs } from "../services/index.js";
import { register, login } from "./authCotroller.js";
import { crearPostulacion, obtenerPostulaciones } from "./postulacionControllers.js";

const router = express.Router();

router.get("/get-jobs", getJobs);
router.post("/register", register);
router.post("/login", login);

router.post("/postulaciones", crearPostulacion);
router.get("/get-postulaciones", obtenerPostulaciones);

export default router;
