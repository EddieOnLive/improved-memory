import { pool } from "../db.js";

export const obtenerCapturas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM categoria ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerUnaCaptura = async (req, res) => {
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

export const cargarCaptura = async (req, res) => {
  try {
    const valores = req.body;
    for (let i = 0; i < valores.capturas.length; i++) {
      const result = await pool.query(
        "INSERT INTO capturas (equipoFK, capturasFK, cantidad) VALUES (?,?,?)",
        [
          valores.equipoID,
          valores.capturas[i].idPieza,
          valores.capturas[i].cantCaptura,
        ]
      );
      const result2 = await pool.query(
        "SELECT puntajeTotal FROM equipo WHERE id = ?",
        [valores.equipoID]
      );

      let aux;
      if (isNaN(result2[0].puntajeTotal)) {
        aux = valores.suma;
      } else {
        aux = parseInt(result2[0].puntajeTotal, 10) + valores.suma;
      }

      const updateResult = await pool.query(
        "UPDATE equipo SET puntajeTotal=? WHERE id = ?",
        [aux, valores.equipoID]
      );

      console.log(result2[0].puntajeTotal);
    }
    res.json({ id: valores });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarCaptura = async (req, res) => {
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

export const borrarCaptura = async (req, res) => {
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
