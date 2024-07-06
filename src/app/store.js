import { configureStore } from "@reduxjs/toolkit";
import CoinSlice from "../Feature/coins/CoinSlice";

export const store = configureStore({
  reducer: {
    coin: CoinSlice,
  },
});
