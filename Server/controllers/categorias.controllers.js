import { pool } from "../db.js";

export const obtenerCategorias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM categoria ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnaCategoria = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM categoria WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "categoria no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO categoria (descripcion) VALUES (?)",
      [descripcion]
    );
    res.json({ id: result.insertId, descripcion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const result = await pool.query(
      "UPDATE categoria SET descripcion=? WHERE id = ?",
      [descripcion, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarCategoria = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM categoria WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoria no Encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};
