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
  categoryList: {
    key: "",
    value: [],
  },
  keword: {
    key: "",
    value: "",
  },
  //그냥 문자열로하니 안되고 객체안에 넣으니까 되네...뭐지
  totalParams: { value: "" },
};

const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setTotalParams(state) {
      let { page, lastBoardId, categoryList, keword, totalParams } = state;
      totalParams.value =
        page.key +
        page.value +
        lastBoardId.key +
        lastBoardId.value +
        categoryList.key +
        categoryList.value.join(",") +
        keword.key +
        keword.value;
    },
    setPageParams(state, action) {
      let { page } = state;
      const { payload: queryData } = action;

      page.key = queryData[0];
      page.value = queryData[1];
    },
    setLastBoardParams(state, action) {
      let { lastBoardId } = state;
      const { payload: queryData } = action;

      lastBoardId.key = queryData[0];
      lastBoardId.value = queryData[1];
    },
    setCategoryListParams(state, action) {
      let { categoryList } = state;
      const { payload: queryData } = action;

      categoryList.key = queryData[0];
      categoryList.value = queryData[1];
    },
    setKewordParams(state, action) {
      let { keword } = state;
      const { payload: queryData } = action;

      keword.key = queryData[0];
      keword.value = queryData[1];
    },
  },
});

export const {
  setTotalParams,
  setPageParams,
  setLastBoardParams,
  setCategoryListParams,
  setKewordParams,
} = parameterSlice.actions;
export default parameterSlice.reducer;
