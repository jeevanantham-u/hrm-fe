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
  },
});

export const { setSidebarOpen, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
