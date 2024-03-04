import { Router } from "express";
import {
    obtenerModalidades,
    obtenerUnaModalidad,
    crearModalidad,
    actualizarModalidades,
    borrarModalidades,
} from "../controllers/modalidades.controllers.js";

const router = Router();

router.get("/modalidades", obtenerModalidades);

router.get("/modalidades/:id", obtenerUnaModalidad);

router.post("/modalidades", crearModalidad);

router.put("/modalidades/:id", actualizarModalidades);

router.delete("/modalidades/:id", borrarModalidades);

export default router;
