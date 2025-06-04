import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.adminInfo = action.payload;
    },
    adminLogout: (state) => {
      state.adminInfo = null;
    },
    clearAdmin: (state) => {
      state.adminInfo = null;
    },
  },
});

export const { setCredentials, adminLogout, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
