import { pool } from "../db.js";

export const obtenerHorario = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM horario WHERE activo = true");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnHorario = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM horario WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "horarios no encontrados" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearHorario = async (req, res) => {
  try {
    const { horaEntrada, horaSalida } = req.body;
    const [result] = await pool.query(
      "INSERT INTO horario (horaEntrada, horaSalida) VALUES (?, ?)",
      [ horaEntrada, horaSalida]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarHorario = async (req, res) => {
  try {
    const { horaEntrada, horaSalida } = req.body;
    const result = await pool.query("UPDATE horario SET horaEntrada=?, horaSalida=? WHERE id = ?", [
        horaEntrada, horaSalida,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarHorario = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE horario SET activo = false WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "horario no Encontrados" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


