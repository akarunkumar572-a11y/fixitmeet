import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}/services/`;

export const getServices = createAsyncThunk('services/getAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createService = createAsyncThunk('services/create', async (serviceData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(API_URL, serviceData, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateService = createAsyncThunk('services/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.put(API_URL + data.id, data.service, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteService = createAsyncThunk('services/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.delete(API_URL + id, config);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        resetServiceState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Services
            .addCase(getServices.pending, (state) => { state.isLoading = true; })
            .addCase(getServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.services = action.payload;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Create Service
            .addCase(createService.fulfilled, (state, action) => {
                state.services.push(action.payload);
            })
            // Update Service
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.services.findIndex(s => (s.id || s._id) === (action.payload.id || action.payload._id));
                if (index !== -1) {
                    state.services[index] = action.payload;
                }
            })
            // Delete Service (backend returns { id } or full payload)
            .addCase(deleteService.fulfilled, (state, action) => {
                const id = action.payload?.id ?? action.payload?._id;
                if (id) state.services = state.services.filter(s => (s.id || s._id) !== id);
            })
            .addCase(createService.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateService.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;
