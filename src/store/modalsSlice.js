import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModal: false,
  detailModal: false,
  profileEditModal: false,
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
    setProfileEditModal(state) {
      state.profileEditModal = !state.profileEditModal;
    },
  },
});

export const { setSearchModal, setDetailBucketModal, setProfileEditModal } =
  modalsSlice.actions;
export default modalsSlice.reducer;
