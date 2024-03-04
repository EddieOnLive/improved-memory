import { Router } from "express";
import { actualizarFiscal, borrarFiscal, crearFiscal, obtenerFiscales, obtenerUnFiscal } from "../controllers/fiscales.controllers.js";

const router = Router();

router.get("/fiscal", obtenerFiscales);

router.get("/fiscal/:id", obtenerUnFiscal);

router.post("/fiscal", crearFiscal);

router.put("/fiscal/:id", actualizarFiscal);

router.delete("/fiscal/:id", borrarFiscal);

export default router;