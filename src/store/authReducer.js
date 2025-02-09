import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../utils/axiosConfig.js';

// Updated thunks with corrections
export const registerUser = createAsyncThunk('auth/registerUser', async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosConfig.post('/auth/register', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

// authReducer.js (frontend)
export const logInUser = createAsyncThunk('auth/logInUser', 
    async (credentials, { rejectWithValue }) => { // Rename formData to credentials
      try {
        const response = await axiosConfig.post('/auth/login', 
          { // Create new object instead of passing formData directly
            email: credentials.email,
            password: credentials.password
          }, 
          {
            headers: { 
              "Content-Type": "application/json" 
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Authentication failed');
      }
    }
  );    
export const logOutUser = createAsyncThunk('auth/logOutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosConfig.get('/auth/logout');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (formData, { rejectWithValue }) => {
    try {
       

        const response = await axiosConfig.put('/auth/edit', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("❌ Profile update error:", error.response?.data);
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

export const deleteUser = createAsyncThunk('/auth/deleteUser', async (_, { rejectWithValue }) => {
    try {
        // Changed to DELETE request and fixed endpoint typo
        const response = await axiosConfig.delete('auth/delete', {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

// Auth slice remains mostly the same with proper error handling
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        successMessage: '',
        errorMessage: '',
    },
    reducers: {
        clearMessages: (state) => {
            state.successMessage = '';
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.successMessage = '';
            state.errorMessage = '';
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMessage = 'Registration successful';
            state.user = action.payload.user;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        })
        // Handle logInUser
        .addCase(logInUser.pending, (state) => {
            state.isLoading = true;
            state.successMessage = '';
            state.errorMessage = '';
        })
        .addCase(logInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMessage = 'Login successful';
            state.user = action.payload.user;
        })
        .addCase(logInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        })
        // Handle logOutUser
        .addCase(logOutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logOutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.successMessage = 'Logout successful';
            state.user = null;
        })
        .addCase(logOutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        })
        // Handle updateUserProfile
        .addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMessage = 'Profile updated successfully';
            state.user =  {...state.user,...action.payload.user} ; 
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        })
        // Handle deleteUser
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.isLoading = false;
            state.successMessage = 'User deleted successfully';
            state.user = null;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
            
    },
});

export const { clearMessages } = authSlice.actions;
export default authSlice.reducer;


