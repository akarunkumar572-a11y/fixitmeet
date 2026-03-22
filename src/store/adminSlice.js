import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const getAdminStats = createAsyncThunk('admin/getStats', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/stats`, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/users`, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAdminBookings = createAsyncThunk('admin/getBookings', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/bookings`, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAdminPayments = createAsyncThunk('admin/getPayments', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/payments`, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAdminReviews = createAsyncThunk('admin/getReviews', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/reviews`, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAdminTickets = createAsyncThunk('admin/getTickets', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/tickets`, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: [],
        verticalPerf: [],
        recentBookings: [],
        allPayments: [],
        allReviews: [],
        allTickets: [],
        users: [],
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {
        resetAdmin: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload.stats;
                state.verticalPerf = action.payload.verticalPerf;
                state.recentBookings = action.payload.recentBookings;
            })
            .addCase(getAdminStats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAdminBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recentBookings = action.payload; // Reuse recentBookings property or create a dedicated one
            })
            .addCase(getAdminBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAdminPayments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allPayments = action.payload;
            })
            .addCase(getAdminPayments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAdminReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allReviews = action.payload;
            })
            .addCase(getAdminReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAdminTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdminTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allTickets = action.payload;
            })
            .addCase(getAdminTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
