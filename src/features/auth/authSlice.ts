import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { login, updateProfile } from "../../api/hrmApi";
import { clearSession, loadSession, saveSession } from "../../utils/storage";
import type { AuthState, RoleUser } from "../../types";

interface LoginCredentials {
  email: string;
  password: string;
}
interface LoginPayload {
  token: string;
  user: RoleUser;
}
interface ProfilePayload {
  username: string;
  email: string;
  password?: string;
}

export const loginUser = createAsyncThunk<
  LoginPayload,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials) => {
  const response = await login(credentials);
  const payload = response.data.data as LoginPayload;
  saveSession(payload.token, payload.user);
  return payload;
});

export const saveProfile = createAsyncThunk<
  RoleUser,
  ProfilePayload,
  { rejectValue: string }
>("auth/saveProfile", async (payload) => {
  const response = await updateProfile(payload);
  const user = response.data.data as RoleUser;
  const current = loadSession();
  if (current.token) saveSession(current.token, user);
  return user;
});

const initial = loadSession();

const initialState: AuthState = {
  token: initial.token,
  user: initial.user,
  ready: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearSession();
      state.token = null;
      state.user = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.ready = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Unable to sign in";
        state.ready = true;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
