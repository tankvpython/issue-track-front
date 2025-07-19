# Mini Issue Tracker Frontend

This project is a frontend application for a mini issue tracker built with React. It integrates with a Django + Django REST Framework backend to provide a seamless user experience for managing issues, tags, priorities, and invitations.

## Features

- **Authentication**: Users can register, log in, and manage their sessions using JWT-based authentication.
- **Routing**: The application uses React Router for navigation between different pages and components.
- **Global State Management**: Context API (or Redux, if implemented) is used for managing authentication state and user data.
- **UI Components**: Reusable components for forms, lists, and navigation are created to enhance the user interface.
- **Data Fetching**: Axios is used for making API requests to the backend, handling token management and error responses.
- **Invitation Flow**: Users can send and accept invitations to collaborate on issues.

## Project Structure

```
mini-issue-tracker-frontend
├── public
│   └── index.html
├── src
│   ├── api
│   │   └── client.ts
│   ├── app
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── components
│   │   ├── Auth
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── InviteAccept.tsx
│   │   ├── Issues
│   │   │   ├── IssueList.tsx
│   │   │   ├── IssueDetail.tsx
│   │   │   └── IssueForm.tsx
│   │   ├── Tags
│   │   │   └── TagList.tsx
│   │   ├── Priorities
│   │   │   └── PriorityList.tsx
│   │   ├── Invitations
│   │   │   └── InvitationForm.tsx
│   │   └── Layout
│   │       ├── Navbar.tsx
│   │       └── ProtectedRoute.tsx
│   ├── context
│   │   └── AuthContext.tsx
│   ├── hooks
│   │   └── useAuth.ts
│   ├── pages
│   │   ├── Dashboard.tsx
│   │   ├── IssueBoard.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── InvitationAccept.tsx
│   ├── store
│   │   └── index.ts
│   ├── utils
│   │   └── helpers.ts
│   ├── index.tsx
│   └── react-app-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd mini-issue-tracker-frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```
   $env:NODE_OPTIONS="--openssl-legacy-provider"; npm start
   npm install react-router-dom@^6


4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.