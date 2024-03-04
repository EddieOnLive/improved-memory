import { pool } from "../db.js";

export const obtenerTorneo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM torneo ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnTorneo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM torneo WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "torneo no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearTorneo = async (req, res) => {
  try {
    const { modalidad, descripcion, horaInicio, horaFin } = req.body;
    const [result] = await pool.query(
      "INSERT INTO torneo (modalidadesFK, torneoDescripcion, horaInicio, horaFin) VALUES (?, ?, ?, ?)",
      [modalidad, descripcion, horaInicio, horaFin]
    );
    res.json({ id: result.insertId, modalidad, descripcion, horaInicio, horaFin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarTorneo = async (req, res) => {
  try {
    const { modalidad, descripcion, horaInicio, horaFin } = req.body;
    const result = await pool.query("UPDATE torneo SET modalidadesFK=?, torneoDescripcion=?, horaInicio=?, horaFin=?  WHERE id = ?", [
      modalidad, descripcion, horaInicio, horaFin,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarTorneo = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM torneo WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "torneo no Encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


