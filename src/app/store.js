import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/Orders";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});
