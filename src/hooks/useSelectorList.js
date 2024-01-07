import { useSelector } from "react-redux";

export default function useSelectorList() {
  const homeParams = useSelector((state) => {
    return state.homeParameter;
  });
  const params = useSelector((state) => {
    return state.parameter;
  });
  const scrapParams = useSelector((state) => {
    return state.scrapParameter;
  });
  const moadals = useSelector((state) => {
    return state.modals;
  });
  const cards = useSelector((state) => {
    return state.bucketThumnail;
  });
  const bucketDetailObj = useSelector((state) => {
    return state.bucketDetail;
  });

  const { detailModal, searchModal, profileEditModal } = moadals;
  const { page: homePage, totalParams: totalHomeParams } = homeParams;
  const { page, keyword, categoryList, prevParams, totalParams } = params;
  const { page: scrapPage, totalParams: totalScrapParams } = scrapParams;
  const { homeThumnailCards, thumnailCards } = cards;
  const { bucketDetailData, curScrollLocation } = bucketDetailObj;

  return {
    detailModal,
    searchModal,
    profileEditModal,
    bucketDetailData,
    curScrollLocation,
    homePage,
    totalHomeParams,
    scrapPage,
    totalScrapParams,
    page,
    keyword,
    categoryList,
    prevParams,
    totalParams,
    homeThumnailCards,
    thumnailCards,
  };
}
