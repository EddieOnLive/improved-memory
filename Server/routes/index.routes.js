import { Router } from "express";
import {
  obtenerReglas,
  obtenerUnaRegla,
  crearRegla,
  actualizarRegla,
  borrarRegla,
} from "../controllers/reglas.controllers.js";

const router = Router();

router.get("/reglas", obtenerReglas);

router.get("/reglas/:id", obtenerUnaRegla);

router.post("/reglas", crearRegla);

router.put("/reglas/:id", actualizarRegla);

router.delete("/reglas/:id", borrarRegla);

export default router;
