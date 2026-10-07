import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ToastState } from "../../types";

interface UiState {
  sidebarOpen: boolean;
  toast: ToastState | null;
}

const initialState: UiState = {
  sidebarOpen: false,
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    showToast(state, action: PayloadAction<ToastState>) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { setSidebarOpen, toggleSidebar, showToast, clearToast } =
  uiSlice.actions;
export default uiSlice.reducer;
