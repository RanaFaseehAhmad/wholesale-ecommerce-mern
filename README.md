# Wholesale E-Commerce MERN Platform

A full-stack e-commerce platform built with the MERN stack. The application provides product browsing, search, category and subcategory navigation, dynamic filtering, pagination, reviews, shopping cart functionality, and order management.

## Features

* User authentication and authorization
* Product search
* Category and subcategory navigation
* Product filtering
* Brand filtering
* Country filtering
* Rating filtering
* Price range filtering
* Condition filtering
* Product pagination
* Product reviews and ratings
* Shopping cart
* Order management
* Responsive user interface

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* PrimeReact
* CSS Modules
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Project Structure

```text
wholesale-ecommerce-mern/
│
├── Client/
│   ├── src/
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

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/RanaFaseehAhmad/wholesale-ecommerce-mern.git
```

### 2. Install frontend dependencies

```bash
cd Client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd Server
npm install
```

## Environment Variables

Create a `.env` file inside the `Server` directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by the backend.

For security, real `.env` values are not committed to GitHub.

## Run the Application

### Start the backend

```bash
cd Server
npm run start
```

### Start the frontend

Open another terminal:

```bash
cd Client
npm run start
```

Use the command defined in your `Client/package.json` if it differs.

## Screenshots

Screenshots of the application will be added here.

## Key Learning Areas

This project demonstrates practical use of:

* React state management
* React Context API
* React Router
* REST APIs
* Express.js controllers and routers
* MongoDB and Mongoose
* MongoDB references and population
* Dynamic filtering
* Pagination
* Authentication
* Shopping cart logic
* Product reviews
* Order management

## Future Improvements

* Payment gateway integration
* Product image upload and cloud storage
* Advanced admin dashboard
* Wishlist functionality
* Order tracking
* Production deployment

## Author

**Faseeh Ahmad**

Frontend / MERN Stack Developer
