import { Router } from "express";
import {
  obtenerClubes,
  obtenerUnClub,
  crearClub,
  actualizarClub,
  borrarClub,
} from "../controllers/clubes.controllers.js";

const router = Router();

router.get("/clubes", obtenerClubes);

router.get("/clubes/:id", obtenerUnClub);

router.post("/clubes", crearClub);

router.put("/clubes/:id", actualizarClub);

router.delete("/clubes/:id", borrarClub);

export default router;
