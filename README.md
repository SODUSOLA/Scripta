# Scripta

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.17.1-orange.svg)](https://prisma.io/)

A comprehensive social media post generator and immediate publisher API built with Node.js, Express, and Prisma. Scripta allows users to create, manage, and publish content across multiple social media platforms with secure authentication and session management.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Device Verification**: Multi-device login verification via email codes
- **Session Management**: Trusted device tracking and session persistence
- **Password Reset**: Secure password reset via email verification
- **Email Notifications**: Welcome emails, login verification codes, and password reset emails
- **API Documentation**: Interactive Swagger UI documentation

### Social Media Integration (Planned)
- Post creation and scheduling
- Multi-platform publishing (X/Twitter, LinkedIn, Instagram, etc.)
- Content management and version control
- Analytics and engagement tracking

### Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Device fingerprinting and verification
- Rate limiting and input validation
- CORS protection

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Email**: Nodemailer with SMTP
- **Validation**: Custom middleware
- **Documentation**: Swagger/OpenAPI 3.0

### Key Dependencies
- `@prisma/client`: Database ORM and query builder
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token management
- `nodemailer`: Email sending
- `cors`: Cross-origin resource sharing
- `swagger-ui-express`: API documentation UI

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** database
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

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="7d"

   # Email Configuration (SMTP)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   EMAIL_FROM="noreply@scripta.com"

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
   ```

5. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npx nodemon server.js

   # Production mode
   npm start
   ```

The server will start on `http://localhost:4000` and API documentation will be available at `http://localhost:4000/api-docs`.

## Usage

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (requires verification when new IP detected)
- `POST /api/auth/verify-login` - Verify login with code
- `POST /api/auth/request-password-reset` - Request password reset email
- `POST /api/auth/reset-password` - Reset password with code
- `POST /api/auth/change-password` - Change password (requires authentication)
- `GET /api/me` - Get current user info (requires authentication)

#### Sessions
- `GET /api/sessions` - Get all active sessions for the current user (requires authentication)
- `DELETE /api/sessions/:id` - Revoke a specific session (requires authentication)

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

## Database Schema

The application uses Prisma ORM with the following main models:

- **User**: User accounts with authentication data
- **Post**: Social media posts (planned feature)
- **Connection**: Social media platform connections (planned)
- **UserSession**: Trusted device sessions
- **PendingLogin**: Temporary login verification codes
- **PasswordReset**: Password reset tokens and expiration

## Security

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens are used for session management
- Device verification for new login attempts
- Input validation and sanitization
- CORS protection enabled
- Environment variables for sensitive data

## API Documentation

Interactive API documentation is available via Swagger UI at `/api-docs` when the server is running. The documentation includes:

- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests

## Deployment

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment. Consider using services like:

- **Database**: PostgreSQL on AWS RDS, Google Cloud SQL, or similar
- **Email**: SendGrid, Mailgun, or AWS SES
- **Hosting**: Heroku, Vercel, AWS EC2, or Docker containers

### Docker Deployment (Optional)
```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
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

---

**Note**: This is an ongoing project. Features like post creation, social media publishing, and analytics are planned for future releases.
