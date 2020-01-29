![text](https://github.com/IanSteenstra/TherapyNow/blob/master/frontend/gui/src/images/logo-hori.jpg)
# TherapyNow

## Summary
TherapyNow is an anonymous instant-messaging app that provides one-on-one therapeutic conversations with other users, trained and professional counselors. Using data from the top experts in psychology, the app will be able to effectively pair two users together that have the highest chance of developing trust and impactful conversations the quickest. In addition, there will be set times where users will be able to message with trained and/or professional counselors at RPI.

## Backend Server Setup
1. Terminal open in the backend directory holder the env and src folders
2. run: source env/Scripts/activate
3. Open the src directory where the manage.py file is located
4. run: pip install django-admin
5. run: pip install django-cors-headers
6. run: pip install djangorestframework
7. run: pip install django-rest-auth
8. run: pip install django-allauth
9. run: python manage.py runserver

## Frontend Localhost Setup
1. New terminal open in the frontend/gui directory holding the package.json file
2. Delete/remove node_modules folder and package-lock.json file
3. Install Node and npm: https://nodejs.org/en/download/
4. run: npm install --save core-js@^3
5. run: npm start

## Contact
Feel free to contact me for any questions at steenstra.ian@gmail.com
