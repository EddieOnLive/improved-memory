import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { borrarTorneosRequest, getTorneosRequest } from "../api/torneos.api";

function TorneosPage() {
  const [torneos, setTorneos] = useState([]);
  const navigate = useNavigate();

  const cargarTorneo = async () => {
    try {
      const resp = await getTorneosRequest();
      /* console.log(resp.data[0].torneoDescripcion); */
      setTorneos(resp.data);
      /* console.log(resp.data); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarTorneo = async (id) => {
    try {
      const resp = await borrarTorneosRequest(id);
      setTorneos(torneos.filter((torneos) => torneos.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarTorneo();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Torneos
        </h1>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link
            to="/TorneosForm"
            className="bg-indigo-500 px-2 py-1 rounded-md"
          >
            Nuevo Torneo
          </Link>
        </button>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link
            to="/ModalidadesPage"
            className="bg-indigo-500 px-2 py-1 rounded-md"
          >
            Nueva Modalidad
          </Link>
        </button>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link
            to="/Administrador"
            className="bg-indigo-500 px-2 py-1 rounded-md"
          >
            Volver
          </Link>
        </button>
        {/* Tarjetas */}
        <div className="columns-2 mt-4 flex">
          {torneos != "" ? (
            torneos.map((torneo) => (
              <div
                className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 text-center"
                key={torneo.id}
              >
                <h2 className="text-3xl font-bold text-white">
                  {torneo.torneoDescripcion}
                </h2>
                <h2 className="text-2xl font-bold text-white">Inicio</h2>
                <h3 className="text-xl text-white">{torneo.fechaInicio}</h3>
                <h3 className="text-xl text-white">{torneo.horaInicio}</h3>
                {/* Salida */}
                <h2 className="text-2xl font-bold text-white">Finalización</h2>
                <h3 className="text-xl text-white">{torneo.fechaFin}</h3>
                <h3 className="text-xl text-white">{torneo.horaFin}</h3>
                <div className="flex gap-1 mt-5 justify-center h-10">
                  <button
                    className="bg-red-500 px-2 py-1 mr-4 text-white rounded-md"
                    onClick={() => {
                      borrarTorneo(torneo.id);
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    className="bg-slate-800 px-2 py-1 text-white rounded-md"
                    onClick={() => navigate(`/TorneosForm/${torneo.id}`)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center align-middle h-full w-full">
              <h1 className="text-3xl text-white font-bold text-center py-3">
                No se encontraron piezas
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TorneosPage;
