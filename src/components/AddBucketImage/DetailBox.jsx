import styled from "styled-components";

import Tags from "./Tags";
import Title from "./Title";
import Content from "./Content";

const Details = styled.div`
    width: 400px;
    height: 400px;
    margin: 20px;
    background: white;
    color: ${({ theme: { colors } }) => {
        return colors.gray["80"]
    }};
`;

export default function DetailBox({ context, updateContext }){
    return(
        <Details>
            <Tags context={context} updateContext={updateContext} />
            <Title context={context} updateContext={updateContext} />
            <Content context={context} updateContext={updateContext} />
        </Details>
    )
}