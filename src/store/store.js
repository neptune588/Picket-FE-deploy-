import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "@/store/modalsSlice";
import setParameterReducer from "@/store/parameterSlice";
import bucketDetailReducer from "@/store/bucketDetailSlice";

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    parameter: setParameterReducer,
    bucketDetail: bucketDetailReducer,
  },
});

export { store };
