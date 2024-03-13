import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { borrarEquiposRequest, getEquiposRequest } from "../api/equipo.api";

function inscripcionPage() {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState([]);

  const cargarEquipos = async () => {
    try {
      const resp = await getEquiposRequest();
      setEquipos(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const borrarEquipo = async (id) =>{
    await borrarEquiposRequest(id);
    setEquipos(equipos.filter((equipos) => equipos.id !== id));
  }

  useEffect(() => {
    cargarEquipos();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Equipos
        </h1>
        <div>
          <button className="block text-center py-2 rounded-xl text-white w-full">
            <Link
              to="/InscripcionEquipoForm"
              className="bg-indigo-500 px-2 py-1 rounded-md"
            >
              Nueva Embarcación
            </Link>
          </button>
          <button className="block text-center py-2 rounded-xl text-white w-full">
            <Link
              to="/NuevaInscripcion"
              className="bg-indigo-500 px-2 py-1 rounded-md"
            >
              Nueva Inscripcion
            </Link>
          </button>
          <button className="block text-center py-2 rounded-xl text-white w-full">
            <Link to="/" className="bg-indigo-500 px-2 py-1 rounded-md">
              Volver
            </Link>
          </button>
        </div>
        {/* Tarjeta de Equipo */}
        <div className="mt-4 flex columns-2">
          {equipos.map((equipo) => (
              <div
                className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 container"
                key={equipo.id}
              >
                <h2 className="text-xl font-bold text-white text-center">
                  {equipo.nombre_embarcacion} - {equipo.matricula_embarcacion}
                </h2>
                <p className="text-white text-lg text-center">
                  Timonel: {equipo.nombre_completo_pescador2}
                </p>
                <p className="text-white text-lg text-center">
                  Compañero: {equipo.nombre_completo_pescador1}
                </p>
                <p className="text-white text-lg text-center">
                  Club: {equipo.club_descripcion}
                </p>
                <p className="text-white text-lg text-center">
                  Torneo: {equipo.torneo_descripcion}
                </p>
                <p className="text-white text-lg text-center">
                  {equipo.observacion
                    ? `Observación: ${equipo.observacion}`
                    : "Sin observación"}
                </p>
                <div className="flex gap-1 mt-5 justify-center h-20">
                  {/* Editar equipo */}
                  <button
                    className="bg-slate-800 px-2 py-1 text-white rounded-md"
                    onClick={
                       () => navigate(`/InscripcionEquipoForm/${equipo.id}`)
                    }
                  >
                    Editar Equipo
                  </button>
                  {/* Borrar equipo */}
                  <button
                    className="bg-red-500 px-2 py-1 mr-4 ml-4 text-white rounded-md"
                    onClick={() => {
                      borrarEquipo(equipo.id); 
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    className="bg-slate-800 px-2 py-1 text-white rounded-md"
                    onClick={
                      () => navigate(`/NuevaInscripcion/${equipo.pescador_id2}/${equipo.pescador_id1}/${equipo.id}`)
                    }
                  >
                    Editar Pescadores
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default inscripcionPage;
