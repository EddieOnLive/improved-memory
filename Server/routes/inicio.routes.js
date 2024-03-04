import { Router } from "express";
import { obtenerUnInicio } from "../controllers/inicio.controllers.js";

const router = Router();

router.get("/inicio/:usuario/:password", obtenerUnInicio);

export default router;
