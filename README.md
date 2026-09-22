# MealCue

MealCue is a household meal-planning application for recording meals, planning the week, and remembering household preferences and feedback.

## Project status

Initial application scaffold. Core meal-planning features have not been implemented yet.

## Tech stack

- MongoDB
- Express
- React
- Node.js
- TypeScript
- Vite
- npm workspaces

## Repository structure

```text
mealcue/
├── client/    # React and Vite frontend
├── server/    # Express API
└── package.json
```

## Prerequisites

- Node.js 24
- npm 11

## Getting started

Install dependencies from the repository root:

```bash
npm install
```

Start the client and server together:

```bash
npm run dev
```

The applications run at:

- Client: http://localhost:5173
- API: http://localhost:3000
- Health check: http://localhost:3000/api/health

## Available commands

Run these commands from the repository root:

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

Individual development servers can also be started with:

```bash
npm run dev:client
npm run dev:server
```