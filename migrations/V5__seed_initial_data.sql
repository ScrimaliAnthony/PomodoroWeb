INSERT INTO public.users (username, email, password_hash)
VALUES ('MasterPom', 'master.pom@pomodoro.com', 'changeme');

INSERT INTO public.pomodoro_phases (user_id, label, minutes, seconds, position)
VALUES 
    (1, 'Concentration', 25, 0, 0),
    (1, 'Pause',          5, 0, 1),
    (1, 'Long Pause',    15, 0, 2);

INSERT INTO public.pomodoro_cycle (user_id, current_cycle, max_cycle)
VALUES (1, 0, 3);

INSERT INTO public.tasks (
    user_id,
    title,
    description,
    status,
    actual_cycle,
    nb_cycle,
    is_done
)
VALUES
    (1, 'My first Task',  'Add my today tasks to the list', 'TODO', 0, 1, FALSE),
    (1, 'My second Task', 'Add a task to the cycle',        'TODO', 0, 2, FALSE),
    (1, 'My third Task',  'Finish my today tasks',          'DONE', 1, 1, TRUE);
