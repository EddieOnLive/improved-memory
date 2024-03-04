import { Router } from "express";
import {
    obtenerPiezas,
    obtenerUnaPieza,
    crearPiezas,
    actualizarPiezas,
    borrarPiezas
} from "../controllers/piezas.controllers.js";

const router = Router();

router.get("/piezas", obtenerPiezas);

router.get("/piezas/:id", obtenerUnaPieza);

router.post("/piezas", crearPiezas);

router.put("/piezas/:id", actualizarPiezas);

router.delete("/piezas/:id", borrarPiezas);

export default router;