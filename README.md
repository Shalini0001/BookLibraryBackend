# BookLibraryBackend
Book Subscription App (Backend)
This is the full-stack backend for the Book Subscription application. It handles user authentication via Firebase/JWT, book management, subscription logic with daily auto-expiry via CRON jobs, and push notifications.

🚀 Features
Authentication: Firebase UID verification + JWT (JSON Web Token) generation.
Subscription Management: 30-day active period logic.
Automated Tasks: CRON job runs daily at midnight to expire subscriptions.
Payment Gateway (Mocked): Integrated mock Razorpay flow for testing without a merchant account.
Push Notifications: Firebase Cloud Messaging (FCM) for activation and expiry alerts.

🛠️ Tech Stack
Runtime: Node.js (v22+)
Framework: Express.js
Database: MongoDB Atlas (Mongoose ODM)
Security: JWT, node-crypto (HMAC verification logic)
Task Scheduling: node-cron

⚙️ Setup & Installation
1. Clone the Repository:
   git clone <your-repo-link>
   cd domatobackend
2. Install Dependencies:
   npm install
3. Environment Variables (.env): Create a .env file in the root directory and add the following:
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.kz6oyhu.mongodb.net/domato
   JWT_SECRET=your_jwt_secret_key
4. Firebase Setup: Place your firebase-key.json file in the project root to enable Push Notifications.
5. Run the Server:
     npm start
     npx nodemon src/server.js
   
🛰️ API Documentation
Method,   Endpoint,                Description                              Header
POST,     /auth/firebase-login,    Verifies Firebase UID and returns 
                                   a JWT token.
GET,      /books,                  Returns a list of the 4 featured 
                                   books.
GET,      /books/:id,              Returns details for a specific book.
POST,     /payment/create-order,   Generates a mock Razorpay Order ID.      Authorization: Bearer <token>,
POST,     /payment/verify,         Activates a 30-day subscription.         Authorization: Bearer <token>,

🕒 Subscription & CRON Logic
The backend includes a scheduled task located in src/cron/subscription.cron.js.
. Schedule: Every day at 00:00 (Midnight).
. Action: Finds all ACTIVE subscriptions where the endDate is less than the current date, updates the status to EXPIRED, and sends an FCM push notification to the user.

💡 Important Note on Razorpay
Due to current RBI regulations and KYC requirements for new Razorpay accounts, this project uses a Mocked Payment Gateway approach.
. The /payment/create-order and /payment/verify endpoints return the exact data structure expected by the frontend, allowing for a seamless end-to-end user experience demo without requiring a live Merchant ID.

🧪 Testing with Postman
Login: Use /auth/firebase-login to get a token.
Authorize: In Postman, go to the Auth tab, select Bearer Token, and paste your token.
Purchase: Call /payment/verify to activate your subscription.
Check DB: Verify that a new document appears in your subscriptions collection in MongoDB.
