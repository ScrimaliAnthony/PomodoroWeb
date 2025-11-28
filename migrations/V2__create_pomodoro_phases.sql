CREATE TABLE IF NOT EXISTS public.pomodoro_phases (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  minutes INT NOT NULL CHECK (minutes >= 0),
  seconds INT NOT NULL CHECK (seconds >= 0 AND seconds < 60),
  position INT NOT NULL CHECK (position >= 0 AND position <= 2),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uniq_user_phase_position UNIQUE (user_id, position)
);
