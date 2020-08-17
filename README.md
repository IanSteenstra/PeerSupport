![text](https://github.com/IanSteenstra/PeerSupport/blob/master/frontend/src/images/logo-hori.jpg)

# PeerSupport

## Summary

PeerSupport is an anonymous peer-support web application that provides easy access for college students to get the help they need in a safe and reliable manner.

## Run Codebase

1. `docker-compose build`
1. `docker-compose up`
1. There should now be two servers running:

- [http://127.0.0.1:8000](http://127.0.0.1:8000) is the Django app
- [http://127.0.0.1:3000](http://127.0.0.1:3000) is the React app

## Issue Running Codebase / Servers Not Working

1. In another terminal while the servers are still running, enter `docker ps`
1. Find the Container ID for the peersupport_django server (ex: db54a724e9a4)
1. Run `docker exec -it <container ID> bash`
1. `python manage.py migrate`

## Contact

Feel free to contact me for any questions at steenstra.ian@gmail.com
