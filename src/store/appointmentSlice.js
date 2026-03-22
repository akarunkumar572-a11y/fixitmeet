import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}/appointments/`;

// Create new appointment (booking)
export const createAppointment = createAsyncThunk('appointments/create', async (appointmentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(API_URL, appointmentData, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user appointments (handles both patient viewing theirs, or doctor viewing theirs)
export const getAppointments = createAsyncThunk('appointments/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Update record (e.g. status, diagnosis, medicines)
export const updateAppointment = createAsyncThunk('appointments/update', async (data, thunkAPI) => {
    try {
        const { id, ...rest } = data;
        const token = thunkAPI.getState().auth.user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(API_URL + id, rest, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        resetAppointmentState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Appointments
            .addCase(getAppointments.pending, (state) => { state.isLoading = true; })
            .addCase(getAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.appointments = action.payload;
            })
            .addCase(getAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createAppointment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // optionally add to appointments list
                state.appointments.push(action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Update mapping
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const index = state.appointments.findIndex(a => (a.id || a._id) === (action.payload.id || action.payload._id));
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
            });
    }
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
