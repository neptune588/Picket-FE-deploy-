import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "@/store/modalsSlice";
import setParameterReducer from "@/store/parameterSlice";
import bucketDetailReducer from "@/store/bucketDetailSlice";
import bucketThumnailReducer from "@/store/bucketThumnailSlice";

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    parameter: setParameterReducer,
    bucketDetail: bucketDetailReducer,
    bucketThumnail: bucketThumnailReducer,
  },
});

export { store };
