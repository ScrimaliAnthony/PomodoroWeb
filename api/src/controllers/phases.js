import pool from "../config/database_pomodoro.js";

export async function getPhases(req, res) {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
        SELECT
          position,
          minutes,
          seconds
        FROM pomodoro_phases
        WHERE user_id = $1
        ORDER BY position ASC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error in GET /api/phases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function putPhases(req, res) {
  try {
    const userId = req.user.id;
    const phases = req.body;

    if (!Array.isArray(phases) || phases.length === 0) {
      return res
        .status(400)
        .json({ error: "Request body must be a non-empty array of phases" });
    }

    const positionsSeen = new Set();

    for (const phase of phases) {
      const { position, minutes, seconds } = phase ?? {};

      if (position == null) {
        return res
          .status(400)
          .json({ error: "Each phase must have a position" });
      }

      if (!Number.isInteger(position) || position < 0 || position > 2) {
        return res
          .status(400)
          .json({ error: "position must be 0, 1 or 2" });
      }

      if (positionsSeen.has(position)) {
        return res
          .status(400)
          .json({ error: "Duplicate position in phases array" });
      }
      positionsSeen.add(position);

      if (minutes == null || seconds == null) {
        return res
          .status(400)
          .json({ error: "minutes and seconds are required for each phase" });
      }

      if (!Number.isInteger(minutes) || minutes < 0) {
        return res
          .status(400)
          .json({ error: "minutes must be an integer >= 0" });
      }

      if (!Number.isInteger(seconds) || seconds < 0 || seconds >= 60) {
        return res
          .status(400)
          .json({ error: "seconds must be an integer between 0 and 59" });
      }
    }

    const updatedPhases = [];

    for (const phase of phases) {
      const { position, minutes, seconds } = phase;

      const updateResult = await pool.query(
        `
          UPDATE pomodoro_phases
          SET
            minutes = $3,
            seconds = $4,
            updated_at = NOW()
          WHERE user_id = $1 AND position = $2
          RETURNING
            id,
            user_id,
            label,
            position,
            minutes,
            seconds,
            updated_at
        `,
        [userId, position, minutes, seconds]
      );

      if (updateResult.rowCount === 0) {
        return res.status(404).json({
          error: `Phase not found for position ${position}`,
        });
      }

      updatedPhases.push(updateResult.rows[0]);
    }

    res.json(updatedPhases);
  } catch (error) {
    console.error("Error in PUT /api/phases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}