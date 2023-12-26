import styled from "styled-components";

import AddBucketTitle from "../../components/AddBucket/AddBucketTitle";
import AddImg from "../../components/AddBucketImage/AddImg";

const AddWrapper = styled.div`
    display: flex;
`;


export default function TestAddBucket(){
    return(
        <>
            <AddBucketTitle/>
            <AddWrapper>
                <AddImg />
            </AddWrapper>
        </>
    )
}