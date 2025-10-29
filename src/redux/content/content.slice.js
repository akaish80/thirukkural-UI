import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContent } from '../../services/contentService';

export const loadContent = createAsyncThunk('content/loadContent', async () => {
  return await fetchContent();
});

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer;