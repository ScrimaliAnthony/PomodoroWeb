import pool from "../config/database_pomodoro.js";

export async function getCycle(req, res) {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
        SELECT
          id,
          user_id,
          current_cycle,
          max_cycle,
          updated_at
        FROM pomodoro_cycle
        WHERE user_id = $1
      `,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cycle not found" });
    }

    const cycle = result.rows[0];
    res.json(cycle);
  } catch (error) {
    console.error("Error in GET /api/cycle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function putCycle(req, res) {
  try {
    const userId = req.user.id;
    const { current_cycle, max_cycle } = req.body;

    if (current_cycle == null || max_cycle == null) {
      return res
        .status(400)
        .json({ error: "current_cycle and max_cycle are required" });
    }

    if (!Number.isInteger(current_cycle) || current_cycle < 0) {
      return res
        .status(400)
        .json({ error: "current_cycle must be an integer >= 0" });
    }

    if (!Number.isInteger(max_cycle) || max_cycle <= 0) {
      return res
        .status(400)
        .json({ error: "max_cycle must be an integer > 0" });
    }

    const updateResult = await pool.query(
      `
        UPDATE pomodoro_cycle
        SET
          current_cycle = $2,
          max_cycle = $3,
          updated_at = NOW()
        WHERE user_id = $1
        RETURNING
          id,
          user_id,
          current_cycle,
          max_cycle,
          updated_at
      `,
      [userId, current_cycle, max_cycle]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Cycle not found" });
    }

    const updatedCycle = updateResult.rows[0];
    res.json(updatedCycle);
  } catch (error) {
    console.error("Error in PUT /api/cycle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
