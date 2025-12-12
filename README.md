# WishVipe - Cloud-Based E-Commerce Platform

WishVipe is a secure, scalable, and high-performance cloud-based e-commerce platform built with the MERN stack (MongoDB, Express, React-like Vanilla JS, Node.js).

## Features

- **User**: Signup/Login, Browse Products, Search, Cart, Checkout, Profile, Order History.
- **Admin**: Dashboard, Product Management (CRUD), Order Management.
- **Security**: JWT Authentication, Password Hashing, Protected Routes.
- **Cloud**: Ready for AWS EC2 (Backend), S3 (Images), and MongoDB Atlas.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, Bcrypt

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd wishvipe
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in `backend/` with:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_atlas_connection_string
        JWT_SECRET=your_jwt_secret
        AWS_ACCESS_KEY_ID=your_aws_key
        AWS_SECRET_ACCESS_KEY=your_aws_secret
        AWS_REGION=your_aws_region
        AWS_BUCKET_NAME=your_s3_bucket
        ```
    - Start the server:
        ```bash
        npm run dev
        ```

3.  **Frontend Setup**:
    - Open `frontend/index.html` in your browser or use a live server extension.

## Cloud Deployment Guide

### 1. Database (MongoDB Atlas)
- Create a Cluster on MongoDB Atlas.
- Whitelist your IP or allow all (0.0.0.0/0) for cloud access.
- Get the Connection String and add it to `.env`.

### 2. Backend (AWS EC2)
- Launch an EC2 instance (Ubuntu/Amazon Linux).
- SSH into the instance.
- Install Node.js and Git.
- Clone the repo and install dependencies.
- Use `pm2` to keep the server running: `pm2 start server.js`.
- Configure Security Groups to allow traffic on port 5000 (or use Nginx as reverse proxy).

### 3. Frontend (AWS S3 + CloudFront)
- Create an S3 bucket for static website hosting.
- Upload the `frontend` folder contents to the bucket.
- Enable Static Website Hosting in S3 properties.
- (Optional) Set up CloudFront for CDN and HTTPS.

### 4. Image Storage (AWS S3)
- Create a separate S3 bucket for product images.
- Update the backend to upload images to this bucket using `aws-sdk`.

## API Endpoints

- `POST /api/auth/register`: Register user
- `POST /api/auth/login`: Login user
- `GET /api/products`: Get all products
- `POST /api/orders`: Create order
- `GET /api/orders/myorders`: Get user orders
