import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModalState: false,
};

const searchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    setBoolean(state) {
      state.currentModalState = !state.currentModalState;
    },
  },
});

export const { setBoolean } = searchModalSlice.actions;
export default searchModalSlice.reducer;
