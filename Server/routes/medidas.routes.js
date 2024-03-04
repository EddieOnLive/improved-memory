import { Router } from "express";
import {
  actualizarMedida,
  borrarMedidas,
  crearMedida,
  obtenerMedidas,
  obtenerUnaMedida,
} from "../controllers/medidas.controllers.js";

const router = Router();

router.get("/medidas", obtenerMedidas);

router.get("/medidas/:id", obtenerUnaMedida);

router.post("/medidas", crearMedida);

router.put("/medidas/:id", actualizarMedida);

router.delete("/medidas/:id", borrarMedidas);

export default router;
