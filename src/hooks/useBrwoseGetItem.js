import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import {
  setTotalParams,
  setPrevParams,
  setPageParams,
  setCategoryListParams,
  setLastBoardParams,
} from "@/store/parameterSlice";
import { getData } from "@/services/api";

import { categoriesData } from "@/pages/Browse/categoryData";

export default function useBrwoseGetItem() {
  const dispatch = useDispatch();
  const { keword: curKeword } = useParams();

  const params = useSelector((state) => {
    return state.parameter;
  });

  const { page, keword, categoryList, prevParams, totalParams } = params;

  const [dummy, setDummy] = useState([
    { id: "sklt01" },
    { id: "sklt02" },
    { id: "sklt03" },
    { id: "sklt04" },
    { id: "sklt05" },
    { id: "sklt06" },
    { id: "sklt07" },
    { id: "sklt08" },
  ]);
  //데이터
  const [cardData, setCardData] = useState([]);
  //active관련
  const [categoryData, setCategoryData] = useState([...categoriesData]);
  //마지막 페이지인가?
  const [lastPage, setLastPage] = useState(false);
  //데이터 불러오는동안 스켈레톤 띄우기
  const [isLoading, setIsLoading] = useState(true);
  //첫 렌더링시 강제실행 막기
  const mounted01 = useRef(false);
  const mounted02 = useRef(false);
  //렌더링할때 화면이 비게되면 옵저버가 관측이 되어서 스크롤된것처럼 되기 때문에
  //그것을 위한 더미 옵저버
  const dummyObserver = useRef();
  //트리거가 발동했을때 초기치로 리셋
  const page_board_data_reset = () => {
    //value 즉 페이지숫자는 스크롤 제외하고 트리거 발동때마다 리셋되어야하니까 0으로 주기
    dispatch(setPageParams([`${page.key}`, 0]));
    dispatch(setLastBoardParams(["", ""]));

    setIsLoading(true);
    setLastPage(false);

    setCardData([]);
  };

  const { ref: observerRef } = useInView({
    threshold: 0,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        dispatch(setPageParams([`${page.key}`, `${parseInt(page.value) + 1}`]));
        dispatch(
          setLastBoardParams([
            "&lastBoardId=",
            `${cardData[cardData.length - 1].boardId}`,
          ])
        );
        dispatch(setTotalParams());
      }
    },
  });

  //전체 카테고리로 활성화
  const activeAllCategory = () => {
    return categoryData.map((data, idx) => {
      return {
        ...data,
        activeState: idx === 0 ? true : false,
      };
    });
  };
  //클릭한 카테고리 활성화, 다른카테고리를누르면 전체카테고리는 비활성화되어야한다.
  const activeCategory = (nowNumber) => {
    return categoryData.map((data, idx) => {
      if (idx === 0) {
        return { ...data, activeState: false };
      } else {
        return {
          ...data,
          activeState: idx === nowNumber ? !data.activeState : data.activeState,
        };
      }
    });
  };
  //중첩된 리스트이면 제거, 없는 리스트만 추가
  const categoryQueryCheck = (query) => {
    const inspect = [...categoryList.value];
    inspect.indexOf(query) === -1
      ? inspect.push(query)
      : inspect.splice(inspect.indexOf(query), 1);

    return inspect;
  };

  const handleCategoryClick = (activeNum, curQuery) => {
    return () => {
      if (activeNum === 0) {
        setCategoryData(activeAllCategory());

        if (prevParams.value === totalParams.value) {
          return;
        } else {
          page_board_data_reset();

          dispatch(setCategoryListParams(["", []]));
          dispatch(setTotalParams());
          //파람바껴서 데이터 불러오고 한번 데이터 뿌려준뒤에 prev param갱신 -> 데이터는 보존 된채로 클릭만 막아진다.
          dispatch(setPrevParams());
        }

        console.log(cardData.length);
      } else {
        //바꾼배열 반환받아서 검사
        const condition = activeCategory(activeNum).every((data) => {
          return data.activeState === false;
        });

        if (condition) {
          setCategoryData(activeAllCategory());
          page_board_data_reset();

          dispatch(setCategoryListParams(["", []]));
          dispatch(setTotalParams());
        } else {
          setCategoryData(activeCategory(activeNum));
          page_board_data_reset();

          dispatch(
            setCategoryListParams([
              "&categoryList=",
              categoryQueryCheck(curQuery),
            ])
          );
          dispatch(setTotalParams());
        }
      }
    };
  };

  const cardReq = async (query = "") => {
    try {
      setIsLoading(true);
      const { data } = await getData(`/board/list/search?${query}`);

      console.log(data);
      if (data.last) {
        //마지막페이지 검증로직
        //라스트페이지면 스켈레톤x axios호출x
        setLastPage(true);
        setCardData((prev) => [...prev, ...data.content]);

        setIsLoading(false);

        return;
      } else {
        setLastPage(false);
        setCardData((prev) => [...prev, ...data.content]);

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Oh~ :", error);
    }
  };

  //시작시 리스트 불러옴
  useEffect(() => {
    page_board_data_reset();
    //비워줘야지 다른 페이지갔다 다시 와서 카테구리 누를때 []이 디폴트인상태에서 됨. 즉 처음페이지에 온것처럼 됨.
    dispatch(setCategoryListParams(["", []]));
    cardReq(`${page.key + 0}`);
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (!mounted02.current) {
      mounted02.current = true;
    } else {
      page_board_data_reset();
      dispatch(setCategoryListParams(["", []]));

      dispatch(setTotalParams());
    }
  }, [curKeword]);

  useEffect(() => {
    //데이터 없으면 옵저버 못보게 더미 on 데이터 있으면 off
    if (cardData.length > 0) {
      dummyObserver.current.style.display = "none";
    } else {
      dummyObserver.current.style.display = "block";
    }
  }, [cardData]);

  //마지막 경우의수, 전체 카테고리를 두번눌렀을때.. 두번누르면 비어있는상태에서 또 비어지는거ㅗ니까 변화가없어서
  //실행이안된다.. 흠
  useEffect(() => {
    if (!mounted01.current) {
      mounted01.current = true;
    } else {
      cardReq(totalParams.value);
    }
  }, [totalParams.value]);

  return {
    dummy,
    categoryData,
    cardData,
    isLoading,
    dummyObserver,
    observerRef,
    handleCategoryClick,
  };
}

//느낀것

//api관련 동작 중 쿼리스트링 같은 정확하게 전달해야하는 정보는
//비동기 방식이 아닌 동기 방식으로 적용하는게 좋을것같다.
//setState와 디펜던시로 해결하기엔 너무 복잡해져서 리덕스툴킷의 reducer set함수를 통해 동기적으로 작동하고
//데이터(쿼리)를 덮어씌우는 방식으로 작업했는데, 덕분에 구현이 된것같다.
