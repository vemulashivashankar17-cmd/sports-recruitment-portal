# Setup Guide - Sports Recruitment Portal

## 📋 Prerequisites

- Node.js 16 or higher
- PostgreSQL 12 or higher
- npm or yarn
- Git

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sports_recruitment
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d

# API
API_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### 4. Set Up Database
```bash
# Create database
creatdb sports_recruitment

# Run migrations
npm run migrate
```

### 5. Start Backend Server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start Frontend Development Server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🐳 Docker Setup (Alternative)

### Run All Services with Docker Compose
```bash
docker-compose up
```

This will start:
- PostgreSQL on port 5432
- Backend API on port 5000
- Frontend on port 3000

## 📊 Database Setup

### Create PostgreSQL Database Manually
```bash
psql -U postgres
```

```sql
CREATE DATABASE sports_recruitment;
\c sports_recruitment

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL, -- 'athlete', 'recruiter', 'admin'
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Athletes table
CREATE TABLE athletes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  sports VARCHAR(255)[] DEFAULT '{}',
  height VARCHAR(50),
  weight VARCHAR(50),
  birth_date DATE,
  location VARCHAR(255),
  video_url VARCHAR(255),
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams/Recruiters table
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  team_name VARCHAR(255) NOT NULL,
  sport VARCHAR(100),
  location VARCHAR(255),
  description TEXT,
  website VARCHAR(255),
  logo_url VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Postings table
CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sport VARCHAR(100),
  position VARCHAR(100),
  requirements TEXT,
  salary_range VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'closed', 'filled'
  deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  athlete_id INTEGER REFERENCES athletes(id) ON DELETE CASCADE,
  job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'reviewed', 'accepted', 'rejected'
  cover_letter TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  athlete_id INTEGER REFERENCES athletes(id) ON DELETE CASCADE,
  skill_name VARCHAR(255),
  proficiency_level VARCHAR(50), -- 'beginner', 'intermediate', 'advanced', 'expert'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_athletes_user_id ON athletes(user_id);
CREATE INDEX idx_teams_user_id ON teams(user_id);
CREATE INDEX idx_job_postings_team_id ON job_postings(team_id);
CREATE INDEX idx_applications_athlete_id ON applications(athlete_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Athletes
- `GET /api/athletes` - List all athletes
- `GET /api/athletes/:id` - Get athlete details
- `POST /api/athletes` - Create athlete profile
- `PUT /api/athletes/:id` - Update athlete profile
- `GET /api/athletes/:id/applications` - Get athlete's applications

### Teams
- `GET /api/teams` - List all teams
- `GET /api/teams/:id` - Get team details
- `POST /api/teams` - Create team profile
- `PUT /api/teams/:id` - Update team profile

### Job Postings
- `GET /api/jobs` - List all job postings
- `GET /api/jobs/:id` - Get job posting details
- `POST /api/jobs` - Create job posting
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Withdraw application

### Messages
- `GET /api/messages` - Get user's messages
- `POST /api/messages` - Send message
- `GET /api/messages/:id` - Get message details
- `PUT /api/messages/:id/read` - Mark message as read

## 📦 Technologies Used

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Language
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **TypeScript** - Language
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management
- **React Query** - Data fetching

## 🔒 Security Best Practices

1. **Environment Variables** - Never commit `.env` files
2. **JWT Tokens** - Store securely in httpOnly cookies
3. **Password Hashing** - Uses bcrypt with salt rounds
4. **CORS** - Configured for frontend domain
5. **Input Validation** - Server-side validation on all endpoints
6. **SQL Injection Prevention** - Using parameterized queries
7. **Rate Limiting** - Implement on authentication endpoints

## 📱 Development Workflow

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push to GitHub: `git push origin feature/feature-name`
4. Create Pull Request on GitHub
5. Code review and merge

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📈 Performance Tips

- Use database indexes on frequently queried columns
- Implement pagination for list endpoints
- Cache static assets
- Use CDN for media files
- Implement lazy loading in frontend
- Monitor API response times

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error
- Check PostgreSQL is running
- Verify credentials in `.env`
- Ensure database exists

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📞 Support

For issues and questions, please create an issue on GitHub.

---

**Happy coding! 🚀**
