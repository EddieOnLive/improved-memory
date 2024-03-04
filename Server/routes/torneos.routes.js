import { Router } from "express";
import {
  actualizarTorneo,
  borrarTorneo,
  crearTorneo,
  obtenerTorneo,
  obtenerUnTorneo,
} from "../controllers/torneos.controllers.js";

const router = Router();

router.get("/torneos", obtenerTorneo);

router.get("/torneos/:id", obtenerUnTorneo);

router.post("/torneos", crearTorneo);

router.put("/torneos/:id", actualizarTorneo);

router.delete("/torneos/:id", borrarTorneo);

export default router;
