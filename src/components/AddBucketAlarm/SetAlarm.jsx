import styled from "styled-components";

const SetAlarmTitle = styled.div`
    margin-top: 20px;
    color: black;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    font-weight: bold;
`;

<<<<<<< HEAD
const AlarmInput = styled.input`
=======
const TitleInput = styled.input`
>>>>>>> fdeef096d1790f0eeac7f3e333fa89fa31fe236e
    width: 400px;
    height: 40px;
    margin: 10px 0px;
    padding: 15px;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};
    border: 1px solid  ${({ theme: { colors } }) => {
        return colors.gray["40"];
    }};;
    border-radius: 1em;
`;

export default function SetAlarm(){
    return (
        <>
            <SetAlarmTitle>알림 설정</SetAlarmTitle>
<<<<<<< HEAD
            <AlarmInput />
=======
>>>>>>> fdeef096d1790f0eeac7f3e333fa89fa31fe236e
        </>
    )
};
