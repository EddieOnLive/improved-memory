import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEquiposRequest, getEquiposRequestTodos } from "../api/equipo.api";
import { getCategoriasRequest } from "../api/categorias.api";
import {
  getPescadoresRequest,
  getPescadoresRequestUno,
  updatePescadoresRequest,
  crearPescadoresRequest,
  borrarPescadoresRequest,
} from "../api/pescadores.api";
import Select from "react-select";
import AsyncSelect from "react-select";

function InscripcionForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [pescador, setPescador] = useState({
    idTimonel: "",
    nombreTimonel: "",
    apellidoTimonel: "",
    documentoTimonel: "",
    tipoDocumentoTimonel: "",
    edadTimonel: "",
    contactoTimonel: "",
    generoTimonel: "",
    categoriaTimonel: "",
    idComp: "",
    nombreComp: "",
    apellidoComp: "",
    documentoComp: "",
    tipoDocumentoComp: "",
    edadComp: "",
    contactoComp: "",
    generoComp: "",
    categoriaComp: "",
    equipoID: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [queso, setQueso] = useState([]);

  const cargarCategoria = async () => {
    try {
      const resp = await getCategoriasRequest();
      setCategorias(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const cargarEquipos = async () => {
    try {
      let data = [];
      const resp = await getEquiposRequestTodos();
      resp.data.forEach((element) => {
        data.push({
          label:
            element.nombre_embarcacion + " - " + element.matricula_embarcacion,
          value: element.id,
        });
      });
      setQueso(data.filter((equipo) => equipo.value == params.id3));
      console.log(queso[0]);
      setEquipos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editPescadores = async () => {
    if (params.id1) {
      const response1 = await getPescadoresRequestUno(params.id1);
      const response2 = await getPescadoresRequestUno(params.id2);
      setPescador({
        idTimonel: response1.data.id,
        nombreTimonel: response1.data.nombre,
        apellidoTimonel: response1.data.apellido,
        documentoTimonel: response1.data.documento,
        tipoDocumentoTimonel: response1.data.tipo_documentoFK,
        edadTimonel: response1.data.edad,
        contactoTimonel: response1.data.contacto,
        generoTimonel: response1.data.genero,
        categoriaTimonel: response1.data.categoriaFK,
        idComp: response2.data.id,
        nombreComp: response2.data.nombre,
        apellidoComp: response2.data.apellido,
        documentoComp: response2.data.documento,
        tipoDocumentoComp: response2.data.tipo_documentoFK,
        edadComp: response2.data.edad,
        contactoComp: response2.data.contacto,
        generoComp: response2.data.genero,
        categoriaComp: response2.data.categoriaFK,
        equipoID: params.id3,
      });
    }
  };

  useEffect(() => {
    cargarEquipos();
    cargarCategoria();
  }, [params.id1]);

  useEffect(() => {
    editPescadores();
  }, [params.id1]);

  return (
    <>
      <div className="bg-slate-300 w-50 rounded-md p-4 m x-auto mt-10 flex flex-col items-center">
        <Formik
          initialValues={pescador}
          enableReinitialize={true}
          onSubmit={async (values) => {
            if (params.id1) {
              await updatePescadoresRequest(params.id1, params.id2, values);
            } else {
              const rep = await crearPescadoresRequest(values);
            }
            navigate("/inscripcion/");
          }}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <Form>
              <div>
                {/* Embarcación */}
                {/* TODO: */}
                <Select
                  options={equipos}
                  onChange={(e) => {
                    values.equipoID = e.value;
                  }}
                  placeholder="Seleccione el equipo"
                  className="text-center"
                  inputId="aria-example-input"
                  required
                  tabSelectsValue="True"
                  getOptionValue={queso.value}
                  getOptionLabel={queso.label}
                  defaultValue={queso}
                />
                <div className="columns-2 mt-4">
                  <h1 className="block uppercase text-center font-bold text-2xl">
                    Datos del Timonel
                  </h1>
                  {/* ? Nombre Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombreTimonel"
                    placeholder="Nombre"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.nombreTimonel || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Apellido Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="apellidoTimonel"
                    placeholder="Apellido"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.apellidoTimonel || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Documento Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Documento
                  </label>
                  <input
                    type="number"
                    name="documentoTimonel"
                    placeholder="x.xxx.xxx"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.documentoTimonel || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Tipo documento Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Tipo de Documento
                  </label>
                  <select
                    name="tipoDocumentoTimonel"
                    id="tipoDocumentoTimonel"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.tipoDocumentoTimonel || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Documento</option>
                    <option value="1">Cédula</option>
                    <option value="2">DNI</option>
                    <option value="3">Pasaporte</option>
                  </select>
                  {/* Edad Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edadTimonel"
                    placeholder="xx"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.edadTimonel || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Contacto Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Contacto
                  </label>
                  <input
                    type="text"
                    name="contactoTimonel"
                    placeholder="098x xxx-xxx"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.contactoTimonel || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Genero Timonel */}
                  <label className="block uppercase text-center font-bold">
                    Genero
                  </label>
                  <select
                    name="generoTimonel"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.generoTimonel || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Genero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                  {/* Categoría */}
                  <label className="block uppercase text-center font-bold">
                    Categoría
                  </label>
                  <select
                    name="categoriaTimonel"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.categoriaTimonel || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Categoría</option>
                    {categorias.map((categoria) => (
                      <option
                        className="text-black"
                        key={categoria.id}
                        value={categoria.id}
                      >
                        {categoria.descripcion}
                      </option>
                    ))}
                  </select>
                  {/* Datos del Acompañante */}
                  <h1 className="block uppercase text-center font-bold text-2xl mt-4">
                    Datos del Acompañante
                  </h1>
                  {/* ? Nombre Comp */}
                  <label className="block uppercase text-center font-bold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombreComp"
                    placeholder="Juan"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.nombreComp || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Apellido Comp */}
                  <label className="block uppercase text-center font-bold">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="apellidoComp"
                    placeholder="Perez"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.apellidoComp || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Documento Comp */}
                  <label className="block uppercase text-center font-bold">
                    Documento
                  </label>
                  <input
                    type="number"
                    name="documentoComp"
                    placeholder="1234567"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.documentoComp || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Tipo documento Comp */}
                  <label className="block uppercase text-center font-bold">
                    Tipo de Documento
                  </label>
                  <select
                    name="tipoDocumentoComp"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.tipoDocumentoComp || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Documento</option>
                    <option value="1">Cédula</option>
                    <option value="2">DNI</option>
                    <option value="3">Pasaporte</option>
                  </select>
                  {/* Edad Comp */}
                  <label className="block uppercase text-center font-bold">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edadComp"
                    placeholder="20"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.edadComp || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Contacto Comp */}
                  <label className="block uppercase text-center font-bold">
                    Contacto
                  </label>
                  <input
                    type="text"
                    name="contactoComp"
                    placeholder="098x xxx-xxx"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.contactoComp || ""}
                    onChange={handleChange}
                    required
                  />
                  {/* Genero Comp */}
                  <label className="block uppercase text-center font-bold">
                    Genero
                  </label>
                  <select
                    name="generoComp"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.generoComp || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                  {/* Categoría Comp */}
                  <label className="block uppercase text-center font-bold">
                    Categoría
                  </label>
                  <select
                    name="categoriaComp"
                    className="px-2 py-1 rounded-sm w-full text-center"
                    value={values.categoriaComp || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Categoría</option>
                    {categorias.map((categoria) => (
                      <option
                        className="text-black"
                        key={categoria.id}
                        value={categoria.id}
                      >
                        {categoria.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block  
              bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4"
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Link
          to="/Inscripcion/"
          className="block bg-indigo-500 px-2 py-1 mt-3 text-white w-20 rounded-md text-center"
        >
          Volver
        </Link>
      </div>
    </>
  );
}

export default InscripcionForm;
