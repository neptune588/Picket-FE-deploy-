import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModal: false,
  detailModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setSearchModal(state) {
      state.searchModal = !state.searchModal;
    },
    setDetailBucketModal(state) {
      state.detailModal = !state.detailModal;
    },
  },
});

export const { setSearchModal, setDetailBucketModal } = modalsSlice.actions;
export default modalsSlice.reducer;
