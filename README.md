# Jagoron | Social Development Events Platform

A community-driven platform that connects people through social development initiatives. Jagoron enables users to discover upcoming events, organize community activities, and participate in meaningful initiatives that create positive social impact.

**Together, we can make a difference.**

<p align="center">
  <a href="https://jagoron-social-impact-platform.vercel.app/">Live Demo</a> ·
  <a href="https://github.com/rijon-swarnaker/jagoron-social-impact-platform">Client Repository</a> ·
  <a href="https://github.com/rijon-swarnaker/jagoron-server">Server Repository</a>
</p>

---

## Overview

Jagoron is a full-stack social development events platform designed to encourage community participation and make social initiatives more accessible.

Users can explore community events, create their own initiatives, join events organized by others, and manage their activities through a centralized platform.

The platform focuses on simplifying event management while encouraging people to contribute to meaningful social causes.

## Key Features

- **Authentication & Authorization:** Secure user authentication with Better Auth and protected resources.
- **Event Creation:** Authenticated users can create social development events with relevant information.
- **Event Management:** Organizers can update and delete their own events.
- **Event Discovery:** Browse and explore upcoming community events.
- **Join Events:** Users can participate in events organized by the community.
- **Joined Events:** View and manage previously joined events.
- **Event Details:** Access comprehensive information about individual events.
- **JWT-Based API Security:** Secure communication between frontend and backend using JSON Web Tokens.
- **Responsive Interface:** Consistent user experience across desktop, tablet, and mobile devices.
- **Interactive Feedback:** User-friendly notifications for important actions and errors.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| Notifications | Sonner |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | Better Auth |
| API Security | JSON Web Token (JWT) |
| Deployment | Vercel|

## Project Architecture

Jagoron follows a client-server architecture.

```text
                 JAGORON
                    |
          +---------+---------+
          |                   |
       Frontend             Backend
          |                   |
       Next.js             Express.js
          |                   |
       React UI            REST API
          |                   |
          +------ HTTP -------+
                              |
                           MongoDB
                              |
                      Data Persistence
```


## Getting Started

Follow the instructions below to run Jagoron locally.

### Prerequisites

- Node.js 20+
- npm
- MongoDB database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rijon-swarnaker/jagoron-social-impact-platform
cd jagoron
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend development server:

```bash
npm run dev
```

### 3. Configure the Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env.local` file in the client directory:

```env
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Add any additional environment variables required by your authentication provider configuration.

Start the frontend development server:

```bash
npm run dev
```

Open your browser and visit:

`http://localhost:3000`

## Environment Variables

### Client

| Variable | Description |
|---|---|
| `BETTER_AUTH_URL` | Better Auth application base URL |
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

### Server

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT signing and verification |

**Security:** Never expose secret credentials or commit environment files to version control.

## Authentication & Security

- Better Auth handles user authentication.
- Protected routes restrict access to authenticated users.
- JWT tokens are used to authorize protected backend API requests.
- Backend endpoints validate incoming requests.
- Environment variables keep sensitive configuration separate from source code.

## Future Enhancements

- Event capacity and registration limits.
- Volunteer activity tracking.
- Event reminders and notifications.
- Community feedback and ratings.
- Administrative dashboard and analytics.

## Author

**Rijon Chandra Swarnaker**

Computer Science & Technology Student | Aspiring Full-Stack Developer

- Portfolio: https://rijon-swarnaker.vercel.app/
- GitHub: [YOUR_GITHUB_PROFILE](https://github.com/rijon-swarnaker)
- LinkedIn: [YOUR_LINKEDIN_PROFILE](https://www.linkedin.com/in/rijon-swarnaker/)

---

<p align="center">
  Developed with dedication to inspire positive social change.
  <br />
  <strong>Jagoron — Together, We Can Make a Difference.</strong>
</p>
