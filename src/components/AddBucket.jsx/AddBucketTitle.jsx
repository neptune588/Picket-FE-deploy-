import styled from "styled-components";

const AddBucketTitleBar = styled.div`
    height: 48px;
    margin: 0px 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    border-bottom: solid 1px ${({ theme: { colors } }) => {
        return colors.gray["40"]
    }};
`

export default function AddBucketTitle(){
    return (
        <AddBucketTitleBar> &lt; 버킷추가 </AddBucketTitleBar>
    )
};