import styled from "styled-components";

import AddBucketTitle from "../../components/AddBucket/AddBucketTitle";
import AddBucketAlarm from "../../components/AddBucketAlarm/AddBucketAlarm";

const AddWrapper = styled.div`
    display: flex;
`;

export default function TestAddBucketAlarm(){
    return(
        <>
            <AddBucketTitle/>
            <AddWrapper>
                <AddBucketAlarm />
            </AddWrapper>
        </>
    )
}