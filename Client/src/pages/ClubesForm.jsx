/* "HTML" */
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  crearClubRequest,
  getClubRequestUna,
  updateClubRequest,
} from "../api/clubes.api";

/* Mapa */
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function ClubesForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [clubes, setClubes] = useState({
    descripcion: "",
    ubicacion: "a",
  });

  const [Location, setLocation] = useState({
    latitud: "",
    longitud: "",
  });

  const [defaultLocation, letDefaultLocation] = useState({
    currentLocation: { lat: "-27.09599", lng: "-55.5312966" },
    zoom: "16",
  });

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLocation({ latitud: e.latlng.lat, longitud: e.latlng.lng });
        /* console.log(e.latlng.lat);
        console.log(e.latlng.lng); */
      },
    });
    return false;
  };

  const editClubes = async () => {
    const response = await getClubRequestUna(params.id);
    setClubes(response.data);
    const latlng = response.data.ubicacion;
    const lati = latlng.split(",");
    setLocation({ latitud: lati[0], longitud: lati[1] });
  };

  useEffect(() => {
      editClubes();
  }, [params.id]);

  return (
    <>
      <div className="bg-slate-300  rounded-md p-4 m x-auto mt-10 mx-auto club-form">
        <Formik
          initialValues={clubes}
          enableReinitialize={true}
          onSubmit={async (values) => {
            values.ubicacion = Location.latitud + "," + Location.longitud;
            if (params.id) {
              await updateClubRequest(params.id, values);
            } else {
              await crearClubRequest(values);
            }
            navigate("/ClubPage/");
          }}
        >
          {({ handleSubmit, handleChange, values, isSubmitting }) => (
            <Form
            onSubmit={handleSubmit}>
              <h1 className="text-xl font-bold uppercase text-center">
                {params.id ? "Editar Club" : "Nuevo Club"}
              </h1>
              <label className="block uppercase text-center font-bold">
                Nombre
              </label>
              <input
                type="text"
                name="descripcion"
                placeholder="Club De Caza Y Pesca Bella Vista"
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.descripcion}
                required
              />
              <label className="block uppercase text-center font-bold">
                Ingrese la ubicación del club
              </label>

              <div id="map">
                <MapContainer
                  center={defaultLocation.currentLocation}
                  zoom={defaultLocation.zoom}
                  scrollWheelZoom={true}
                  onClick={(e) => {
                    /* console.log(e.latlng); */
                  }}
                  className="leaflet-container max-w-4xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[-27.09599, -55.5312966]}>
                    <Popup>USTED ESTÁ AQUÍ 🫡</Popup>
                  </Marker>
                  <Marker position={[Location.latitud, Location.longitud]}>
                    <Popup>SU CLUB 🫡</Popup>
                  </Marker>
                  <MapEvents />
                </MapContainer>
              </div>

              <input type="text" className="hidden" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="block bg-indigo-500 px-2 py-1 mt-4 text-white w-full rounded-md"
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </Form>
          )}
        </Formik>
        <button className="block text-center py-2 rounded-xl text-white w-full">
          <Link to="/ClubPage/" className="bg-indigo-500 px-2 py-1 rounded-md">
            Volver
          </Link>
        </button>
      </div>
    </>
  );
}

export default ClubesForm;
