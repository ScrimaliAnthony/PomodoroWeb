<h1 align="center">PomodoroWeb</h1>

## Stack Techno

Le projet doit être reproductible. Pour cela, il sera dockerisé.

### Base de données

- PostgreSQL 17.6 (Base de Données)
- Flyway 11.14 (Migration de la base de données)

#### ERD
```mermaid
erDiagram
    users {
        bigint id PK "primary key"
        text username UK "not null, unique"
        text email UK "not null, unique"
        text password_hash "not null"
        timestamptz created_at "DEFAULT NOW()"
        timestamptz updated_at "DEFAULT NOW()"
    }

    pomodoro_phases {
        bigint id PK "primary key"
        bigint user_id FK "to users.id, not null"
        text label "not null"
        int minutes "not null, >= 0"
        int seconds "not null, [0-59]"
        int position "not null, [0-2], unique per user"
        timestamptz updated_at "DEFAULT NOW()"
    }

    pomodoro_cycle {
        bigint id PK "primary key"
        bigint user_id FK "to users.id, not null"
        int current_cycle ">= 0, not null"
        int max_cycle ">0, not null"
        timestamptz updated_at "DEFAULT NOW()"
    }

    tasks {
        bigint id PK "primary key"
        bigint user_id FK "to users.id, not null"
        text title "not null"
        text description
        text status "e.g. TODO/IN_PROGRESS/DONE, not null"
        int actual_cycle "default 0"
        int nb_cycle "default 1, > 0"
        boolean is_done "default false"
        timestamptz created_at "DEFAULT NOW()"
        timestamptz updated_at "DEFAULT NOW()"
    }

    users ||--o{ pomodoro_phases : "has"
    users ||--|| pomodoro_cycle : "has"
    users ||--o{ tasks : "has"
```

### BackEnd

- Node 22.20 (Runtime)
- Express (Routing)
- bcrypt (Hachage)
- JWT (token de session)
- *NC* (Système de mailing automatique)

### Frontend

- React (SPA)
- React Router (Routing)
