# Scripta Features and Usage Guide

## Overview

Scripta is a comprehensive API for social media post generation and management, featuring AI-powered content creation, secure authentication, and asynchronous job processing. This guide covers the key features and how to use them effectively.

## Key Features

### 1. User Authentication & Security

**Features:**
- Secure user registration and login with JWT tokens
- Multi-device session management with trusted device verification
- Email-based verification for new login attempts
- Password reset functionality via email
- Device fingerprinting and session tracking
- User roles (user/admin) for access control

**Usage:**

#### Register a New User
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

#### Verify Login (when prompted for new device)
```bash
curl -X POST http://localhost:4000/api/auth/verify-login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "johndoe",
    "code": "123456"
  }'
```

#### Change Password
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

#### Forgot Password
```bash
curl -X POST http://localhost:4000/api/auth/request-reset \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```
##### Change Password
```bash
curl -X POST http://localhost:4000/api/auth/reset-password \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "324567",
    "email": "odusolasemilore@gmail.com",
    "newPassword": "secure123",
    "confirmPassword": "secure123"
  }'
```

### 2. Session Management

**Features:**
- Track and manage active user sessions
- Revoke specific sessions for security
- View session details (IP, user agent, creation time)

**Usage:**

#### Get Active Sessions
```bash
curl -X GET http://localhost:4000/api/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Revoke a Session
```bash
curl -X DELETE http://localhost:4000/api/sessions/SESSION_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Draft Management

**Features:**
- Create, read, update, and delete post drafts
- Support for different platforms and tones
- Local and server-side timestamp tracking
- AI-generated content marking

**Usage:**

#### Create a Draft
```bash
curl -X POST http://localhost:4000/api/drafts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is a draft post content",
    "platform": "X",
    "tone": "Professional"
  }'
```

#### Get All Drafts
```bash
curl -X GET http://localhost:4000/api/drafts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Update a Draft
```bash
curl -X PATCH http://localhost:4000/api/drafts/DRAFT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated draft content"
  }'
```

#### Delete a Draft
```bash
curl -X DELETE http://localhost:4000/api/drafts/DRAFT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. AI-Powered Content Generation

**Features:**
- Generate social media posts using Google Gemini AI
- Support for different tones and platforms
- Intelligent caching to reduce costs and improve performance
- Asynchronous job processing for scalability
- Daily usage limits based on subscription plans
- Token usage and cost tracking

**Usage:**

#### Generate AI Post (Synchronous)
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

#### Generate AI Post (Force Queue for Async Processing)
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

#### Check Job Status (for Async Generation)
```bash
curl -X GET http://localhost:4000/api/ai/status/JOB_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Regenerate Existing Post
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

### 5. Usage Tracking & Analytics

**Features:**
- Track AI token usage and costs
- Daily and total usage statistics
- Remaining generations based on plan limits
- Recent activity history
- Admin access to all users' usage data

**Usage:**

#### Get Personal Usage Stats
```bash
curl -X GET http://localhost:4000/api/ai/usage/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Get Usage Stats with Date Range
```bash
curl -X GET "http://localhost:4000/api/ai/usage/me?from=2024-01-01&to=2024-12-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Admin: Get All Users' Usage (Admin Only)
```bash
curl -X GET http://localhost:4000/api/ai/usage/all \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### 6. Subscription Plans

**Features:**
- Freemium plan (10 generations/day, free)
- Pro plan (100 generations/day, $19.99/month)
- Dynamic daily limits based on user subscription
- Plan-based access control

**Current Plans:**
- **Freemium**: 10 AI generations per day
- **Pro**: 100 AI generations per day

## Error Handling

Common error responses and their meanings:

- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Insufficient permissions (e.g., admin routes)
- `404 Not Found`: Resource doesn't exist
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server-side error

## API Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error description"
}
```

### Job Status Response
```json
{
  "jobId": "job_123",
  "state": "completed",
  "progress": 100,
  "result": { ... },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Usage Stats Response
```json
{
  "total_generations": 25,
  "total_tokens": 15000,
  "total_cost_usd": "0.007500",
  "daily_usage": 3,
  "remaining_today": 7,
  "recent_activity": [...]
}
```

## Monitoring & Maintenance

- Check `/health` endpoint for service status
- Monitor Redis connection and queue lengths
- Review AI usage logs for cost optimization
- Regularly update dependencies and security patches
- Backup database and Redis data regularly

## Support

For issues or questions:
- Check API documentation at `/api-docs`
- Review server logs for error details
- Ensure all environment variables are properly configured
- Verify database and Redis connections are active
