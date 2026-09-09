# Wholesale E-Commerce MERN Platform

A full-stack wholesale e-commerce platform built using the **MERN Stack**. The application provides a complete e-commerce experience with user authentication, product browsing, search functionality, category and subcategory navigation, dynamic filtering, product reviews, shopping cart functionality, order management, and image management.

The project implements modern authentication using **JWT, Access Tokens, and Refresh Tokens**. It also uses **Axios Interceptors** for handling authenticated API requests, **Redux Toolkit** for global state management, **Cloudinary** for cloud-based image storage, and **Nodemailer** for email functionality.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration / Create account
- User login
- User logout
- Forgot password functionality
- Password reset functionality
- JWT authentication
- Access token authentication
- Refresh token authentication
- Protected routes
- Role-based authentication for users
- Axios request and response interceptors
- Automatic access token attachment to authenticated requests
- Token refresh flow

---

### 🛍️ Product Features

- Product browsing
- Product search
- Category navigation
- Subcategory navigation
- Product details page
- Dynamic product filtering
- Brand filtering
- Country filtering
- Rating filtering
- Price range filtering
- Product condition filtering
- Product pagination
- Product reviews and ratings

---

### 🛒 Shopping Cart

- Add products to the cart
- Increase product quantity
- Decrease product quantity
- Remove individual cart items
- Remove all cart items
- Cart item count
- Guest user cart using localStorage
- Logged-in user cart using MongoDB
- Automatic cart updates

---

### 📦 Order Management

- Order management functionality
- Product and cart integration
- Checkout flow

---

### 📧 Email Functionality

- Forgot password email functionality
- Email handling using Nodemailer

---

### 🖼️ Image Management

- Product image upload
- Cloud-based image storage using Cloudinary
- Image upload handling using Multer

---

### 🎨 User Interface

- Responsive design
- Responsive user interface
- Modern e-commerce layout
- Reusable React components

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Redux Toolkit
- Axios
- Axios Interceptors
- React Hook Form
- PrimeReact
- CSS Modules
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Cloudinary
- Multer
- bcrypt

---

## 📂 Project Structure

```text id="qmfwoq"
wholesale-ecommerce-mern/
│
├── Client/
│   ├── src/
│   │   ├── Api/
│   │   ├── Components/
│   │   ├── Features/
│   │   ├── Pages/
│   │   └── ...
│   │
│   ├── public/
│   └── package.json
│
├── Server/
│   ├── Models/
│   ├── Controllers/
│   ├── Routers/
│   ├── Middleware/
│   ├── config/
│   └── package.json
│
├── screenshots/
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash id="k4pv1e"
git clone https://github.com/RanaFaseehAhmad/wholesale-ecommerce-mern.git
```

Navigate to the project directory:

```bash id="zoc0r8"
cd wholesale-ecommerce-mern
```

---

### 2. Install Frontend Dependencies

```bash id="v0n8ic"
cd Client
npm install
```

---

### 3. Install Backend Dependencies

Open another terminal and run:

```bash id="7pjrd6"
cd Server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **Server** directory.

Example:

```env id="vtc3l9"
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

Add any additional environment variables required by your application.

> **Important:** Never upload your real `.env` file or sensitive credentials to GitHub.

---

## ▶️ Run the Application

### Start the Backend

Open the terminal inside the Server directory:

```bash id="0k39pv"
cd Server
npm run start
```

### Start the Frontend

Open another terminal inside the Client directory:

```bash id="ck0qj0"
cd Client
npm run start
```

Use the commands defined in your `package.json` files if they differ.

---

## 🔐 Authentication Flow

The application uses a token-based authentication system.

### Login Process

```text id="kjiyx6"
User Login
    ↓
Server Verifies Credentials
    ↓
Access Token + Refresh Token Generated
    ↓
Tokens Used for Authentication
    ↓
Access Token Attached by Axios Interceptor
    ↓
Protected API Request
```

### Token Refresh Process

```text id="lv7pnt"
API Request
    ↓
Access Token Expires
    ↓
401 Unauthorized Response
    ↓
Axios Response Interceptor
    ↓
Refresh Token Request
    ↓
New Access Token Generated
    ↓
Original Request Retried
```

---

## 🔄 Axios Interceptors

Axios interceptors are used on the frontend to manage API requests and authentication.

### Request Interceptor

The request interceptor:

- Retrieves the access token
- Attaches the token to authenticated API requests
- Sends the authorization header to the backend

### Response Interceptor

The response interceptor:

- Handles authentication errors
- Detects unauthorized responses
- Supports the token refresh flow
- Retries the original request with a new access token

---

## 🗃️ State Management

Redux Toolkit is used for global state management.

Currently, Redux is used to manage the **shopping cart count**, allowing cart information to be shared between different components such as the Navbar and Cart page without prop drilling.

---

## 🛒 Shopping Cart System

The application supports both **Guest Users** and **Logged-in Users**.

### Guest User

For users who are not logged in:

```text id="0k62yv"
Guest User
    ↓
Add Product to Cart
    ↓
Cart Data Stored in localStorage
```

### Logged-in User

For authenticated users:

```text id="st7b1u"
Logged-in User
    ↓
Add Product to Cart
    ↓
Cart Data Stored in MongoDB
```

The cart supports:

- Adding products
- Updating quantities
- Removing individual products
- Removing all products
- Updating the cart count

---

## 🖼️ Cloudinary Image Upload

Product images are managed using Cloudinary.

The image upload flow includes:

```text id="doh7w8"
Image Selected
    ↓
Multer Processes Upload
    ↓
Cloudinary Stores Image
    ↓
Image URL Saved in Database
```

---

## 📧 Forgot Password Flow

The application includes a password recovery system.

```text id="79l1q2"
User Requests Password Reset
    ↓
Reset Request Sent to Server
    ↓
Server Generates Reset Process
    ↓
Nodemailer Sends Email
    ↓
User Resets Password
```

---

## ⭐ Key Learning Areas

This project demonstrates practical experience with:

- MERN Stack development
- React state management
- Redux Toolkit
- React Context API
- React Router
- Axios
- Axios Interceptors
- REST APIs
- JWT Authentication
- Access Tokens
- Refresh Tokens
- Protected routes
- User authentication and authorization
- Forgot password functionality
- Nodemailer
- Cloudinary
- Multer
- MongoDB and Mongoose
- MongoDB references and population
- Dynamic product filtering
- Product pagination
- Shopping cart logic
- Guest and logged-in user cart handling
- localStorage
- Product reviews and ratings
- Order management

---

## 🔮 Future Improvements

- Payment gateway integration
- Advanced admin dashboard
- Wishlist functionality
- Order tracking
- Seller dashboard improvements
- Advanced product analytics
- Production deployment

---

## 👨‍💻 Author

**Faseeh Ahmad**

Frontend / MERN Stack Developer

---

⭐ If you like this project, consider giving the repository a star!