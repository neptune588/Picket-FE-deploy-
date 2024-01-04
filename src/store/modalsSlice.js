import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModal: false,
  browseDetailModal: false,
  homeDetailModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setSearchModal(state) {
      state.searchModal = !state.searchModal;
    },
    setBrowseDetailBucketModal(state) {
      state.browseDetailModal = !state.browseDetailModal;
    },
  },
});

export const { setSearchModal, setBrowseDetailBucketModal } =
  modalsSlice.actions;
export default modalsSlice.reducer;
