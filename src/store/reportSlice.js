import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// fetch all reports for current user
export const getReports = createAsyncThunk('reports/getAll', async (_, thunkAPI) => {
    try {
        const response = await api.get('/reports');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const uploadReport = createAsyncThunk('reports/upload', async (formData, thunkAPI) => {
    try {
        const response = await api.post('/reports', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const reportSlice = createSlice({
    name: 'reports',
    initialState: {
        reports: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        resetReportState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReports.pending, (state) => { state.isLoading = true; })
            .addCase(getReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadReport.fulfilled, (state, action) => {
                state.reports.unshift(action.payload);
            });
    }
});

export const { resetReportState } = reportSlice.actions;
export default reportSlice.reducer;