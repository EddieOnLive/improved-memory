import { pool } from "../db.js";

export const obtenerInformeGeneral = async (req, res) => {
  try {
    const [result] = await pool.query(
      
      "SELECT e.id AS equipoID, e.nombre_embarcacion, e.matricula_embarcacion, c.descripcion AS club, t.torneoDescripcion, e.puntajeTotal, p1.id AS idTimonel, p1.nombre AS nombreTimonel, p1.apellido AS apellidoTimonel, td1.descripcion AS tipoDocumentoTimonel, p1.documento AS documentoTimonel, p1.edad AS edadTimonel, p1.contacto AS contactoTimonel, p1.genero AS generoTimonel, cat1.descripcion AS categoriaTimonel, p2.id AS idComp, p2.nombre AS nombreComp, p2.apellido AS apellidoComp, td2.descripcion AS tipoDocumentoComp, p2.documento AS documentoComp, p2.edad AS edadComp, p2.contacto AS contactoComp, p2.genero AS generoComp, cat2.descripcion AS categoriaComp FROM equipo e INNER JOIN equipo_has_pescador ehfp1 ON ehfp1.equipoFK = e.id INNER JOIN equipo_has_pescador ehfp2 ON ehfp2.equipoFK = e.id INNER JOIN pescador p1 ON p1.id = ehfp1.pescadorFK INNER JOIN pescador p2 ON p2.id = ehfp2.pescadorFK INNER JOIN tipo_documento td1 ON td1.id = p1.tipo_DocumentoFK INNER JOIN tipo_documento td2 ON td2.id = p2.tipo_DocumentoFK INNER JOIN categoria cat1 ON cat1.id = p1.categoriaFK INNER JOIN categoria cat2 ON cat2.id = p2.categoriaFK INNER JOIN clubs c ON c.id = e.clubsFK INNER JOIN torneo t ON t.id = e.torneoFK GROUP BY e.id, e.nombre_embarcacion, e.matricula_embarcacion, c.descripcion, t.torneoDescripcion, e.puntajeTotal ORDER BY p1.nombre ASC;"

      /* "SELECT e.id AS equipoID, e.nombre_embarcacion, e.matricula_embarcacion, c.descripcion AS club, t.torneoDescripcion, e.puntajeTotal, p1.id AS idTimonel, p1.nombre AS nombreTimonel, p1.apellido AS apellidoTimonel, td1.descripcion AS tipoDocumentoTimonel, p1.documento AS documentoTimonel, p1.edad AS edadTimonel, p1.contacto AS contactoTimonel, p1.genero AS generoTimonel, cat1.descripcion AS categoriaTimonel, p2.id AS idComp, p2.nombre AS nombreComp, p2.apellido AS apellidoComp, td2.descripcion AS tipoDocumentoComp, p2.documento AS documentoComp, p2.edad AS edadComp, p2.contacto AS contactoComp, p2.genero AS generoComp, cat2.descripcion AS categoriaComp FROM equipo e INNER JOIN equipo_has_pescador ehfp1 ON ehfp1.equipoFK = e.id INNER JOIN equipo_has_pescador ehfp2 ON ehfp2.equipoFK = e.id INNER JOIN pescador p1 ON p1.id = ehfp1.pescadorFK INNER JOIN pescador p2 ON p2.id = ehfp2.pescadorFK INNER JOIN tipo_documento td1 ON td1.id = p1.tipo_DocumentoFK INNER JOIN tipo_documento td2 ON td2.id = p2.tipo_DocumentoFK INNER JOIN categoria cat1 ON cat1.id = p1.categoriaFK INNER JOIN categoria cat2 ON cat2.id = p2.categoriaFK INNER JOIN clubs c ON c.id = e.clubsFK INNER JOIN torneo t ON t.id = e.torneoFK GROUP BY e.id, e.nombre_embarcacion, e.matricula_embarcacion, c.descripcion, t.torneoDescripcion, e.puntajeTotal ORDER BY e.puntajeTotal DESC;" */
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerInformeClubes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT c.id AS clubID, c.descripcion AS clubDescripcion, SUM(e.puntajeTotal) AS puntajeTotal FROM equipo e INNER JOIN clubs c ON c.id = e.clubsFK WHERE c.descripcion <> 'Mixto' GROUP BY c.id, c.descripcion ORDER BY puntajeTotal DESC; "
      /* "SELECT c.id AS clubID, c.descripcion AS clubDescripcion, SUM(e.puntajeTotal) AS puntajeTotal, e.torneoFK AS torneoID FROM equipo e INNER JOIN clubs c ON c.id = e.clubsFK WHERE c.descripcion != 'Mixto' GROUP BY c.id, e.torneoFK ORDER BY puntajeTotal DESC;" */
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnInforme = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipo WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
