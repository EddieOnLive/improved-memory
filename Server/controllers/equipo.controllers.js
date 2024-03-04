import { pool } from "../db.js";

export const obtenerEquipos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT DISTINCT equipo.id, equipo.nombre_embarcacion, equipo.matricula_embarcacion, clubs.descripcion AS club_descripcion, torneo.torneoDescripcion AS torneo_descripcion, equipo.observacion, equipo.estado, ( SELECT pescador.id FROM equipo_has_pescador INNER JOIN pescador ON equipo_has_pescador.pescadorFK = pescador.id WHERE equipo_has_pescador.equipoFK = equipo.id ORDER BY pescador.nombre LIMIT 1 ) AS pescador_id1, ( SELECT CONCAT(pescador.nombre, ', ', pescador.apellido) FROM equipo_has_pescador INNER JOIN pescador ON equipo_has_pescador.pescadorFK = pescador.id WHERE equipo_has_pescador.equipoFK = equipo.id ORDER BY pescador.nombre LIMIT 1 ) AS nombre_completo_pescador1, ( SELECT pescador.id FROM equipo_has_pescador INNER JOIN pescador ON equipo_has_pescador.pescadorFK = pescador.id WHERE equipo_has_pescador.equipoFK = equipo.id ORDER BY pescador.nombre LIMIT 2 OFFSET 1 ) AS pescador_id2, ( SELECT CONCAT(pescador.nombre, ', ', pescador.apellido) FROM equipo_has_pescador INNER JOIN pescador ON equipo_has_pescador.pescadorFK = pescador.id WHERE equipo_has_pescador.equipoFK = equipo.id ORDER BY pescador.nombre LIMIT 2 OFFSET 1 ) AS nombre_completo_pescador2 FROM equipo INNER JOIN equipo_has_pescador ON equipo.id = equipo_has_pescador.equipoFK INNER JOIN clubs ON equipo.clubsFK = clubs.id INNER JOIN torneo ON equipo.torneoFK = torneo.id WHERE equipo.estado = 1 GROUP BY equipo.id HAVING COUNT(DISTINCT equipo_has_pescador.pescadorFK) = 2 ORDER BY equipo.id;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerEquiposTodos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipo");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnEquipo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipo WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearEquipo = async (req, res) => {
  try {
    const {
      nombreEmbarcacion,
      matriculaEmbarcacion,
      torneo,
      club,
      observacion,
      estado,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO equipo (nombre_embarcacion, matricula_embarcacion, torneoFK, clubsFK, observacion, estado) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nombreEmbarcacion,
        matriculaEmbarcacion,
        torneo,
        club,
        observacion,
        estado,
      ]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarEquipo = async (req, res) => {
  try {
    const {
      nombreEmbarcacion,
      matriculaEmbarcacion,
      torneo,
      club,
      observacion,
      estado,
    } = req.body;
    const result = await pool.query(
      "UPDATE equipo SET nombre_embarcacion=?, matricula_embarcacion=?, clubsFK=?, torneoFK=?, observacion=?, estado=?  WHERE id = ?",
      [
        nombreEmbarcacion,
        matriculaEmbarcacion,
        club,
        torneo,
        observacion,
        estado,
        req.params.id,
      ]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const borrarEquipo = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE equipo SET estado=2 WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Equipo no Encontrado" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
