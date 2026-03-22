# FixitMeet

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner in the interactive watch mode.

## Backend

The backend server lives in the `backend/` folder and uses Express + MongoDB.

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```
2. **Configure environment**  
   Copy `backend/.env.example` or create `.env` and set `MONGO_URI`, `JWT_SECRET`, `PORT`, etc.
3. **Run the server**
   ```bash
   npm run dev    # nodemon watcher
   npm start      # production mode
   ```
4. **Seed sample data**
   ```bash
   npm run seed
   ```

The API exposes endpoints under `/api/auth`, `/api/services`, `/api/appointments`, `/api/users`, `/api/partners`, `/api/reports`, and `/api/transactions`.  
Authentication uses JWT; protected routes require an `Authorization: Bearer <token>` header.

### Creating a superadmin (backend only)

```bash
cd backend
node createSuperAdmin.js <email> <password> [name]
```

This creates an admin user with the given email and password.

## Frontend

- **Public:** Home, Services, Login, Register, Partner registration.
- **Patient:** Dashboard, Book Now, Bookings, Profile, Reports, Wallet.
- **Admin:** Dashboard, Services, Pro Approvals, Settings, Notifications, Profile.
- **Professional:** Appointments, Patients, Prescriptions (doctor); Jobs, Earnings (partner).

Set `REACT_APP_API_URL` (e.g. `http://localhost:5000/api`) in a `.env` file in the project root if the API runs on a different URL.
