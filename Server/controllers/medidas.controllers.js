import { pool } from "../db.js";

export const obtenerMedidas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tipo_pieza ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnaMedida = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tipo_pieza WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "tipo pieza no encontradas" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearMedida = async (req, res) => {
  try {
    const { medida } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tipo_pieza (medida) VALUES (?)",
      [medida]
    );
    res.json({ id: result.insertId, medida });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarMedida = async (req, res) => {
  try {
    const { medida } = req.body;
    const result = await pool.query(
      "UPDATE tipo_pieza SET medida=? WHERE id = ?",
      [medida, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarMedidas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tipo_pieza WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "medidas no Encontradas" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};
