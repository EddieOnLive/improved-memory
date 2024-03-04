/* Default */
import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import Inicio from "./pages/Inicio";
import { Route, Routes } from "react-router-dom";
/* Reglas */
import { ReglasContextProvider } from "./context/ReglasProvider";
import ReglasForm from "./pages/ReglasForm";
import ReglasPage from "./pages/ReglasPage";
/* Inscripcion */
import CategoriaPescador from "./pages/CategoriaPage";
import InscripcionPage from "./pages/InscripcionPage";
import InscripcionForm from "./pages/InscripcionForm";
import InscripcionEquipoForm from "./pages/InscripcionEquipoForm";
/* Horarios */
import HorariosPage from "./pages/HorariosPage";
import HorariosForm from "./pages/HorariosForm";
/* Fiscales */
import FiscalesPage from "./pages/FiscalesPage";
import FiscalesForm from "./pages/FiscalesForm";
import CargaPageForm from "./pages/CargaPageForm";
/* Admin */
import AdminPage from "./pages/AdminPage";
/* Categorías */
import CategoriaForm from "./pages/CategoriaForm";
/* Torneos */
import TorneosPage from "./pages/TorneosPage";
import TorneosForm from "./pages/TorneosForm";
/* Modalidades */
import ModalidadesPage from "./pages/ModalidadesPage";
import ModalidadesForm from "./pages/ModalidadesForm";
/* Piezas */
import PiezasPage from "./pages/PiezasPage";
import PiezasForm from "./pages/PiezasForm";
/* Medidas */
import MedidasPage from "./pages/MedidasPage";
import MedidasForm from "./pages/MedidasForm";
/* Clubes */
import ClubPage from "./pages/ClubPage";
import ClubesForm from "./pages/ClubesForm";

function App() {
  return (
    <>
      <div className="bg-zinc-900 h-full w-full">
        <NavBar />
        <div className="container mx-auto py-4 px-20 ">
          <ReglasContextProvider>
            <Routes>
              <Route path="/" element={<Inicio />} />

              {/* Reglas */}
              <Route path="/reglas" element={<ReglasPage />} />
              <Route path="/nueva" element={<ReglasForm />} />
              <Route path="/editar/:id" element={<ReglasForm />} />

              {/* Inscripciones */}
              <Route path="/inscripcion/" element={<InscripcionPage />} />
              <Route path="/NuevaInscripcion" element={<InscripcionForm />} />
              <Route
                path="/NuevaInscripcion/:id1/:id2/:id3"
                element={<InscripcionForm />}
              />
              <Route
                path="/InscripcionEquipoForm"
                element={<InscripcionEquipoForm />}
              />
              <Route
                path="/InscripcionEquipoForm/:id"
                element={<InscripcionEquipoForm />}
              />

              {/* Administrador */}
              <Route path="/Administrador" element={<AdminPage />} />
              {/* Fiscal */}
              <Route path="/Fiscales/" element={<FiscalesPage />} />
              <Route path="/NuevoFiscal/" element={<FiscalesForm />} />
              <Route path="/NuevoFiscal/:id" element={<FiscalesForm />} />
              <Route path="/Horarios" element={<HorariosPage />} />
              <Route path="/HorariosForm" element={<HorariosForm />} />
              <Route path="/HorariosForm/:id" element={<HorariosForm />} />
              <Route path="/CargarPiezas/" element={<CargaPageForm />} />

              {/* Categoría */}
              <Route
                path="/CategoriaPescador"
                element={<CategoriaPescador />}
              />
              <Route path="/CategoriaNueva" element={<CategoriaForm />} />
              <Route path="/CategoriaNueva/:id" element={<CategoriaForm />} />

              {/* Torneo */}
              <Route path="/Torneos/" element={<TorneosPage />} />
              <Route path="/TorneosForm" element={<TorneosForm />} />
              <Route path="/TorneosForm/:id" element={<TorneosForm />} />
              <Route path="/ModalidadesPage" element={<ModalidadesPage />} />
              <Route path="/ModalidadesForm" element={<ModalidadesForm />} />
              <Route
                path="/ModalidadesForm/:id"
                element={<ModalidadesForm />}
              />

              {/* Piezas */}
              <Route path="/Piezas/" element={<PiezasPage />} />
              <Route path="/PiezaNueva/" element={<PiezasForm />} />
              <Route path="/PiezaNueva/:id" element={<PiezasForm />} />
              <Route path="/MedidasPage" element={<MedidasPage />} />
              <Route path="/MedidasForm" element={<MedidasForm />} />
              <Route path="/MedidasForm/:id" element={<MedidasForm />} />

              {/* Club */}
              <Route path="/ClubPage/" element={<ClubPage />} />
              <Route path="/ClubForm/" element={<ClubesForm />} />
              <Route path="/ClubForm/:id" element={<ClubesForm />} />

              {/* Error? */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ReglasContextProvider>
        </div>
      </div>
    </>
  );
}

export default App;
