# Bluthbusters

This project was developed in order to get familiar with developing frontend applications with Angular.
The idea was to implement a fake movie renting service with the following capabilities:

* User login/registration and appropriate page protection to make the page accessible if the user is properly logged in
* An overview of available films
* Adding/updating movies to the database
* A detailed view of a movie
* An overview of all rented films
* Renting and returning a film

This project was generated with [Angular CLI](https://github.com/angular/angular-cli), makes use of [Material](https://material.angular.io)
for most of the visual components, [flex layout](https://github.com/angular/flex-layout) to make the app responsive,
[AngularFire](https://github.com/angular/angularfire) and [ngx-auth-firebaseui](https://ngx-auth-firebaseui.firebaseapp.com/home)
for authentication. The required API to run the server can be found [here](https://github.com/danbrato999/bluthbusters-api)

## Running locally

In order to run the project, you need to have the API running locally in your computer or in the cloud(check the API's repository documentation for help).
Once you have the API running, you need to create an environment.ts file under *src/environments/* with your Firebase project's credentials:

```
# Example environment.ts file

export const environment = {
  production: false,
  firebase : {
    apiKey: "somekey",
    authDomain: "something.firebaseapp.com",
    databaseURL: "https://something.firebaseio.com",
    projectId: "projectId",
    storageBucket: "something.appspot.com",
    messagingSenderId: "messagingSenderId",
    appId: "firebaseAppId"
  }
};
```

Make sure your proyect has the following Sign-in providers under "Authentication/Sign-in method"

* Email/Password
* Google

Finally, make sure to proxy the API requests to the right server. If you use the docker-compose method provided in the API's documentation,
you won't have to change anything, but if you want to run your API server in a port different than 10003, you need to modify the file
*src/proxy.conf.json* to point to the right server. Afterwards, simply run

```
ng serve
```

Developed by Daniel Bravo
