import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

//TODO: falta todo...

function NavBar() {
  return (
    <div className="bg-neutral-800 flex justify-between px-20 py-4 sticky top-0">
      <Link to="/Informe" className="text-white font-bold">
        <h1>CCPBV</h1>
      </Link>
      <ul className="flex gap-x-1">
        <li>
          <Link
            to="/Informe"
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 py-1"
          >
            Incio
          </Link>
        </li>
        <li>
          <Link
            to="/Reglas"
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 py-1"
          >
            Reglas
          </Link>
        </li>
        <li>
          <Link
            to="/Inscripcion"
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 py-1"
          >
            Equipos
          </Link>
        </li>
        <li>
          <Link
            to="/Horarios"
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 py-1"
          >
            Horarios
          </Link>
        </li>
        <li>
          <Link
            to="/Administrador"
            className="bg-indigo-500 hover:bg-indigo-700 text-white
              px-2 py-1"
          >
            Administrador
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
