import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  educatorInfo: null
};

const educatorSlice = createSlice({
  name: "educator",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.educatorInfo = action.payload;
    },
    educatorLogout: (state) => {
      state.educatorInfo = null;
    },
    clearEducator: (state) => {
      state.educatorInfo = null;
    },
  },
});

export const { setCredentials, educatorLogout, clearEducator } = educatorSlice.actions;

export default educatorSlice.reducer;
