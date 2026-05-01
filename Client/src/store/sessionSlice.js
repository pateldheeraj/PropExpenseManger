import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createSessionAPI,
  getSessionsAPI,
  getSessionByIdAPI,
  addAccountToSessionAPI,
  updateAccountAPI,
  deleteAccountAPI
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

export const addAccountToSession = createAsyncThunk(
  'sessions/addAccount',
  async ({ sessionId, accountData }, { rejectWithValue }) => {
    try {
      const response = await addAccountToSessionAPI(sessionId, accountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add account');
    }
  }
);

export const updateAccount = createAsyncThunk(
  'sessions/updateAccount',
  async ({ accountId, accountData }, { rejectWithValue }) => {
    try {
      const response = await updateAccountAPI(accountId, accountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update account');
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'sessions/deleteAccount',
  async (accountId, { rejectWithValue }) => {
    try {
      await deleteAccountAPI(accountId);
      return accountId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete account');
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
        state.sessions.unshift(action.payload.session);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Account
      .addCase(addAccountToSession.fulfilled, (state, action) => {
        if (state.currentSession) {
          state.currentSession.accounts.push(action.payload);
        }
      })
      // Update Account
      .addCase(updateAccount.fulfilled, (state, action) => {
        if (state.currentSession) {
          const index = state.currentSession.accounts.findIndex(acc => acc._id === action.payload._id);
          if (index !== -1) {
            state.currentSession.accounts[index] = action.payload;
          }
        }
      })
      // Delete Account
      .addCase(deleteAccount.fulfilled, (state, action) => {
        if (state.currentSession) {
          state.currentSession.accounts = state.currentSession.accounts.filter(acc => acc._id !== action.payload);
        }
      });
  },
});

export const { clearCurrentSession, clearSessionError } = sessionSlice.actions;
export default sessionSlice.reducer;
