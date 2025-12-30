<h1 align="center">PomodoroWeb</h1>

## Video

ulr:

## Description

The goal of the project is to have a pomodoro that mixes pomodoro and task management. It allows you to plan your day around your tasks and to use the pomodoro to make them evolve.

## Objective

I used a pomodoro all along the cs50x but none allowed me to have the features I was looking for. Pomodoros that only do pomodoro or paid pomodoros where I could not see the other features.

In terms of learning, it allowed me to do docker and docker compose, in order to be sure to have a single environment and to be able to easily share my project. I also was able to do react and see the basic hooks but also deeper hooks, like useReducer.

## Features

* Choice of timers focus / break / long break
* start / pause
* choice of the number of pomodoro cycles
* task creation
* task deletion
* task modification
* selection of the task to link its life cycle with that of the pomodoro
* task goes to done automatically when it has reached the end of its life cycle and goes automatically to the next non done task
* allows you to check a box to finish a task
* allows you to uncheck a box of a finished task to make it in progress again
* All user choices are saved in localStorage, which allows data persistence

## Technologies

### Frontend

React
Vite
SCSS

### containerization

Docker
Dockerfile
docker-compose

## installation and execution

prerequisite: have docker and docker compose installed on the pc that will run the project

Start by cloning the project on your pc
run the command docker compose up --build
go in the browser to [localhost:5173](http://localhost:5173) or change the port if you modified it in the .env

## Project structure

* `.env` : file containing the environment variables
* `docker-compose.yml` : containerization orchestration
* `frontend` : folder containing all the front code
* `cert` : location of security certificates if the environment needs it (managed by the Dockerfile)
* `Dockerfile` : project containerization
* `vite.config.js` : vite configuration
* `src` : project code
* `src/App.jsx` : main component of the project
* `src/main.jsx` : entry point of the project
* `src/main.scss` : entry point of partial files in scss
* `src/components` : folder containing all components
* `src/constants` : folder containing the constants necessary for the initialization of the project
* `src/context` : folder containing the different files of the useContext hook
* `src/reducers` : folder containing the reducer of the tasks
* `src/style` : folder containing the different SCSS files for the style of the application
* `src/utils` : folder containing the different utils used in the application

## project operation

### Containerization

I chose to containerize the project for several reasons. The first is that the project must be portable, containerization seems to me to be the best way to achieve this because whatever the user's environment, as long as they have docker and docker compose installed on their pc, they will be able to run the project in the same conditions as me.
The second is that docker and more particularly docker compose allow to launch an entire project in a single command, which greatly simplifies the task for the end user.

#### Dockerfile

To be sure of the environment consistency, I chose to use a digest to pin the image on which I was going to work. This makes it possible to be sure, whatever the time at which the image will be downloaded, that it will always be the same.

I then installed `tini`, which serves as an init process: it correctly manages signals (SIGTERM, etc.) and avoids zombie process issues in the container.

I was then confronted with a certificate problem. I worked on this project from 2 different environments:

* My environment, which needs certificates to access the internet.
* My personal environment, which does not need certificates to work correctly.

However, I did not want to put the certificates online or have them on my personal environment, so I had to find a way to be able to work on both environments (with and without certificates) without the `Dockerfile` failing.
So I decided to create a cert folder in which a `.gitkeep` file would be placed. This is in this folder that my work environment had its certificate. The certificate is put in the `.gitignore` to avoid sharing it. Thanks to the `.gitkeep` file, the cert folder is indeed shared on github even from my personal environment and at docker startup, the content of the cert folder is copied into the container path that must contain the certificates, then it runs the update of the certificate store. Result, if a certificate is present, the store is updated and the environment starts with the rights to go on the internet, if there are no certificates, the store updates but does not add any new certificates. I then use this same store so that node is consistent with the rest of the environment.

I use `npm ci` so that the installation is done from the package-lock.json and therefore have the same versions of my dependencies in all cases.

#### docker compose

The choice to use `docker compose` even with a single service allows to centralize the configuration of ports, environment variable files and volumes in a single file and to launch the project with a single simple command (docker compose up). This choice avoids having a long docker run command that can be mis-copied and that is not standard like a simple docker compose up can be.

#### .env

The .env file is used in `docker-compose.yml`. The file is already filled in, because there is no dangerous data in it, it is purely environment configuration, but you can always modify it.

### frontend

#### Vite

I chose Vite to start quickly and keep a smooth workflow in development. Vite offers a very fast development server and efficient hot reload, which is particularly useful when iterating often on the UI and the timer logic. It also provides a modern build chain without heavy configuration, which allows me to focus on the project logic rather than on tooling.

#### React

I chose React because my application is a very interactive interface: a timer that updates continuously, a task list with creation/editing/deletion, and a selection of the active task that influences the global state. React makes it easier to build a UI in components and makes synchronization between the state of the application and the display simpler. It also allowed me to practice a more structured state management with hooks like `useReducer` to manage transitions (cycles, active task, completed tasks).

##### App.jsx

It is the center of the project, the 3 big components are here and the highest functions in the dom tree are here.

##### Pomodoro.jsx

It is the first big component of the project. It is the one that manages the whole pomodoro part with the pomodoro cycles, the focus / break / long break phases and the update button. It uses 2 components for display, a first one which is the classic display of the pomodoro and a second one which is its update. The update of the pomodoro aims to keep the same UI as the display but by putting the editable parts into inputs. It then no longer displays the update button but a button to confirm the update or to cancel it. To display the timer in a correct format, it uses the displayFormat utils which is in the file `src/utils/formatTime`

##### Countdown.jsx

This component is the one that displays the timer. It feeds on the value of the selected phase and formats it. It also displays a Start button that becomes pause once active. This action starts the timer. At each end of timer, the cycle and the phase change automatically depending on the state of the cycle.

##### TaskList.jsx

This component is the last big part of the application. It allows managing the list of tasks. As for `Pomodoro.jsx`, it allows each task to be displayed normally or to be displayed in edit mode. It is also possible to add a new task. The state of each task is directly linked to the state of the countdown and the pomodoro cycle. Each task can have 3 states:

* To Do
* In Course
* Done

If the task is on To Do, the state does not change
If it is on In Course, each time the focus phase of the pomodoro reaches its end, the task cycle increases by 1. When it reaches its maximum cycle, the task automatically goes to Done and the checkbox at the bottom left automatically activates
If a Done task is selected again, the checkbox is unchecked, its maximum number of cycles increases by 1 and its status goes back to In Progress.
It is also possible to modify a task, each modification can have an impact on the global state of it.

All these States being complex to manage, this component is the only one to have a useReducer that manages it. This one is in the file `src/reducers/task.js`. It allows to manage everything we saw above.

##### localStorage

All actions that modify a state of the application are saved in localStorage to allow the user to keep their pomodoro with their own timers and their tasks if they did not finish them. 2 custom hooks were created to manage this, `src/hooks/usePersistentReducer.js` and `src/hooks/usePersistentState.js`

##### data

An initial state is provided for the pomodoro and the tasks by the files `src/data/pomodoro.js` and `src/data/tasks.js`.

##### context

The phases and cycles of the pomodoro are put in a global context because used throughout the application. They are defined in the files `src/context/CycleContext.jsx` and `src/context/PhaseContext.jsx` and applied in `main.jsx`

#### SCSS

I chose SCSS to organize the styles in a more maintainable way than a simple CSS file. Thanks to splitting into partials, I can manage the style of the components more cleanly and evolve the design without having a single big file that is difficult to maintain.

All the partials are in the folder `src/style`. They style the components and are called in main.scss which is itself called in main.jsx so that the whole application has access to its style.

## AI usage
I used AI (ChatGPT) to help translate this README from French to English.