//썸네일카드는 상호작용할일이 많아서 전역으로 안뺴두면 안될것같음.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumnailCards: {
    data: [],
  },
  homeThumnailCards: {
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
    },
    deleteThumnailCard(state) {
      state.thumnailCards.data = [];
    },
    setHomeTumnailCards(state, action) {
      const { homeThumnailCards } = state;
      const { payload: curHomeThumnailCards } = action;

      curHomeThumnailCards.forEach((obj) => (obj.putOptions = false));
      homeThumnailCards.data = [
        ...homeThumnailCards.data,
        ...curHomeThumnailCards,
      ];
    },
    deleteHomeThumnailCard(state) {
      state.homeThumnailCards.data = [];
    },
    setHomeThumnailPutModalState(state, action) {
      const { homeThumnailCards } = state;
      const { payload: curThumnail } = action;
      let { curThumnailNumber, curPutOptionsState } = curThumnail;

      console.log(curThumnailNumber, curPutOptionsState);
      homeThumnailCards.data.forEach((obj) => {
        obj.putOptions = false;
      });
      homeThumnailCards.data[curThumnailNumber].putOptions = curPutOptionsState;
    },
  },
});

export const {
  setThumnailCard,
  deleteThumnailCard,
  setHomeTumnailCards,
  deleteHomeThumnailCard,
  setHomeThumnailPutModalState,
} = bucketThumnailSlice.actions;
export default bucketThumnailSlice.reducer;
