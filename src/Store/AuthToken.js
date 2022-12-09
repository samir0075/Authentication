import { createSlice } from '@reduxjs/toolkit';

const reloadToken = localStorage.getItem('token');
const reloadLoggedIn = localStorage.getItem('isLoggedIn');

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: { token: reloadToken, isLoggedIn: reloadLoggedIn },
  reducers: {
    loggedIn(state, action) {
      const idToken = action.payload;
      state.token = state.token;
      state.isLoggedIn = true;
    },
    loggedOut(state) {
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
    }
  }
});

export const AuthAction = AuthSlice.actions;

export default AuthSlice;
