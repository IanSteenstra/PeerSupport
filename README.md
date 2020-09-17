<img src="https://github.com/IanSteenstra/PeerSupport/blob/master/frontend/src/images/logo-hori.jpg" alt="PeerSupport logo" title="PeerSupport"  height="200" />

PeerSupport
=========================
PeerSupport is an anonymous peer support chat application that allows users to message each other without the worry of their identity being known. Users can flag risky messages (ex: Suicidal Ideation, Potential Violence, Harassment), which only monitor admins can view and decide the best course of action to ensure a safe environment. 

## Installation
Docker & Docker-Compose are needed in order to run this application. You can download Docker <a href='https://docs.docker.com/engine/install/'> here </a> and Docker-Compose <a href='https://docs.docker.com/compose/install/'> here </a>. Make sure to follow the directions according to the system you are running the application on. 

Run the following commands inside the root directory: 
1. `docker-compose build`
1. `docker-compose up`

You can now view the main website at http://127.0.0.1 and the Django Admin Page at http://127.0.0.1/api/admin/.

## Connect to the backend server
In case you need to make migrations to the database or create a superuser, who will need to connect to the running backend server.

1. In another terminal, while the servers are still running, enter `docker ps`
1. Find the Container ID for the peersupport_backend server (ex: db54a724e9a4)
1. Run `docker exec -it <container ID> bash`
1. Run your desired commands (ex: `python manage.py migrate`, `python manage.py createsuperuser`)

## Docker for Windows Issue
If Nginx is giving an error after running `docker-compose up`, you may need to turn filesharing on for the entire directory of the application. For help, look under FILE SHARING <a href='https://docs.docker.com/docker-for-windows/'> here </a>.

## License

PeerSupport is licensed under the terms of the MIT license and is available for free.
