import { pool } from "../db.js";

export const obtenerFiscales = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT f.id, f.nombre, f.apellido, f.documento, f.contacto, f.Torneo_FK as torneo_FK, t.torneoDescripcion FROM fiscal as f INNER JOIN torneo as t ON f.Torneo_FK=t.id"); 
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnFiscal = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM fiscal WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "fiscal no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearFiscal = async (req, res) => {
  try {
    const { horario, nombre, apellido, documento, contacto, torneoid } = req.body;
    const [result] = await pool.query(
      "INSERT INTO fiscal (horario_FK, nombre, apellido, documento, contacto, Torneo_FK) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [horario, nombre, apellido, documento, contacto, torneoid]
    );
    res.json({ id: result.insertId});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarFiscal = async (req, res) => {
  try {
    const { horario, nombre, apellido, documento, contacto, torneoid } = req.body;
    const result = await pool.query("UPDATE fiscal SET horario_FK=?, nombre=?, apellido=?, documento=?, contacto=?, Torneo_FK=?  WHERE id = ?", [
        horario, nombre, apellido, documento, contacto, torneoid,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarFiscal = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM fiscal WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "fiscal no Encontrado" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


