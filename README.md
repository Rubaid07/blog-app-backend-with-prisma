<div align="center">

#  Blog App Backend API

A robust and feature-rich backend RESTful API for a modern blogging platform

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

</div>

---

##  Overview

A powerful backend API built with modern technologies to provide a seamless blogging experience. This API supports advanced features like role-based authentication, nested commenting system, post management, and comprehensive admin controls.

##  Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **TypeScript** | Type-safe Development |
| **Express.js** | Web Framework |
| **PostgreSQL** | Relational Database |
| **Prisma** | Modern ORM |
| **Better Auth** | Authentication System |
| **Nodemailer** | Email Service |

##  Key Features

###  Authentication & Authorization
- **Secure Authentication:** Email/Password based sign-up and sign-in
- **Role-Based Access Control (RBAC):**
  - ** USER:** Create posts, comment, and reply to comments
  - ** ADMIN:** Full moderation access, user management, and content deletion

###  Post Management
- Complete CRUD operations for blog posts
- Featured post support for highlighting important content
- Flexible tagging system for better content organization
- ** Auto View Counter:** Tracks and increments view count automatically
- Draft and publish functionality
- Post search and filtering capabilities

###  Advanced Commenting System
- **Nested Comments:** Support for multi-level comment threads
- Reply to any comment to create discussions
- Admin moderation and approval system
- Comment status management (Approved/Pending/Rejected)

###  Search & Pagination
- Efficient pagination for optimal performance
- Advanced search functionality across post titles and content
- Filter by tags, featured status, and more

##  Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn package manager

### Step-by-Step Installation

1. **Clone the Repository**
```bash
   git clone https://github.com/Rubaid07/blog-app-backend-with-prisma.git
   cd blog-app-backend
```

2. **Install Dependencies**
```bash
   npm install
```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
```env
   # Server Configuration
   PORT=3000

   # Database Configuration
   # Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma-blog-appp?schema=public"

   # Authentication Configuration
   BETTER_AUTH_SECRET="your_secure_secret_key_here"
   BETTER_AUTH_URL="http://localhost:3000"
   APP_URL="http://localhost:4000"

   # Email Configuration (for notifications)
   APP_USER="your-email@gmail.com"
   APP_PASS="your-app-password"

   # OAuth Configuration (Optional)
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

4. **Database Setup**
```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) Seed the database
   npx prisma db seed
```

5. **Start the Development Server**
```bash
   npm run dev
```

   The server will start at `http://localhost:3000`

##  API Documentation

###  Authentication Endpoints

#### Sign Up
Creates a new user account.
```http
POST /api/auth/sign-up/email
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "redirect": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "emailVerified": true,
    "image": null,
    "role": "USER",
    "status": "ACTIVE",
    "id": "clx1234567890"
  }
}
```

#### Sign In
Authenticates an existing user.
```http
POST /api/auth/sign-in/email
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "emailVerified": true,
    "image": "https://example.com/avatar.png",
    "role": "USER",
    "status": "ACTIVE",
    "id": "clx1234567890"
  }
}
```

---

###  Post Management Endpoints

#### Create Post
Creates a new blog post.
```http
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Introduction to TypeScript",
  "content": "TypeScript is a superset of JavaScript that adds static typing...",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "isFeatured": true,
  "tags": ["typescript", "programming", "web-development"]
}
```

**Response:**
```json
{
  "id": "clx9876543210",
  "title": "Introduction to TypeScript",
  "content": "TypeScript is a superset of JavaScript that adds static typing...",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "isFeatured": true,
  "status": "PUBLISHED",
  "tags": ["typescript", "programming", "web-development"],
  "views": 0,
  "authorId": "clx1234567890",
  "createdAt": "2024-03-15T10:00:00.000Z",
  "updatedAt": "2024-03-15T10:00:00.000Z"
}
```

#### Get All Posts (Paginated)
Retrieves a paginated list of published posts.
```http
GET /posts?page=1&limit=10&search=typescript&tag=programming
```

**Response:**
```json
{
  "data": [
    {
      "id": "clx9876543210",
      "title": "Introduction to TypeScript",
      "content": "TypeScript is a superset of JavaScript...",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "isFeatured": true,
      "status": "PUBLISHED",
      "tags": ["typescript", "programming", "web-development"],
      "views": 150,
      "authorId": "clx1234567890",
      "author": {
        "name": "John Doe",
        "image": "https://example.com/avatar.png"
      },
      "createdAt": "2024-03-15T10:00:00.000Z",
      "_count": {
        "comments": 5
      }
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### Get Single Post
Retrieves detailed information about a specific post including comments.
```http
GET /posts/:id
```

**Response:**
```json
{
  "id": "clx9876543210",
  "title": "Introduction to TypeScript",
  "content": "TypeScript is a superset of JavaScript...",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "isFeatured": true,
  "views": 151,
  "tags": ["typescript", "programming"],
  "author": {
    "name": "John Doe",
    "image": "https://example.com/avatar.png"
  },
  "comments": [
    {
      "id": "clxaaaa111111",
      "content": "Great article! Very informative.",
      "authorId": "clx1234567890",
      "author": {
        "name": "Jane Smith",
        "image": "https://example.com/jane.png"
      },
      "postId": "clx9876543210",
      "parentId": null,
      "status": "APPROVED",
      "createdAt": "2024-03-15T11:00:00.000Z",
      "replies": [
        {
          "id": "clxbbbb222222",
          "content": "I agree! Especially the section on generics.",
          "authorId": "clx5678901234",
          "author": {
            "name": "Mike Johnson"
          },
          "parentId": "clxaaaa111111",
          "status": "APPROVED",
          "createdAt": "2024-03-15T11:30:00.000Z"
        }
      ]
    }
  ],
  "_count": {
    "comments": 2
  }
}
```

#### Update Post
Updates an existing post (author only).
```http
PUT /posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated: Introduction to TypeScript",
  "isFeatured": false
}
```

#### Delete Post
Deletes a post (author or admin only).
```http
DELETE /posts/:id
Authorization: Bearer {token}
```

---

###  Comment System Endpoints

#### Add Comment
Adds a comment to a post.
```http
POST /comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "This is a very insightful article. Thanks for sharing!",
  "postId": "clx9876543210"
}
```

**Response:**
```json
{
  "id": "clxcccc333333",
  "content": "This is a very insightful article. Thanks for sharing!",
  "authorId": "clx1234567890",
  "postId": "clx9876543210",
  "parentId": null,
  "status": "APPROVED",
  "createdAt": "2024-03-15T12:00:00.000Z"
}
```

#### Reply to Comment
Adds a reply to an existing comment.
```http
POST /comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Glad you found it helpful!",
  "postId": "clx9876543210",
  "parentId": "clxcccc333333"
}
```

#### Delete Comment
Deletes a comment (author or admin only).
```http
DELETE /comments/:id
Authorization: Bearer {token}
```

---

##  Admin Capabilities

Administrators have special privileges to maintain platform quality:

| Feature | Description |
|---------|-------------|
| ** Content Moderation** | Delete any inappropriate post or comment |
| ** User Management** | Suspend or activate user accounts |
| ** Comment Approval** | Approve or reject pending comments |
| ** Featured Posts** | Promote important posts to featured status |
| ** Analytics Access** | View platform statistics and user activity |


##  Security Features

- **Password Hashing:** Bcrypt for secure password storage
- **Input Validation:** Request validation using middleware
- **SQL Injection Protection:** Prisma ORM prevents SQL injection
- **CORS Configuration:** Controlled cross-origin resource sharing
- **Rate Limiting:** Protection against brute-force attacks


## 👨‍💻 Author

**Rubaid**
- GitHub: [@Rubaid07](https://github.com/Rubaid07)


---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ by [Rubaid](https://github.com/Rubaid07)

</div>
