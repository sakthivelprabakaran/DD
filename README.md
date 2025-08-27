# Device Discuss - Application Design & Architecture

This document outlines the architectural design and file structure for the **Device Discuss** mobile application. The project is organized into a modular structure to separate concerns and facilitate scalability.

## Project Structure

The core application code resides in the `src/` directory, which is organized as follows:

-   **/src/auth**: Contains authentication-related services.
    -   `AuthService.js`: Handles user registration, login (email/password), and social logins (Google/Apple).

-   **/src/features**: Contains self-contained feature modules, with a focus on the complex "Discuss+" feature.
    -   **/discussPlus**:
        -   `CreatorDashboardScreen.js`: UI definition for the creator's management dashboard.
        -   `BookingScreen.js`: UI definition for the user-facing booking flow.
        -   `SessionScreen.js`: UI definition for the live 1:1 chat/voice session.
        -   `RatingScreen.js`: UI definition for the post-session rating screen.
        -   `DiscussPlusService.js`: Contains all business logic for the Discuss+ feature, including eligibility checks, availability management, pricing, booking, and ratings.

-   **/src/navigation**: Defines the main navigation structure of the app.
    -   `AppNavigator.js`: Configures the main bottom tab navigator (Home, Create Post, Profile).

-   **/src/screens**: Contains the primary screen components of the application.
    -   `HomeScreen.js`: The main feed with a search bar and post cards.
    -   `ProfileScreen.js`: The user profile view.
    -   `FullPostDetailScreen.js`: The detailed view of a post with comments.
    -   `CreatePostScreen.js`: The screen for creating new posts.
    -   `DeviceManagementScreen.js`: Screen for users to manage their list of devices.
    -   `SearchResultScreen.js`: The screen to display search results with tabs for "Posts" and "Users".
    -   `NotificationScreen.js`: The screen to display a history of notifications.
    -   `LoginScreen.js` & `SignUpScreen.js`: User authentication screens.

-   **/src/services**: Contains core services that provide logic for various app features.
    -   `SocialService.js`: Handles social interactions like likes, follows, and comments.
    -   `SearchService.js`: Handles the application-wide search logic.
    -   `NotificationService.js`: Manages the creation and retrieval of notifications.

-   **/src/theme**: Contains the global design system for the application.
    -   `colors.js`: Defines the application's color palette.
    -   `typography.js`: Defines font styles and sizes.
    -   `components.js`: Defines styles for common components like buttons and cards.
    -   `theme.js`: Consolidates all design tokens into a single theme object.

## Design Philosophy

-   **Modular Architecture**: Features, services, and UI components are separated to ensure maintainability.
-   **Service-Oriented**: Business logic is abstracted into services (`AuthService`, `SocialService`, etc.), keeping screen components lean and focused on the UI.
-   **Centralized Theming**: All styling and design tokens are managed in the `/src/theme` directory, allowing for easy updates and ensuring a consistent look and feel across the app.
