import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const getTransactions = createAsyncThunk('transactions/getAll', async (_, thunkAPI) => {
    try {
        const response = await api.get('/transactions');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createTransaction = createAsyncThunk('transactions/create', async (data, thunkAPI) => {
    try {
        const response = await api.post('/transactions', data);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        resetTransactionState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => { state.isLoading = true; })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.unshift(action.payload);
            });
    }
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;