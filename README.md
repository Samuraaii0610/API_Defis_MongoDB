# API_Defis_MongoDB

## Description

L'application permet aux utilisateurs de s'inscrire, de se connecter et de participer à des défis environnementaux. Les utilisateurs peuvent également consulter des défis aléatoires, ajouter de nouveaux défis (réservé aux administrateurs), modifier et supprimer des défis (réservé aux administrateurs).

## Fonctionnalités

- Inscription d'un nouvel utilisateur
- Connexion d'un utilisateur
- Récupération d'un défi aléatoire
- Récupération de plusieurs défis aléatoires
- Ajout d'un nouveau défi (réservé aux administrateurs)
- Modification d'un défi existant (réservé aux administrateurs)
- Suppression d'un défi (réservé aux administrateurs)

## Utilisation

Les routes sont utilisables dans le fichier api.http. Pour les utiliser, nous choisissons d'utiliser l'extension "Rest Client" sur Visual Studio Code. Vous pouvez créer deux types d'utilisateurs, un "user" ou un "administrator". La différence est que le "user" peut seulement se connecter, s'inscrire et tirer un ou plusieurs défis aléatoirement. L'"administrator", lui, peut créer, modifier et supprimer des défis. Pour ce faire, il doit récupérer le token donné dans la fenêtre de réponse lors de la connexion et le mettre dans la ligne "Authorization Bearer" se trouvant dans les trois routes permettant de créer, modifier et supprimer un défi. Exemple : "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjA1OTM0MTM3NzIxZTg4YjRmNjAyYTQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMTgxMjEzN30.VpfcU-2_fUpmu6z_mfGxUveiUMjPVI61f6ynBwP-JvY". Enfin, pour modifier et supprimer un défi, il faut récupérer l'id du défi obtenu dans la fenêtre de réponse lors de sa création et le placer à la fin de l'URL.

