import { pool } from "../db.js";

export const obtenerModalidades = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM modalidades ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnaModalidad = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM modalidades WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "modalidades no encontradas" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearModalidad = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO modalidades (descripcion) VALUES (?)",
      [descripcion]
    );
    res.json({ id: result.insertId, descripcion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarModalidades = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const result = await pool.query(
      "UPDATE modalidades SET descripcion=? WHERE id = ?",
      [descripcion, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarModalidades = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM modalidades WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "modalidades no Encontradas" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};
