import pool from "../config/database_pomodoro.js";

export async function getTasks(req, res) {
  try {
    const userId = req.user.id;

    const getResult = await pool.query(
      `
        SELECT
          id,
          user_id,
          title,
          description,
          status,
          actual_cycle,
          nb_cycle,
          is_done,
          created_at,
          updated_at
        FROM tasks
        WHERE user_id = $1
        ORDER BY id ASC
      `,
      [userId]
    );

    res.json(getResult.rows);
  } catch (error) {
    console.error("Error in GET /api/tasks", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createTask(req, res) {
  try {
    const userId = req.user.id;
    const { title, description, status, nb_cycle } = req.body;

    if (!title || !status) {
      return res
        .status(400)
        .json({ error: "title and status are required" });
    }

    const nbCycleValue = nb_cycle ?? 1;

    const insertResult = await pool.query(
      `
        INSERT INTO tasks (
          user_id,
          title,
          description,
          status,
          actual_cycle,
          nb_cycle,
          is_done
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id,
          user_id,
          title,
          description,
          status,
          actual_cycle,
          nb_cycle,
          is_done,
          created_at,
          updated_at
      `,
      [
        userId,
        title,
        description ?? null,
        status,
        0,
        nbCycleValue,
        false
      ]
    );

    const newTask = insertResult.rows[0];

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error in POST /api/tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function putTask(req, res) {
  try {
    const userId = req.user.id;
    const taskId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task id" });
    }

    const {
      title,
      description,
      status,
      actual_cycle,
      nb_cycle,
      is_done,
    } = req.body;

    if (!title || !status) {
      return res
        .status(400)
        .json({ error: "title and status are required" });
    }

    const actualCycleValue = actual_cycle ?? 0;
    const nbCycleValue = nb_cycle ?? 1;
    const isDoneValue = is_done ?? false;

    const updateResult = await pool.query(
      `
        UPDATE tasks
        SET
          title = $3,
          description = $4,
          status = $5,
          actual_cycle = $6,
          nb_cycle = $7,
          is_done = $8,
          updated_at = NOW()
        WHERE id = $1 AND user_id = $2
        RETURNING
          id,
          user_id,
          title,
          description,
          status,
          actual_cycle,
          nb_cycle,
          is_done,
          created_at,
          updated_at
      `,
      [
        taskId,
        userId,
        title,
        description ?? null,
        status,
        actualCycleValue,
        nbCycleValue,
        isDoneValue,
      ]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = updateResult.rows[0];
    res.json(updatedTask);
  } catch (error) {
    console.error("Error in PUT /api/tasks/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTask(req, res) {
  try {
    const userId = req.user.id;
    const taskId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task id" });
    }

    const deleteResult = await pool.query(
      `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING id
      `,
      [taskId, userId]
    );

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error in DELETE /api/tasks/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
