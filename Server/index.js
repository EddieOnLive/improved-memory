import express from "express";
import cors from "cors";
import { Puerto } from "./config.js";
import tareasRoutes from "./routes/index.routes.js";
import clubesRoutes from "./routes/clubes.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import medidasRoutes from "./routes/medidas.routes.js";
import piezasRoutes from "./routes/piezas.routes.js";
import horariosRoutes from "./routes/horarios.routes.js";
import torneosRoutes from "./routes/torneos.routes.js";
import modalidadesRoutes from "./routes/modalidades.routes.js";
import fiscalesRoutes from "./routes/fiscales.routes.js";
import equipoRoutes from "./routes/equipo.routes.js";
import pescadorRoutes from "./routes/pescadores.routes.js";
import inicioRoutes from "./routes/inicio.routes.js";
import capturasRoutes from "./routes/cargaPiezas.routes.js";
import informesRoutes from "./routes/informe.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(inicioRoutes);

app.use(tareasRoutes);

app.use(clubesRoutes);

app.use(categoriasRoutes);

app.use(piezasRoutes);
app.use(medidasRoutes);

app.use(horariosRoutes);

app.use(torneosRoutes);
app.use(informesRoutes);
app.use(modalidadesRoutes);

app.use(fiscalesRoutes);

app.use(equipoRoutes);
app.use(capturasRoutes);
app.use(pescadorRoutes);

app.listen(Puerto);
console.log(`SERVER IS RUNNING ON ${Puerto}`);
