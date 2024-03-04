import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { borrarFiscalesRequest, getFiscalesRequest } from "../api/fiscales.api";

function HorariosPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [fiscales, setFiscales] = useState([]);

  const cargarFiscales = async () => {
    try {
      const resp = await getFiscalesRequest();
      console.log(resp.data);
      setFiscales(resp.data);
      /* console.log(resp.data[0]); */
    } catch (error) {
      console.error(error);
    }
  };

  const borrarFiscales = async (id) => {
    try {
      const resp = await borrarFiscalesRequest(id);
      setFiscales(fiscales.filter((fiscales) => fiscales.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarFiscales();
  }, [params.id]);

  return (
    <>
      <div>
        <h1 className="text-5xl text-white font-bold text-center py-3">
          Fiscales
        </h1>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link
            to="/NuevoFiscal/"
            className="bg-indigo-500 px-2 py-1 rounded-md"
          >
            Cargar Fiscal Nuevo
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
        {/* tarjetas */}
        <div className="grid grid-cols-2">
          {fiscales != "" ? (
            fiscales.map((fiscal) => (
              <div key={fiscal.id} className="">
                <div
                  className="bg-zinc-700 rounded-md mx-4 my-4 py-4 px-4 block"
                  key={fiscal.id}
                >
                  <h2 className="text-3xl font-bold text-white m-3 text-center">
                    {fiscal.nombre} - {fiscal.apellido}
                  </h2>
                  <h2 className="text-sm text-zinc-300 m-3 text-center">
                    Documento: {fiscal.documento}
                  </h2>
                  <h2 className="text-sm font-bold text-zinc-300 m-3 text-center">
                    Contacto: {fiscal.contacto}
                  </h2>
                  <h2 className="text-sm font-bold text-zinc-300 m-3 text-center">
                    Torneo en el que participa: {fiscal.torneoDescripcion}
                  </h2>
                  <h2 className="text-sm font-bold text-zinc-300 m-3 text-center">
                    Usuario: {fiscal.usuario}
                  </h2>
                  <h2 className="text-sm font-bold text-zinc-300 m-3 text-center">
                    Contraseña: {fiscal.contraseña}
                  </h2>
                  <div className="flex gap-1 mt-5 justify-center h-10 m-3 text-center">
                    <button
                      className="bg-red-500 px-2 py-1 mr-4 text-white rounded-md"
                      onClick={() => {
                        borrarFiscales(fiscal.id);
                      }}
                    >
                      Borrar
                    </button>
                    <button
                      className="bg-slate-800 px-2 py-1 text-white rounded-md"
                      onClick={() => navigate(`/NuevoFiscal/${fiscal.id}`)}
                    >
                      Editar
                    </button>
                  </div>
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

export default HorariosPage;
