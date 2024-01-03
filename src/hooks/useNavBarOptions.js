import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearchModal,
  setBrowseDetailBucketModal,
} from "@/store/modalsSlice";
import { setKeywordParams } from "@/store/parameterSlice";
import { setDetailButcket } from "@/store/bucketDetailSlice";

import { getData } from "@/services/api";

export default function useNavBarOptions() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const modals = useSelector((state) => {
    return state.modals;
  });
  const params = useSelector((state) => {
    return state.parameter;
  });
  const bucketDetailObj = useSelector((state) => {
    return state.bucketDetail;
  });

  const { browseDetailModal, searchModal } = modals;
  const { keyword } = params;
  const { bucketDetailData } = bucketDetailObj;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [keywordListData, setKeywordListData] = useState([]);
  const [latestDetailCard, setLatestDetailCard] = useState([]);

  const searchTextBar = useRef();
  const mounted04 = useRef(false);

  const OnClickDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchModalControl = () => {
    dispatch(setSearchModal());
  };

  const handleDetailModalState = () => {
    browseDetailModal && dispatch(setBrowseDetailBucketModal());
  };

  const loginCheck = () => {
    const condition = localStorage.getItem("userNickname");
    if (condition) {
      setUserNickName(JSON.parse(condition));
    }
  };

  const handleSignOut = () => {
    //일단은 로컬스토리지에서 지우는걸로 간단설정 보안을 생각하면 보완필요
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNickname");

    setUserNickName("");
  };

  const handleNavigate = (params) => {
    return () => {
      navigate(params);
    };
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const keywordIncludeInspect = (curKeyword) => {
    const latestKeywordList = JSON.parse(localStorage.getItem("keywordList"));

    if (latestKeywordList) {
      //변수에 복사해서 해야함 그대로 건드리면 안되는듯.
      const refine = [...latestKeywordList];
      !refine.some((obj) => obj.value === curKeyword) &&
        refine.push({ id: "id" + curKeyword, value: curKeyword });

      refine.length > 5 && refine.splice(0, 1);
      localStorage.setItem("keywordList", JSON.stringify(refine));
      setKeywordListData(refine);
    } else {
      const firstData = [{ id: "id" + curKeyword, value: curKeyword }];
      localStorage.setItem("keywordList", JSON.stringify(firstData));
      setKeywordListData(firstData);
    }
  };

  const handleLatestKeywordDelete = (curTagNumber) => {
    return () => {
      const latestKeywordList = JSON.parse(localStorage.getItem("keywordList"));
      const refine = [...latestKeywordList];

      refine.splice(curTagNumber, 1);
      localStorage.setItem("keywordList", JSON.stringify(refine));
      setKeywordListData(refine);
    };
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (
        searchValue === "" ||
        searchValue === undefined ||
        searchValue === null
      ) {
        dispatch(setKeywordParams(["", ""]));
      } else {
        dispatch(setKeywordParams(["&keyword=", searchValue]));
      }

      searchValue
        ? navigate(`/search/${searchValue}`)
        : navigate("/search/default");

      searchValue && keywordIncludeInspect(searchValue);

      setSearchValue("");
      searchTextBar.current && searchTextBar.current.focus();
    }
  };

  const handleKeywordClick = (curClickKeyword) => {
    return () => {
      navigate(`/search/${curClickKeyword}`);
      dispatch(setKeywordParams(["&keyword=", curClickKeyword]));
      searchTextBar.current && searchTextBar.current.focus();
    };
  };

  const handleDetailCardReq = (boardNum) => {
    return async () => {
      try {
        const { data } = await getData(`/board/${boardNum}`);

        dispatch(
          setDetailButcket({
            boardId: data.boardId,
            title: data.title,
            categoryList: data.categoryList,
            cardContent: data.content,
            cardImg: data.filepath,
            created: data.deadline.split("-").join("."),
            commentList: data.commentList,
            heartCount: data.heartCount,
            scrapCount: data.scrapCount,
            nickname: data.nickname,
            avatar: data.profileImg,
          })
        );
        setLatestDetailCard(bucketDetailData);

        !browseDetailModal && dispatch(setBrowseDetailBucketModal());

        //console.log(data);
      } catch (error) {
        console.error("Oh~", error);
      }
    };
  };

  const handleHeartAndScrapClick = (type, curBoardId) => {
    return () => {
      switch (type) {
        case "heart":
          console.log("하트 클릭했습니다.");
          break;
        case "scrap":
          console.log("스크랩 클릭했습니다.");
          break;
      }
    };
  };

  useEffect(() => {
    const latestKeywordList = JSON.parse(localStorage.getItem("keywordList"));
    loginCheck();
    latestKeywordList?.length > 0 && setKeywordListData([...latestKeywordList]);
  }, []);

  useEffect(() => {
    if (!mounted04.current) {
      mounted04.current = true;
    } else {
      setLatestDetailCard(bucketDetailData);
    }
  }, [bucketDetailData]);

  return {
    keyword,
    keywordListData,
    searchTextBar,
    searchValue,
    dropdownOpen,
    userNickName,
    searchModal,
    browseDetailModal,
    latestDetailCard,
    setSearchValue,
    handleSearchModalControl,
    handleChange,
    handleSearch,
    handleSignOut,
    handleNavigate,
    handleKeywordClick,
    handleLatestKeywordDelete,
    handleDetailCardReq,
    handleDetailModalState,
    handleHeartAndScrapClick,
    OnClickDropdown,
  };
}
