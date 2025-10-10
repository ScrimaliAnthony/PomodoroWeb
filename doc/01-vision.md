# PomodoroWeb - Vision & Périmètre

## Objectif

Créer un outil qui aide à planifier et suivre des sessions de concentration liées à des tâches

## Fonctionnalités v1

- choisir le temps d'une session. *tout utilisateur*
- choisir le nombre de session avant une pause. *tout utilisateur*
- création de compte sécurisé. *tout utilisateur*
- connexion sécurisé. *utilisateur connecté*
- créer une liste de tâches à effectuer. *tout utilisateur*
- Donner le temps a faire pour une tâche. *tout utilisateur*
- Lier le temps d'une tâche avec le pomodoro (ex: tâche 1 = 2 cycle, se supprime après 2 cycle de pomodoro).  *tout utilisateur*
- A la fin d'un cycles, le pomodoro doit sonner (choix entre plusieurs sonneries). *tout utilisateur*
- Le compte permet la persistance de toutes les données sauvegardé coté serveur. *utilisateur connecté*

## Hors Périmètre

- Collaboration temps réel
- Intégration Discord
- Application mobile

## Critères de réussite

- L'utilisateur peut créer un compte, confirmer son email, se connecter
- Il peut lancer une session, lier des tâches, ses données sont persistantes
- Le projet se lance en 1 commande Docker (reproductible)