import { Router } from "express";
import { obtenerInformeClubes, obtenerInformeGeneral, obtenerUnInforme } from "../controllers/informe.controllers.js";

const router = Router();

router.get("/informetodos", obtenerInformeGeneral);

router.get("/informe/:id", obtenerUnInforme);

router.get("/informeclubes", obtenerInformeClubes);

export default router;