import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.authChecked = true;
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
      state.authChecked = true;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
