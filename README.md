# Dev Hunter Frontend

This repository contains the frontend for the **Dev Hunter** project—an application that allows users to:

- Generate batches of random software engineers (“candidates”)
- Create and manage “subscriptions” (filters) based on skills, experience, salary, and position
- View matching engineers in real time as new candidates arrive

Under the hood, this client is built with Vite, React, and TypeScript, using Redux Toolkit + RTK Query for data fetching and state management, Socket.IO client for real-time updates, Styled Components for styling, React Hook Form for form handling, and a complete linting/Prettier/Husky setup.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Design Decisions](#design-decisions)
7. [Form Handling](#form-handling)
8. [Real-Time Updates](#real-time-updates)
9. [Linting & Formatting](#linting--formatting)

---

## Features

- **Generate Candidates**  
  A button triggers a POST to the backend endpoint, which creates a batch of random engineers.

- **Subscription System**  
  Users can define conditions (tech languages, experience, salary range, position) and subscribe.

- **Live Matching**  
  Clicking on a subscription card displays all engineers that match its criteria.

- **Real-Time Notifications**  
  When a new engineer is generated that matches an existing subscription, the UI updates without a page reload.

---

## Tech Stack

- **Vite** — Blazing-fast build tool with HMR out of the box
- **React 19** & **TypeScript** — Type-safe components and hooks
- **Redux Toolkit** & **RTK Query** — Global state and data fetching in a standardized, opinionated way
- **Socket.IO Client** — WebSocket layer for real-time subscription notifications
- **Styled Components** — CSS-in-JS for scoped, dynamic styles
- **React Hook Form** — Simple, performant form state and validation
- **ESLint** & **Prettier** — Linting and code formatting
- **Husky** & **Lint-Staged** — Pre-commit hooks to enforce lint/format on changed files

---
## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-org>/dev-hunter-frontend.git
   cd dev-hunter-frontend

2. **Install dependencies**
   ```bash
    yarn install

3. **Start the development server**
   ```bash
    yarn dev
   
4. **Build for production**
   ```bash
    yarn build

5. **Preview the production build**
   ```bash
    yarn preview

## Configure environment variables

Create a `.env` file in the project root (if you need to override defaults):

```env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4001
```

## Linting & Formatting

- **ESLint** configuration is located in `.eslintrc.js`, extending recommended TypeScript and React rules.
- **Prettier** is used for consistent formatting.
- **Husky** & **Lint-Staged** run `eslint --fix` and `prettier --write` on staged `.ts/.tsx` files before every commit.
- Run `yarn lint` manually to check for errors; `yarn format` to reformat.

