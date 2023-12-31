import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: {
    key: "?page=",
    value: "",
  },
  category: {
    key: "",
    value: [],
  },
  keword: {
    key: "",
    value: "",
  },
  lastBoardId: {
    key: "",
    value: "",
  },
  totalParmas: "",
};

const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setParams(state, action) {
      const { page, category, keword, lastBoardId, totalParmas } = state;
      const { payload: queryData } = action;

      /* const condition = totalKey.includes(queryData.queryKey);
      !condition && state.push(queryData.queryKey); */
    },
    removeParams(state, action) {
      const { totalKey } = state;
      const { payload: queryData } = action;
    },
  },
});

export const { setParams, removeParams } = parameterSlice.actions;
export default parameterSlice.reducer;
