CREATE TABLE IF NOT EXISTS public.pomodoro_cycle (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  current_cycle INT NOT NULL CHECK (current_cycle >= 0),
  max_cycle INT NOT NULL CHECK (max_cycle > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
