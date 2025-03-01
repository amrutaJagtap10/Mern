# Ebus Management System

## Project Structure

### Admin Module

- Login and authentication for the admin.
- Admin creates accounts for drivers/travel operators.
- Admin manages bus information and details.

### Driver/Travel Module

- Login and authentication for drivers/travel operators.
- Post and update bus details (type, contact, etc.).
- Update bus location in real-time.

### User Module

- Register and log in.
- View bus details and locations.
- Search for buses based on source and destination.

## Implementation Plan

### 1. Firebase Setup

- Use **Firebase Authentication** for login/register functionality.
- Use **Firebase Firestore** for storing bus and user data.
- Use **Firebase Realtime Database** to track bus locations in real-time.

### 2. Modules Implementation

#### Admin Module

- **Login:**

  - Implement Firebase Authentication for secure admin login.

- **Manage Accounts:**

  - Admin can create driver/travel operator accounts by filling a form and storing details in Firestore.

- **Manage Bus Details:**

  - Admin can add, update, or delete bus details in Firestore.

#### Driver/Travel Module

- **Login:**

  - Drivers/Travel operators log in using credentials created by the admin.

- **Post Bus Information:**

  - A form to add/update:
    - Bus type (AC, non-AC, etc.).
    - Contact details.
    - Route details (source, destination, stops).
  - Store these details in Firestore.

- **Update Bus Location:**

  - Use the Geolocation API or manual input for the bus's current location.
  - Push the location to the Firebase Realtime Database for real-time tracking.

#### User Module

- **Register/Login:**

  - Allow users to create accounts and log in using Firebase Authentication.

- **Search Bus Location:**

  - A search bar to input source and destination.
  - Fetch matching buses from Firestore and display their real-time location on a map (e.g., using Leaflet.js or Google Maps API).

### 3. Real-Time Location Tracking

- Use the Firebase Realtime Database to continuously update and retrieve bus locations.
- Integrate Google Maps API or Leaflet.js to display the bus location on a map.
- Use markers to represent buses, and allow users to click on a marker to see bus details.

## Features Overview

### Admin Features

- Login securely.
- Manage driver/travel operator accounts.
- Add/update/delete bus details.

### Driver/Travel Features

- Login securely.
- Post/update bus information (type, route, contact).
- Update bus location in real-time.

### User Features

- Register/login.
- Search for buses based on source and destination.
- View real-time bus locations on a map.
- Get details like bus type, contact info, and estimated arrival time.

## Technical Challenges

### Real-Time Location Updates

- Use Firebase Realtime Database for seamless location updates.
- Optimize the location update frequency to balance performance and accuracy.

### Search Functionality

- Use Firestore queries to filter buses based on source and destination.
- Handle edge cases (e.g., no matching buses).

### UI Responsiveness

- Ensure the interface is mobile-friendly using CSS or frameworks like Bootstrap.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Firebase Firestore, Firebase Authentication, Firebase Realtime Database
- **Maps:** Google Maps API / Leaflet.js
- **Styling:** CSS / Bootstrap

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/ebus-management-system.git
   cd ebus-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup Firebase:

   - Create a Firebase project.
   - Enable Authentication, Firestore, and Realtime Database.
   - Get Firebase config and replace in `.env`.

4. Start the development server:

   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please submit a pull request with improvements or new features.

## License

This project is licensed under the MIT License.

