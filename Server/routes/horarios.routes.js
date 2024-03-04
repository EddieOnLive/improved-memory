import { Router } from "express";
import {
    obtenerHorario,
    obtenerUnHorario,
    crearHorario,
    actualizarHorario,
    borrarHorario,
} from "../controllers/horarios.controllers.js";

const router = Router();

router.get("/horarios", obtenerHorario);

router.get("/horarios/:id", obtenerUnHorario);

router.post("/horarios", crearHorario);

router.put("/horarios/:id", actualizarHorario);

router.delete("/horarios/:id", borrarHorario);

export default router;
