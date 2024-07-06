import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import coinService from "./CoinService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  coins: null,
};

export const getCoins = createAsyncThunk(
  "Coins/getCoins",
  async (_, thunkAPI) => {
    try {
      return await coinService.getCoins();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetState = createAction("resetAll");

const coinSlice = createSlice({
  name: "Coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.coins = action.payload;
      })
      .addCase(getCoins.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch coins";
      })
      .addCase(resetState, () => initialState);
  },
});

export default coinSlice.reducer;
