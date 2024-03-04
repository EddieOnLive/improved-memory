import { pool } from "../db.js";

export const obtenerPiezas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT piezas.id, descripcion, tipo_piezaFK, puntaje, medida FROM piezas INNER JOIN tipo_pieza ON piezas.tipo_piezaFK=tipo_pieza.id");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnaPieza = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM piezas WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Pieza no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearPiezas = async (req, res) => {
  try {
    const { descPieza, tipoPieza, puntajePieza } = req.body;
    const [result] = await pool.query(
      "INSERT INTO piezas (descripcion, tipo_piezaFK, puntaje) VALUES (?, ?, ?)",
      [descPieza, tipoPieza, puntajePieza]
    );
    res.json({ id: result.insertId, puntajePieza });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarPiezas = async (req, res) => {
  try {
    const { descPieza, tipoPieza, puntajePieza } = req.body;
    const result = await pool.query(
      "UPDATE piezas SET descripcion=?, tipo_piezaFK=?, puntaje=? WHERE id = ?",
      [descPieza, tipoPieza, puntajePieza, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarPiezas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM piezas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Piezas no Encontradas" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};
