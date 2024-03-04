import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { borrarHorariosRequest, getHorariosRequest } from "../api/horarios.api";

function HorariosPage() {
  const [horarios, setHorarios] = useState([]);
  const navigate = useNavigate();

  const cargarHorario = async () => {
    try {
      const resp = await getHorariosRequest();
      /* setHorarios(resp.data); */
      /* console.log(resp.data); */
      const newHora = resp.data;
      newHora.map((hora) => {
        hora.horaEntrada = formatearHora(hora.horaEntrada);
        hora.horaSalida = formatearHora(hora.horaSalida);
      });
      console.log(newHora);
      setHorarios(newHora);
    } catch (error) {
      console.error(error);
    }
  };

  const borrarHorario = async (id) => {
    try {
      const resp = await borrarHorariosRequest(id);
      setHorarios(horarios.filter((horarios) => horarios.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const formatearHora = (hora) => {
    const aux1 = hora.substring(0, hora.length - 14);
    const aux2 = hora.substring(11, hora.length - 8);
    const aux4 =
      hora.substring(8, hora.length - 14) +
      "-" +
      hora.substring(5, hora.length - 17) +
      "-" +
      hora.substring(0, hora.length - 20);
    const hora2 = aux2;
    const fecha = aux4;
    return { hora2, fecha };
  };

  useEffect(() => {
    cargarHorario();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Horarios
        </h1>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link
            to="/HorariosForm"
            className="bg-indigo-500 px-2 py-1 rounded-md"
          >
            Cargar Horarios
          </Link>
        </button>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
        {/* Tarjetas */}
        <div className="columns-2 mt-4 flex flex-wrap">
          {horarios != "" ? (
            horarios.map((horario) => (
              <div
                className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 text-center"
                key={horario.id}
              >
                {/* Entrada */}
                <h2 className="text-2xl font-bold text-white">Entrada</h2>
                <p className="text-xl font-bold text-white">
                  FECHA: {horario.horaEntrada.fecha}
                </p>
                <p className="text-xl font-bold text-white mr-16">
                  HORA: {horario.horaEntrada.hora2}
                </p>
                {/* Salida */}
                <h2 className="text-2xl font-bold text-white">Salida</h2>
                <p className="text-xl font-bold text-white">
                  FECHA: {horario.horaSalida.fecha}
                </p>
                <p className="text-xl font-bold text-white mr-16">
                  HORA: {horario.horaSalida.hora2}
                </p>
                {/* Botones */}
                <div className="flex gap-1 mt-5 justify-center h-10">
                  <button
                    className="bg-red-500 px-2 py-1 mr-4 text-white rounded-md"
                    onClick={() => {
                      borrarHorario(horario.id);
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    className="bg-slate-800 px-2 py-1 text-white rounded-md"
                    onClick={() => navigate(`/HorariosForm/${horario.id}`)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center align-middle h-full w-full">
              <h1 className="text-3xl text-white font-bold text-center py-3">
                No se encontraron Horarios
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HorariosPage;
