import styled from "styled-components";

import Categories from "../../components/Categories/Categories";
import AddBucketIcon from "../../components/AddBucket/AddBucketIcon";

const Empty = styled.div`
  margin: 40px;
`;

const CateBox = styled.div`
  display: flex;
  justify-content: center;
`;

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

export default function TestMain() {
  return (
    <>
      <Empty />
      <CateBox>
        <Categories />
      </CateBox>
      <MainBucket src="/images/main_bucket.png" />
      <AddBucketBox>
        <AddBucketIcon />
      </AddBucketBox>
    </>
  );
}
