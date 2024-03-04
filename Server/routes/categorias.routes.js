import { Router } from "express";
import {
    obtenerCategorias,
    obtenerUnaCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
} from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/categorias", obtenerCategorias);

router.get("/categorias/:id", obtenerUnaCategoria);

router.post("/categorias", crearCategoria);

router.put("/categorias/:id", actualizarCategoria);

router.delete("/categorias/:id", borrarCategoria);

export default router;
