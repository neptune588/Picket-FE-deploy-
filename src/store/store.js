import { configureStore } from "@reduxjs/toolkit";
import searchModalReducer from "@/store/searchModalSlice";

const store = configureStore({
  reducer: {
    searchModal: searchModalReducer,
  },
});

export { store };
