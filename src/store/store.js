import { configureStore } from "@reduxjs/toolkit";
import searchModalReducer from "@/store/searchModalSlice";
import setParameterReducer from "@/store/parameterSlice";

const store = configureStore({
  reducer: {
    searchModal: searchModalReducer,
    parameter: setParameterReducer,
  },
});

export { store };
