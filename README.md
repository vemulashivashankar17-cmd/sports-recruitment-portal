# Sports Recruitment Portal

A comprehensive web platform connecting athletes with coaching opportunities and teams. Built with React, Node.js, Express, and PostgreSQL.

## 🎯 Features

- **Athlete Profiles**: Showcase skills, stats, videos, and achievements
- **Team/Coach Profiles**: Manage recruitment needs and team information
- **Job Postings**: Post and browse recruitment opportunities
- **Smart Search**: Find athletes or opportunities with advanced filtering
- **Messaging System**: Direct communication between athletes and recruiters
- **Application Management**: Track applications and recruitment status
- **Admin Dashboard**: Monitor platform activity and user management
- **Secure Authentication**: JWT-based user authentication

## 🏗️ Project Structure

```
sports-recruitment-portal/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database, environment configs
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation middleware
│   │   ├── services/       # Business logic
│   │   └── app.ts          # Express app setup
│   ├── migrations/         # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/                # React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   ├── styles/         # CSS modules
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml      # PostgreSQL & services
├── .gitignore
└── SETUP.md               # Setup instructions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Docker (optional)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### With Docker

```bash
docker-compose up
```

## 📚 Documentation

See [SETUP.md](./SETUP.md) for:
- Detailed setup instructions
- Database schema
- API endpoints documentation
- Environment variables
- Troubleshooting guide

## 🔐 Authentication

JWT-based authentication. Users can register as:
- **Athletes**: Create profiles and apply for opportunities
- **Recruiters/Coaches**: Post opportunities and manage applications
- **Admins**: Manage platform content

## 📦 Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 18
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Context API

## 📝 License

MIT

## 👥 Contributing

Contributions welcome! Please read our contribution guidelines.
