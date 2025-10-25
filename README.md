# Scripta

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-orange.svg)](https://prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-7+-red.svg)](https://redis.io/)
[![BullMQ](https://img.shields.io/badge/BullMQ-5.61.2-blue.svg)](https://docs.bullmq.io/)

A comprehensive social media post generator and management API built with Node.js, Express, Prisma, and Redis. Scripta enables users to create, manage, and publish content across multiple social media platforms with secure authentication, session management, AI-powered post generation, and asynchronous job processing.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Device Verification**: Multi-device login verification via email codes
- **Session Management**: Trusted device tracking and session persistence
- **Password Reset**: Secure password reset via email verification
- **Email Notifications**: Welcome emails, login verification codes, and password reset emails
- **API Documentation**: Interactive Swagger UI documentation

### AI-Powered Content Generation
- **Post Generation**: AI-generated social media posts using Google Gemini AI
- **Asynchronous Processing**: Queue-based AI generation with BullMQ and Redis for scalability
- **Job Status Monitoring**: Real-time tracking of AI generation jobs
- **Draft Management**: Create, edit, and manage post drafts
- **Content Regeneration**: Regenerate posts with different tones or for different platforms
- **AI Caching**: Intelligent caching to reduce API costs and improve performance
- **Usage Tracking**: Monitor AI token usage, costs, and subscription limits
- **Subscription Plans**: Freemium (10/day) and Pro (100/day) plans with dynamic limits

### Social Media Integration (Planned)
- Post creation and scheduling
- Multi-platform publishing (X/Twitter, LinkedIn, Instagram, etc.)
- Content management and version control
- Analytics and engagement tracking

### Security Features
- Password hashing with bcrypt
- JWT-based authentication with role-based access control
- Device fingerprinting and verification
- Admin role for system management
- Rate limiting and input validation
- CORS protection

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL with Prisma ORM
- **Cache/Queue**: Redis with BullMQ for job processing
- **Authentication**: JSON Web Tokens (JWT) with role-based access
- **Email**: Nodemailer with SMTP
- **AI**: Google Generative AI (Gemini 2.5 Flash)
- **Validation**: Custom middleware
- **Documentation**: Swagger/OpenAPI 3.0

### Key Dependencies
- `@prisma/client`: Database ORM and query builder
- `@google/generative-ai`: Google Gemini AI integration
- `bullmq`: Redis-based job queue for async processing
- `ioredis`: Redis client for caching and queuing
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token management
- `nodemailer`: Email sending
- `cors`: Cross-origin resource sharing
- `swagger-ui-express`: API documentation UI

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** database
- **Redis** server (version 7 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scripta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/scripta_db"

   # Redis Configuration
   REDIS_URL="redis://localhost:6379"

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="7d"

   # Email Configuration (SMTP)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   EMAIL_FROM="noreply@scripta.com"

   # AI Configuration
   GEMINI_API_KEY="your-gemini-api-key-here"

   # Server Configuration
   PORT=4000
   NODE_ENV="development"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed subscription plans
   npx prisma db seed
   ```

5. **Redis Setup**
   Ensure Redis server is running:
   ```bash
   # Start Redis (if using local installation)
   redis-server

   # Or using Docker
   docker run -d -p 6379:6379 redis:7-alpine
   ```

6. **Start the Application**
   ```bash
   # Development mode (with auto-reload)
   npx nodemon server.js

   # Production mode
   npm start
   ```

7. **Start Worker Process** (in a separate terminal for AI job processing)
   ```bash
   # Run the AI worker
   node workers/aiWorker.js
   ```

The server will start on `http://localhost:4000` and API documentation will be available at `http://localhost:4000/api-docs`.

## Usage

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (requires verification when new IP detected)
- `POST /api/auth/verify-login` - Verify login with code
- `POST /api/auth/request-reset` - Request password reset email
- `POST /api/auth/reset-password` - Reset password with code
- `POST /api/auth/change-password` - Change password (requires authentication)
- `GET /api/me` - Get current user info (requires authentication)

#### Sessions
- `GET /api/sessions` - Get all active sessions for the current user (requires authentication)
- `DELETE /api/sessions/:id` - Revoke a specific session (requires authentication)

#### Drafts
- `POST /api/drafts` - Create a new draft (requires authentication)
- `GET /api/drafts` - Get all drafts for the current user (requires authentication)
- `GET /api/drafts/:id` - Get a specific draft by ID (requires authentication)
- `PATCH /api/drafts/:id` - Update a draft (requires authentication)
- `DELETE /api/drafts/:id` - Delete a draft (requires authentication)

#### AI Generation
- `POST /api/ai/generate` - Generate a new AI post draft (requires authentication)
- `POST /api/ai/regenerate` - Regenerate an existing post draft (requires authentication)
- `GET /api/ai/status/:jobId` - Check status of an AI generation job (requires authentication)

#### AI Usage & Analytics
- `GET /api/ai/usage/me` - Get current user's AI usage statistics (requires authentication)
- `GET /api/ai/usage/all` - Get all users' AI usage statistics (admin only)

#### System
- `GET /health` - Health check endpoint

### Example API Usage

#### Register a new user
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123",
    "confirmPassword": "securepassword123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "johndoe",
    "password": "securepassword123"
  }'
```

#### Access protected route
```bash
curl -X GET http://localhost:4000/api/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Get active sessions
```bash
curl -X GET http://localhost:4000/api/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Revoke a session
```bash
curl -X DELETE http://localhost:4000/api/sessions/SESSION_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Change password
```bash
curl -X POST http://localhost:4000/api/auth/change-password \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "oldpassword123",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }'
```

#### Request password reset
```bash
curl -X POST http://localhost:4000/api/auth/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

#### Reset password
```bash
curl -X POST http://localhost:4000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "code": "123456",
    "newPassword": "newsecurepassword123",
    "confirmPassword": "newsecurepassword123"
  }'
```

#### Create a draft
```bash
curl -X POST http://localhost:4000/api/drafts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is a draft post content",
    "platform": "X"
  }'
```

#### Get all drafts
```bash
curl -X GET http://localhost:4000/api/drafts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Generate AI post (Synchronous)
```bash
curl -X POST http://localhost:4000/api/ai/generate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Benefits of remote work",
    "tone": "Professional",
    "platform": "LinkedIn"
  }'
```

#### Generate AI post (Asynchronous with Job Queue)
```bash
curl -X POST http://localhost:4000/api/ai/generate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Benefits of remote work",
    "tone": "Professional",
    "platform": "LinkedIn",
    "forceQueue": true
  }'
```

#### Check AI Job Status
```bash
curl -X GET http://localhost:4000/api/ai/status/JOB_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Regenerate AI post
```bash
curl -X POST http://localhost:4000/api/ai/regenerate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Benefits of remote work",
    "tone": "Casual",
    "platform": "X"
  }'
```

#### Get AI Usage Statistics
```bash
curl -X GET http://localhost:4000/api/ai/usage/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Admin: Get All Users' Usage (Admin Only)
```bash
curl -X GET http://localhost:4000/api/ai/usage/all \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## Database Schema

The application uses Prisma ORM with the following main models:

- **User**: User accounts with authentication data and role-based access
- **Post**: Social media posts (planned feature)
- **Connection**: Social media platform connections (planned)
- **UserSession**: Trusted device sessions
- **PendingLogin**: Temporary login verification codes
- **PasswordReset**: Password reset tokens and expiration
- **Draft**: Post drafts with AI generation support
- **AIUsage**: AI token usage tracking and cost monitoring
- **AICache**: Cached AI-generated content for performance optimization
- **SubscriptionPlan**: User subscription tiers with daily limits

## Security

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens are used for session management with role-based access control
- Device verification for new login attempts
- Admin role for system management and analytics access
- Input validation and sanitization
- CORS protection enabled
- Environment variables for sensitive data

## API Documentation

Interactive API documentation is available via Swagger UI at `/api-docs` when the server is running. The documentation includes:

- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests
- Role-based access information

## Asynchronous Processing

Scripta uses BullMQ with Redis for handling AI generation jobs asynchronously:

- **Job Queue**: AI generation requests are queued when the system is busy
- **Worker Process**: Background workers process queued jobs
- **Status Monitoring**: Real-time job status tracking
- **Scalability**: Multiple worker instances can be run for high load

### Running Workers

For production deployments, run worker processes separately:

```bash
# Terminal 1: Main application
npm start

# Terminal 2: AI worker
node workers/aiWorker.js

# Terminal 3: Additional worker (optional)
node workers/aiWorker.js
```

## Subscription Management

The system includes built-in subscription plans:

- **Freemium**: 10 AI generations per day (free)
- **Pro**: 100 AI generations per day ($19.99/month)

Users are automatically assigned to Freemium upon registration. Upgrade logic can be implemented via external payment processing.

## Deployment

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment. Consider using services like:

- **Database**: PostgreSQL on AWS RDS, Google Cloud SQL, or similar
- **Cache/Queue**: Redis on AWS ElastiCache, Google Cloud Memorystore, or similar
- **Email**: SendGrid, Mailgun, or AWS SES
- **Hosting**: Heroku, Vercel, AWS EC2, or Docker containers

### Docker Deployment (Optional)
```dockerfile
# Example Dockerfile for main application
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

### Docker Compose Setup
```yaml
version: '3.8'
services:
  scripta:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/scripta
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret
      - GEMINI_API_KEY=your-key
    depends_on:
      - db
      - redis

  worker:
    build: .
    command: node workers/aiWorker.js
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/scripta
      - REDIS_URL=redis://redis:6379
      - GEMINI_API_KEY=your-key
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=scripta
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Oluwasemilore Odusola**
- GitHub: [@SODUSOLA]
- Email: [odusolasemilore@gmail.com]

## Acknowledgments

- Express.js for the web framework
- Prisma for database ORM
- Swagger for API documentation
- All contributors and open-source maintainers

## Features Documentation

For detailed information about Scripta's features and usage guides, see [FEATURES.md](FEATURES.md).

---

**Note**: This is an ongoing project. Features like post creation is in place, social media publishing, and analytics are planned for future releases.
