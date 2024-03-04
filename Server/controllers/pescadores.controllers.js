import { pool } from "../db.js";

export const obtenerPescador = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM pescador");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnPescador = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM pescador WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Pescador no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearPescador = async (req, res) => {
  try {
    const {
      nombreTimonel,
      apellidoTimonel,
      documentoTimonel,
      tipoDocumentoTimonel,
      edadTimonel,
      contactoTimonel,
      generoTimonel,
      categoriaTimonel,
      nombreComp,
      apellidoComp,
      documentoComp,
      tipoDocumentoComp,
      edadComp,
      contactoComp,
      generoComp,
      categoriaComp,
      equipoID,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO pescador (nombre, apellido, documento, tipo_documentoFK, edad, contacto, genero, categoriaFK) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombreTimonel,
        apellidoTimonel,
        documentoTimonel,
        tipoDocumentoTimonel,
        edadTimonel,
        contactoTimonel,
        generoTimonel,
        categoriaTimonel,
      ]
    );
    const [resultado] = await pool.query(
      "INSERT INTO pescador (nombre, apellido, documento, tipo_documentoFK, edad, contacto, genero, categoriaFK) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombreComp,
        apellidoComp,
        documentoComp,
        tipoDocumentoComp,
        edadComp,
        contactoComp,
        generoComp,
        categoriaComp,
      ]
    );
    res.json({ id1: result.insertId, id2: resultado.insertId });

    const [cargar] = await pool.query(
      "INSERT INTO equipo_has_pescador (equipoFK, pescadorFK) VALUES (?, ?)",
      [equipoID, result.insertId]
    );
    const [cargar2] = await pool.query(
      "INSERT INTO equipo_has_pescador (equipoFK, pescadorFK) VALUES (?, ?)",
      [equipoID, resultado.insertId]
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarPescador = async (req, res) => {
  try {
    const {
      nombreTimonel,
      apellidoTimonel,
      documentoTimonel,
      tipoDocumentoTimonel,
      edadTimonel,
      contactoTimonel,
      generoTimonel,
      categoriaTimonel,
      nombreComp,
      apellidoComp,
      documentoComp,
      tipoDocumentoComp,
      edadComp,
      contactoComp,
      generoComp,
      categoriaComp,
      equipoID,
    } = req.body;
    const result = await pool.query(
      "UPDATE pescador SET nombre=?, apellido=?, documento=?, tipo_documentoFK=?, edad=?, contacto=?, genero=?, categoriaFK=? WHERE id = ?",
      [
        nombreTimonel,
        apellidoTimonel,
        documentoTimonel,
        tipoDocumentoTimonel,
        edadTimonel,
        contactoTimonel,
        generoTimonel,
        categoriaTimonel,
        req.params.id1,
      ]
    );
    const result2 = await pool.query(
      "UPDATE pescador SET nombre=?, apellido=?, documento=?, tipo_documentoFK=?, edad=?, contacto=?, genero=?, categoriaFK=? WHERE id = ?",
      [
        nombreComp,
        apellidoComp,
        documentoComp,
        tipoDocumentoComp,
        edadComp,
        contactoComp,
        generoComp,
        categoriaComp,
        req.params.id2,
      ]
    );

    const carga1 = await pool.query(
      "UPDATE equipo_has_pescador SET equipoFK=?, pescadorFK=? WHERE pescadorFK=?",
      [equipoID, req.params.id1, req.params.id1]
    );
    const carga2 = await pool.query(
      "UPDATE equipo_has_pescador SET equipoFK=?, pescadorFK=? WHERE pescadorFK=?",
      [equipoID, req.params.id2, req.params.id2]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarPescador = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM pescador WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pescador no Encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};
