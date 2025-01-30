Forever - E-Commerce Clothing Market

Welcome to Forever, a fully-fledged e-commerce website for clothing, designed to provide a seamless shopping experience. This project is built with modern web technologies and follows best practices in full-stack development.

1. Project Overview :
1.1. E-commerce website for clothing
1.2. Provides a seamless shopping experience
1.3. Built with modern web technologies
1.4. Full-stack development
   
2. Features :
2.1. User Authentication
2.1.1. Secure login and signup functionality
2.2. Product Management
2.2.1. Admin can add, update, and delete products
2.3. Shopping Cart
2.3.1. Users can add and remove items from the cart
2.4. Order Management
2.4.1. Users can place orders
2.4.2. Admins can manage order statuses
2.5. Payment Integration
2.5.1. Payments handled using Stripe and Razorpay
2.6. Responsive UI
2.6.1. Built with React and Tailwind CSS
2.7. Secure Backend
2.7.1. Implemented with Node.js and Express.js
2.8. Database Management
2.8.1. Uses MongoDB for data storage



3. Tech Stack
3.1. Frontend
3.1.1. React.js
3.1.2. Tailwind CSS
3.1.3. Axios

3.2. Backend
3.2.1. Node.js
3.2.2. Express.js
3.2.3. MongoDB
3.2.4. Cloudinary (for image storage)

3.3. Payment Gateways
3.3.1. Stripe
3.3.2. Razorpay
Folder Structure

/forever-ecommerce
├── admin
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   ├── pages
│   │   │   ├── Add.jsx
│   │   │   ├── List.jsx
│   │   │   ├── Orders.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│
├── backend
│   ├── config
│   │   ├── cloudinary.js
│   │   ├── mongodb.js
│   ├── controllers
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   ├── middleware
│   │   ├── adminAuth.js
│   │   ├── auth.js
│   │   ├── multer.js
│   ├── models
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   ├── userModel.js
│   ├── routes
│   ├── server.js
│   ├── .env
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── BestSeller.jsx
│   │   │   ├── CartTotal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductItem.jsx
│   │   │   ├── Searchbar.jsx
│   │   ├── context
│   │   │   ├── ShopContext.jsx
│   │   ├── pages
│   │   │   ├── About.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Collection.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── PlaceOrder.jsx
│   │   │   ├── Verify.jsx
│   │   ├── App.jsx
│   ├── .env
│   ├── vite.config.js
│   ├── package.json

5. Installation
5.1. Clone the Repository
5.1.1. git clone https://github.com/your-username/forever-ecommerce.git
5.1.2. cd forever-ecommerce

5.2. Install Dependencies
5.2.1. Backend: cd backend, npm install
5.2.2. Frontend: cd ../frontend, npm install
5.2.3. Admin Panel: cd ../admin, npm install

5.3. Setup Environment Variables
5.3.1. Create a .env file in the backend directory
5.3.2. Add required variables (MongoDB, Stripe, Razorpay, Cloudinary)

5.4. Start the Application
5.4.1. Backend: cd backend, npm start
5.4.2. Frontend: cd frontend, npm run dev
5.4.3. Admin Panel: cd admin, npm run dev

6. API Routes
6.1. Authentication
6.1.1. POST /api/user/register - Register a new user
6.1.2. POST /api/user/login - Login user

6.2. Products
6.2.1. GET /api/products - Get all products
6.2.2. GET /api/products/:id - Get single product by ID
6.2.3. POST /api/products - Create new product (Admin only)
6.2.4. PUT /api/products/:id - Update product (Admin only)
6.2.5. DELETE /api/products/:id - Delete product (Admin only)

6.3. Orders
6.3.1. POST /api/orders - Place a new order
6.3.2. GET /api/orders/:userId - Get user orders
6.3.3. PUT /api/orders/:id - Update order status (Admin only)

7. Contributing
7.1. Pull requests are welcome
7.2. For major changes, open an issue first to discuss

8. License
8.1. MIT License

9. Contact
9.1. Contact email: adigoyal9720@gmail.com .

Let me know if you'd like to adjust or expand any sections!







