import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log('user:', state.user)
    },
  },
});

export const { Login } = authSlice.actions;

export default authSlice.reducer;
