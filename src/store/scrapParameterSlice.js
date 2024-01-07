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
  totalParams: { value: "" },
};

const scrapParameterSlice = createSlice({
  name: "scrapParameter",
  initialState,
  reducers: {
    setTotalScrapParams(state) {
      const { page, lastBoardId, totalParams } = state;
      totalParams.value =
        page.key + page.value + lastBoardId.key + lastBoardId.value;
    },
    setPageScrapParams(state, action) {
      const { page } = state;
      const { payload: queryData } = action;

      page.key = queryData[0];
      page.value = queryData[1];
    },
    setLastBoardScrapParams(state, action) {
      const { lastBoardId } = state;
      const { payload: queryData } = action;

      lastBoardId.key = queryData[0];
      lastBoardId.value = queryData[1];
    },
  },
});

export const {
  setTotalScrapParams,
  setPageScrapParams,
  setLastBoardScrapParams,
} = scrapParameterSlice.actions;
export default scrapParameterSlice.reducer;
