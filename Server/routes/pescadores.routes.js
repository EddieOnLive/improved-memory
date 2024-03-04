import { Router } from "express";

import { obtenerPescador, obtenerUnPescador, crearPescador, actualizarPescador,borrarPescador } from "../controllers/pescadores.controllers.js";

const router = Router();

router.get("/pescadores", obtenerPescador);

router.get("/pescadores/:id", obtenerUnPescador);

router.post("/pescadores", crearPescador);

router.put("/pescadores/:id1/:id2", actualizarPescador);

router.delete("/pescadores/:id", borrarPescador);

export default router;