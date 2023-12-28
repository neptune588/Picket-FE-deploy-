import { useState, useEffect } from "react";

import styled from "styled-components";

import Categories from "../../components/Categories/Categories";
import AddBucketIcon from "../../components/AddBucket/AddBucketIcon";
import HomeThumnailCard from "../../components/HomeThumnailCard";
import { getData } from "@/services/api";

const Empty = styled.div`
  margin: 40px;
`;

const CateBox = styled.div`
  display: flex;
  justify-content: center;
`;

const BucketWrapper = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  text-align: center;
`

const MainBucket = styled.img`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBucketBox = styled.div`
    height: 160px;
    display: flex;
`;

export default function TestMain(){
    const [bucketList, setBucketList] = useState([]);

    const init = async() => {    
        let random = JSON.parse(localStorage.getItem("userInfo"));
        const {grantType, accessToken} = random;
        const token = `Bearer ${accessToken}`;

        const response = await getData("board/myposts", {
            headers: {
                Authorization: token
            }
        });

        console.log(response);
        if(response.data) {
            setBucketList(response.data);
        }
    }

    const items = bucketList.map((data, idx) => {
        return <HomeThumnailCard />
    })

    useEffect(() => {
        init();
    }, []);

    return(
        <>
            <Empty/>
            <CateBox>
                <Categories />
            </CateBox>
            <BucketWrapper>
                {items.length > 0 ? items : <MainBucket src="/images/main_bucket.png" />}
            </BucketWrapper>
            <AddBucketBox>
                <AddBucketIcon />
            </AddBucketBox>
        </>
    )
}
