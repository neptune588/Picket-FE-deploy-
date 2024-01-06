import styled from "styled-components";

import NavBar from "@/components/NavBar";
import LocationBar from "@/components/LocationBar/LocationBar";
import AddImg from "@/components/AddBucketImage/AddImg";

const AddWrapper = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 70px - 70px);
`;

export default function TestAddBucket() {
  return (
    <>
      <NavBar />
      <LocationBar content={"버킷 추가"} />
      <AddWrapper>
        <AddImg />
      </AddWrapper>
    </>
  );
}
