import { Router } from "express";
import { actualizarEquipo, borrarEquipo, crearEquipo, obtenerEquipos, obtenerEquiposTodos, obtenerUnEquipo } from "../controllers/equipo.controllers.js";

const router = Router();

router.get("/equipo", obtenerEquipos);

router.get("/equipostodos", obtenerEquiposTodos);

router.get("/equipo/:id", obtenerUnEquipo);

router.post("/equipo", crearEquipo);

router.put("/equipo/:id", actualizarEquipo);

router.delete("/equipo/:id", borrarEquipo);

export default router;