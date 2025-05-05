# Technical Design Document (TDD)

## 1. Introduction
PhqBookmarks is a web application built using Angular 19.2.9. It allows users to manage bookmarks, including adding, editing, deleting, and viewing them. The application is hosted on Firebase Hosting, ensuring scalability and ease of deployment.

## 2. Architecture
The application follows a component-based architecture provided by Angular. Key architectural elements include:

- **Frontend Framework**: Angular is used for building the user interface and managing application state.
- **Routing**: Angular Router is used for navigation between pages.
- **Hosting**: Firebase Hosting serves the compiled Angular application.
- **Storage**: LocalStorage is used for storing bookmarks in the browser.

## 3. Components
The application is divided into several components, each responsible for a specific feature:

- **AppComponent**: The root component that initializes the application.
- **BookmarkComponent**: Manages the overall bookmark feature.
- **BookmarkFormComponent**: Handles the creation of bookmarks.
- **BookmarkListComponent**: Displays a list of bookmarks and provides options to delete or edit them.
- **BookmarkPaginationComponent**: Manages pagination for the bookmark list.
- **BookmarkResultComponent**: Displays the result of bookmark operations.

## 4. Data Flow
The application uses a unidirectional data flow:

1. **Input**: Users interact with the UI components (e.g., forms, buttons).
2. **Processing**: Components handle user input and update the application state.
3. **Output**: Updated state is reflected in the UI.

### Example:
- A user adds a bookmark using the `BookmarkFormComponent`.
- The new bookmark is saved in LocalStorage via the `BookmarkStorageService`.
- The `BookmarkListComponent` retrieves and displays the updated list of bookmarks.

## 5. Limitations
- **LocalStorage Dependency**: The application relies on LocalStorage for data persistence, which limits its use to the browser and may not scale for larger datasets.
- **No Backend Integration**: There is no backend server for advanced features like user authentication or cloud storage.
- **Limited Testing**: Unit tests are provided, but end-to-end testing is not included by default.
