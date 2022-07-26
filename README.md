# Achievement 6 Project: Angular App (myFlix) - MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6. The objective of this project was as follows: Using Angular, build the client-side for an application called myFlix based on its existing server-side code (REST API and database), with supporting documentation.

## Design Criteria

### User Stories

-   As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
-   As a user, I want to be able to create a profile so I can save data about my favorite movies.

### Key Features

-   Your app should display a welcome view where users will be able to either log in or register an account.
-   Once authenticated, the user should now view all movies.
-   Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed. The single movie view will contain the following additional features:
    -   A button that when clicked takes a user to the director view, where details about the director of that particular movie will be displayed.
    -   A button that when clicked takes a user to the genre view, where details about that particular genre of the movie will be displayed.

### Screenshot of app

![Screenshot of Login View](./assets/Screenshot_LoginView.png?raw=true "Login")
![Screenshot of Movie View](./assets/Screenshot_Movie%20View.png?raw=true "Moview View")
![Screenshot of Profile View](./assets/Screenshot_ProfileView.png.png?raw=true "Profile View")

## Technical Requirements

-   The application must be written in Angular (version 9 or later)
-   The application requires the latest version of Node.js and npm package
-   The application must contain user registration and login forms
-   The application must be designed using Angular Material
-   The application's codebase must contain comments using Typedoc
-   The project must contain technical documentation using JSDoc
-   The project must be hosted on GitHub Pages

## Steps taken to set up app

### Install Angular

1. Check if Angular is already installed on device

```bash
ng --version
```

2. If not, install Angular

```bash
npm install -g @angular/cli
```

### Create a new Angular project

1. Navigate to folder and create project

```bash
ng new my-project-name
```

2. Navigate to project folder to run project

```bash
ng serve --open
```

### Set up app to load data from movie API

1. Set up Angular HttpClient
   1.1. Go to app.module.ts and add

```bash
import { HttpClientModule } from '@angular/common/http';
```

1.2. Add HttpClientModule to the imports of @NgModule

2. Create Angular Service for Consuming REST API
   2.1 Create a new Service inside app folder

```bash
ng generate service fetch-api-data
```

2.2. Add import statements to fetch-api-data.service.ts file

```bash
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
```

3. Implement services logic to make API calls

-   User registration
-   User login
-   Get all movies
-   Get one movie
-   Get director
-   Get genre
-   Get user
-   Get favourite movies for a user
-   Add a movie to favourite Movies
-   Edit user
-   Delete user and
-   Delete a movie from the favorite movies

### Add Angular Material to application

1. Install project dependency

```bash
$ ng add @angular/material
```

2. Import models from Angular Material to app.module.ts

3. Add modules to imports array to serve to other components

### Create components for user to use application

Using the command:

```bash
$ ng generate component my-component-name
```

Structure of components:

-   Welcome screen
    -   User registration form (sign-up)
    -   User login form
-   Navbar
-   Movie View
-   Dialogs for Movie View:
    -   Director
    -   Genre
    -   Synopsis
-   Profile View
    -   Edit profile dialog
    -   List of favorite movies (delete option available)

### Add routing to application

1. Import Angular's built-in router:

```bash
import { RouterModule, Routes } from '@angular/router';
```

2. Add to app.component.html

```bash
<router-outlet></router-outlet>
```

3. Create routes in app.module.ts

### Deploy application on github-pages

1. If not done yet: Create github repository for application

2. If also not done yet: Link the new remote repository to the local project folder. To do so, simply run this command from inside your project folder (replace <GitHub-username> and <repository-name> with your own GitHub username and repository name): git remote add origin https://github.com/<GitHub-username>/<repository-name>.git

3. Add angular-cli-ghpages by running

```bash
ng add angular-cli-ghpages.
```

4. Build your application (i.e., generate static HTML, CSS, and JavaScript files out of your application so that browsers can interpret them without the need to use any extra tools/plugins). To do so, run the following command, replacing <repository-name> with your own repository name:

```bash
 ng deploy --base-href=/<repository-name>/.
```

### Add TypeDoc Documentation

1. Install typedoc (if not yet installed):

```bash
npm install typedoc
```

2. Check that code is commented adhering to best practices

3. Run typedoc to create documentation:

```bash
npx typedoc --entryPointStrategy expand ./src
```

## Once project is developed, adhere to the following steps to get it running

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deploy to gh-pages

Run `ng deploy --base-href=/myFlix-Angular-client/`
