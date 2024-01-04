//썸네일카드는 상호작용할일이 많아서 전역으로 안뺴두면 안될것같음.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumnailCards: {
    data: [],
  },
};

const bucketThumnailSlice = createSlice({
  name: "bucketThumnail",
  initialState,
  reducers: {
    setThumnailCard(state, action) {
      const { thumnailCards } = state;
      const { payload: curThumnailCards } = action;

      thumnailCards.data = [...thumnailCards.data, ...curThumnailCards];
      console.log(thumnailCards.data);
    },
    deleteThumnailCard(state) {
      state.thumnailCards.data = [];
    },
  },
});

export const { setThumnailCard, deleteThumnailCard } =
  bucketThumnailSlice.actions;
export default bucketThumnailSlice.reducer;
