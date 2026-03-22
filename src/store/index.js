import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice';
import appointmentReducer from './appointmentSlice';
import reportReducer from './reportSlice';
import transactionReducer from './transactionSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        services: serviceReducer,
        appointments: appointmentReducer,
        reports: reportReducer,
        transactions: transactionReducer,
        admin: adminReducer,
    },
});
