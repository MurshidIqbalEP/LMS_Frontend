import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userInfo: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setCredentials, userLogout, clearUser } = authSlice.actions;

export default authSlice.reducer;
