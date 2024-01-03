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
  keyword: {
    key: "",
    value: "",
  },
  prevParams: { value: "" },
  //그냥 문자열로하니 안되고 객체안에 넣으니까 되네...뭐지
  totalParams: { value: "" },
};

const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setTotalParams(state) {
      let { page, lastBoardId, categoryList, keyword, totalParams } = state;
      totalParams.value =
        page.key +
        page.value +
        lastBoardId.key +
        lastBoardId.value +
        categoryList.key +
        categoryList.value.join(",") +
        keyword.key +
        keyword.value;
      console.log("totalParam은", totalParams.value);
    },
    setPrevParams(state) {
      state.prevParams.value = state.totalParams.value;
      console.log("prevParam이 갱신되었습니다.");
    },
    setPageParams(state, action) {
      const { page } = state;
      const { payload: queryData } = action;

      page.key = queryData[0];
      page.value = queryData[1];
    },
    setLastBoardParams(state, action) {
      const { lastBoardId } = state;
      const { payload: queryData } = action;

      lastBoardId.key = queryData[0];
      lastBoardId.value = queryData[1];
    },
    setCategoryListParams(state, action) {
      const { categoryList } = state;
      const { payload: queryData } = action;

      categoryList.key = queryData[0];
      categoryList.value = queryData[1];
    },
    setKeywordParams(state, action) {
      const { keyword } = state;
      const { payload: queryData } = action;

      keyword.key = queryData[0];
      keyword.value = queryData[1];
    },
  },
});

export const {
  setTotalParams,
  setPrevParams,
  setPageParams,
  setLastBoardParams,
  setCategoryListParams,
  setKeywordParams,
} = parameterSlice.actions;
export default parameterSlice.reducer;
