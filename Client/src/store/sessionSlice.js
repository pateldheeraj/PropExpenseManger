import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createSessionAPI,
  getSessionsAPI,
  getSessionByIdAPI
} from '../common/session.api.js';

export const fetchSessions = createAsyncThunk(
  'sessions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSessionsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sessions');
    }
  }
);

export const fetchSessionById = createAsyncThunk(
  'sessions/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSessionByIdAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch session');
    }
  }
);

export const createSession = createAsyncThunk(
  'sessions/create',
  async (sessionData, { rejectWithValue }) => {
    try {
      const response = await createSessionAPI(sessionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create session');
    }
  }
);

const sessionSlice = createSlice({
  name: 'sessions',
  initialState: {
    sessions: [],
    currentSession: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
    clearSessionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By Id
      .addCase(fetchSessionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
      })
      .addCase(fetchSessionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.unshift(action.payload.session); // Add new session to top
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentSession, clearSessionError } = sessionSlice.actions;
export default sessionSlice.reducer;
