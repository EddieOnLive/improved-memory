import { pool } from "../db.js";

export const obtenerReglas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM reglas ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const obtenerUnaRegla = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM reglas WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Regla no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearRegla = async (req, res) => {
  try {
    const { articulo, descripcion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO reglas (articulo, descripcion) VALUES (?, ?)",
      [articulo, descripcion]
    );
    res.json({ id: result.insertId, articulo, descripcion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarRegla = async (req, res) => {
  try {
    const { articulo, descripcion } = req.body;
    const result = await pool.query("UPDATE reglas SET articulo=?, descripcion=?  WHERE id = ?", [
      articulo,descripcion,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const borrarRegla = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM reglas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Regla no Encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};


