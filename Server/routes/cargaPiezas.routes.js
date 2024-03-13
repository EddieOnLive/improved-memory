import { Router } from "express";
import {
  actualizarCaptura,
  borrarCaptura,
  cargarCaptura,
  obtenerCapturas,
  obtenerUnaCaptura,
} from "../controllers/cargaPiezas.controllers.js";

const router = Router();

router.get("/capturas", obtenerCapturas);

router.get("/capturas/:id", obtenerUnaCaptura);

router.post("/capturas", cargarCaptura);

router.put("/capturas/:id", actualizarCaptura);

router.delete("/capturas/:id", borrarCaptura);

export default router;
