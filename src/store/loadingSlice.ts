import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  count: number;
}

const initialState: LoadingState = { count: 0 };

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state) {
      state.count += 1;
    },
    finishLoading(state) {
      state.count = Math.max(0, state.count - 1);
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
