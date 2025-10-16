import express from "express";
import { getJobs } from "../services/index.js";
import { register, login } from "./authCotroller.js";


const router = express.Router();

router.get("/get-jobs", getJobs)
router.post("/register", register);
router.post("/login", login);


export default router;
