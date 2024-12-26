# Ticket Khidki -- A MERN Stack Movie Ticket Booking Application 🎥🎫

Welcome to the **MERN Stack Movie Ticket Booking Application**! This project is a full-stack web application designed to streamline movie ticket booking for users, theater owners, and administrators.

## Features ✨

<details>
<summary><b>General Features</b> 📋</summary>

- **Full-Stack Application**: A real-world full-stack application built from scratch.
- **Separate User Interfaces**: Dedicated interfaces for users, administrators, and theater owners.
- **Modern UI/UX**: Utilizes Ant Design (ANTD) for sleek and responsive components with customized styles.

</details>

<details>
<summary><b>User Features</b> 👤</summary>

- **Browse Movies**: Explore a catalog of movies uploaded by administrators.
- **Book Tickets**: Select shows, check seat availability, and book tickets for desired movies.
- **Secure Payments**: Integrated with Stripe Payment Gateway to handle payments securely, including edge cases like negative payment scenarios.
- **Manage Tickets**: Users can view and manage their booked tickets conveniently.

</details>

<details>
<summary><b>Theater Owner Features</b> 🎭</summary>

- **Theater Registration**: Add theaters to the platform, subject to admin approval.
- **Add Shows**: Once approved, add multiple shows for a single day at different times.
- **Show Availability**: Manage and update seat availability for each show.

</details>

<details>
<summary><b>Admin Features</b> 🛠️</summary>

- **Manage Movies**: Upload and manage movies for users and theater owners.
- **Approve Theaters**: Review and approve theaters registered by theater owners.
- **Manage Users**: Handle user accounts and ticket-related queries from a centralized panel.

</details>

## Technologies Used 💻

### MERN Stack Overview
- **MongoDB**: Document-based NoSQL database for storing application data.
- **Express.js**: Backend web framework for building RESTful APIs.
- **React.js**: Frontend library for creating dynamic and responsive user interfaces.
- **Node.js**: JavaScript runtime for building scalable server-side applications.

### Additional Tools and Libraries
- **JWT (JSON Web Tokens)**: For secure authentication and session management.
- **Bcrypt**: For password hashing to enhance security.
- **Redux Toolkit**: For state management, ensuring consistent and predictable application behavior.
- **Ant Design**: For user interface components with custom stylesheets for specific requirements.
- **Stripe**: Payment gateway integration to handle transactions.

## Application Architecture 🏗️

The application is divided into three main interfaces:

<details>
<summary><b>User Interface</b> 👥</summary>

- Browse movies, book tickets, and view/manage bookings.

</details>

<details>
<summary><b>Theater Owner Interface</b> 🎟️</summary>

- Add theaters, request admin approval, and manage show timings.

</details>

<details>
<summary><b>Admin Panel</b> 🛡️</summary>

- Manage movies, approve theater registrations, and oversee user activities.

</details>

## Key Functionalities ⚙️

- **Authentication**: Implemented using JWT for secure login and session handling.
- **State Management**: Efficiently handled using Redux Toolkit.
- **Seat Availability**: Dynamically checks seat availability based on selected date and show.
- **Responsive Design**: Optimized for various devices using Ant Design components and custom styles.
- **Payment Handling**: Stripe integration ensures a seamless payment experience.

## Deployment 🚀

The application is hosted on **Heroku**, making it accessible from anywhere. The codebase is version-controlled and available on GitHub for collaboration and improvements.

## Installation and Setup 🛠️

1. Clone the repository:
     ```bash
     git clone git@github.com:omsurase/TicketKhidki.git
     cd TicketKhidki
     ```

2. Install dependencies:
     ```bash
     cd server
     npm install
     cd ..
     cd client
     npm install
     cd ..
     ```

3. Configure environment variables:
   - Create a `.env` file in the server directory and add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_PUBLIC_KEY=your_stripe_public_key
     ```

4. Start the development server:
   Open two terminals
   - **Terminal 1:** Run the Server
     ```bash
     nodemon
     ```
   - **Terminal 2:** Run the Client
     ```bash
     cd client
     npm start
     ```

6. Access the application at `http://localhost:3000`.

## Contributions 🤝

Contributions are welcome! Feel free to fork the repository, create feature branches, and submit pull requests. Please ensure your changes align with the project's overall design and coding standards.

## License 📄

This project is licensed under the [MIT License](LICENSE).
