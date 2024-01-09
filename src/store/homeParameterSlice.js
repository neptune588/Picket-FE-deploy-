import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page: {
    key: "page=",
    value: 0,
  },
  lastBoardId: {
    key: "",
    value: "",
  },
  prevParams: { value: "" },
  totalParams: { value: "" },
};

const homeParameterSlice = createSlice({
  name: "homeParameter",
  initialState,
  reducers: {
    setTotalHomeParams(state) {
      const { page, lastBoardId, totalParams } = state;
      totalParams.value =
        page.key + page.value + lastBoardId.key + lastBoardId.value;
    },
    setPrevHomeParams(state) {
      state.prevParams.value = state.totalParams.value;
    },
    setPageHomeParams(state, action) {
      const { page } = state;
      const { payload: queryData } = action;

      page.key = queryData[0];
      page.value = queryData[1];
    },
    setLastBoardHomeParams(state, action) {
      const { lastBoardId } = state;
      const { payload: queryData } = action;

      lastBoardId.key = queryData[0];
      lastBoardId.value = queryData[1];
      //console.log(lastBoardId.key, lastBoardId.value);
    },
  },
});

export const {
  setTotalHomeParams,
  setPrevHomeParams,
  setPageHomeParams,
  setLastBoardHomeParams,
} = homeParameterSlice.actions;
export default homeParameterSlice.reducer;
