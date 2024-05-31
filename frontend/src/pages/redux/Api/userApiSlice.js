import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const useLoginMutation = createAsyncThunk(
  'user/login',
  async (credentials) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
);

const userApiSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(useLoginMutation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(useLoginMutation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(useLoginMutation.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Login failed';
      });
  },
});

export const { } = userApiSlice.actions;
export default userApiSlice.reducer;