import styled from "styled-components";

const AddBucketTitleBar = styled.div`
    height: 48px;
    margin: 0px 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    text-indent: 1em;
    border-bottom: solid 1px ${({ theme: { colors } }) => {
        return colors.gray["40"]
    }};
`

export default function AddBucketTitle(){
    return (
        <AddBucketTitleBar>&lt; 버킷추가 </AddBucketTitleBar>
    )
};