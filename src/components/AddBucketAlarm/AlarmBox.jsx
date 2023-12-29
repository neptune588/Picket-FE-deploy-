import styled from "styled-components";
import SetAlarm from "./SetAlarm";
import SetPublic from "./SetPublic";


const Alarms = styled.div`
    width: 400px;
    height: 400px;
    margin: 20px;
    background: white;
    color: ${({ theme: { colors } }) => {
        return colors.gray["80"]
    }};
`;


export default function AlarmBox({ context, updateContext }){
    return (
        <Alarms>
            <SetAlarm context={context} updateContext={updateContext} />
        </Alarms>
    )
};