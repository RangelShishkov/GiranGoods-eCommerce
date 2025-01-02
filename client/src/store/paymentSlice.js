import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    success: false,
  },
  reducers: {
    setPaymentSuccess: (state, action) => {
      state.success = action.payload;
      localStorage.setItem("paymentSuccess", action.payload);
    },
    clearPaymentSuccess: (state) => {
      state.success = false;
      localStorage.removeItem("paymentSuccess");
    },
    setPaymentAttempt: (state, action) => {
      state.attempt = action.payload;
    },
    clearPaymentAttempt: (state) => {
      state.success = false;
      localStorage.removeItem("paymentAttempt");
    },
  },
});

export const {
  setPaymentSuccess,
  clearPaymentSuccess,
  setPaymentAttempt,
  clearPaymentAttempt,
} = paymentSlice.actions;
export default paymentSlice.reducer;
