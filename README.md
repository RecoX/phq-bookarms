# PhqBookmarks

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

---

## 🚀 Deployment Instructions (Firebase Hosting – Google Cloud)

This project uses [Firebase Hosting](https://firebase.google.com/products/hosting) to deploy the compiled Angular 19 app.

### 🌍 Access the Live App

Firebase public URL:

[https://bookmarks-phq-42b18.web.app](https://bookmarks-phq-42b18.web.app)

---

### 🔧 Prerequisites

* Node.js and npm installed
* Firebase CLI installed globally

  ```
  npm install -g firebase-tools
  ```
* Logged in to Firebase

  ```
  firebase login
  ```

---

### 📦 Build the Angular App

From the root of your Angular project:

```bash
ng build --configuration production
```

The output will be in `dist/phq-bookmarks/browser/`.

---

### ⚙️ Firebase Configuration

Update `firebase.json` with the correct hosting path:

```json
{
  "hosting": {
    "public": "dist/phq-bookmarks/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

This ensures the SPA routing works and Firebase serves the compiled app correctly.

---

### ☁️ Deploy to Firebase Hosting

```bash
firebase deploy
```

---


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## PHQ DEV UTILITES

### Add 50 test bookmarks
To quickly test pagination and UI behaviour, run this in DevTools 
```
const bookmarks = [];

for (let i = 1; i <= 50; i++) {
  bookmarks.push({
    id: crypto.randomUUID(),
    title: `Test Bookmark ${i}`,
    url: `https://www.google.com/search?q=example${i}`,
    createdAt: new Date().toISOString(),
  });
}

localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
console.log('✅ 50 valid bookmarks added to localStorage.');
```

Clear all bookmarks (DevTools)
```
localStorage.removeItem('bookmarks');
console.log('🧹 Bookmarks cleared from localStorage.');
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
