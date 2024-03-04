import { pool } from "../db.js";

export const obtenerInicio = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM modalidades ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnInicio = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT IF(COUNT(*) > 0, TRUE, FALSE) AS usuario_encontrado FROM usuarios WHERE usuario = ? AND password = ?",
      [req.params.usuario, req.params.password]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "modalidades no encontradas" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};

export const crearInicio = async (req, res) => {
  try {
    const { usuario, password, tipo_usuario, activo } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios (usuario, password, tipo_usuario, activo) VALUES (?, ?, ?)",
      [usuario, password, tipo_usuario, activo]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarInicio = async (req, res) => {
  try {
    const { usuario, password, tipo_usuario, activo } = req.body;
    const result = await pool.query(
      "UPDATE usuarios SET usuario=?, password=?, tipo_usuario=?, activo=? WHERE id = ?",
      [usuario, password, tipo_usuario, activo, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarInicio = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET activo=2 WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no Encontrados" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.error(500).json({ message: error.message });
  }
};
