# Device Discuss - Application Design & Architecture

This document outlines the architectural design and file structure for the **Device Discuss** mobile application. The project is organized into a modular structure to separate concerns and facilitate scalability.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   A React Native development environment (see [React Native docs](https://reactnative.dev/docs/environment-setup) for setup instructions).

### Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

-   To run on iOS:
    ```bash
    npm run ios
    ```
-   To run on Android:
    ```bash
    npm run android
    ```

### Running Tests

-   To run the test suite:
    ```bash
    npm test
    ```

## Project Structure

The core application code resides in the `src/` directory, which is organized as follows:

-   **/src/auth**: Contains authentication-related services.
-   **/src/components**: Contains reusable, stateless UI components (`Card`, `StyledButton`, etc.).
-   **/src/features**: Contains self-contained feature modules, with a focus on the complex "Discuss+" feature.
-   **/src/navigation**: Defines the main navigation structure of the app.
-   **/src/screens**: Contains the primary screen components of the application.
-   **/src/services**: Contains services that provide mock data and business logic.
-   **/src/theme**: Contains the global design system for the application.
