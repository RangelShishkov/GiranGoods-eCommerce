import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import paymentReducer from "./paymentSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
  },
})