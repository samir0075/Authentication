import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthToken';

const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer
  }
});

export default store;
