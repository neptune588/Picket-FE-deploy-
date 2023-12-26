import styled from "styled-components";

import AlarmTitle from "../../components/Alarm/AlarmTitle";


const AlarmContent = styled.div`
    margin: 20px 30%;
    padding: 8px;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};

    & > li::before {
        content: "⚫︎";
        margin: 2px;
        color: ${({ theme: { colors } }) => {
            return colors.primary
        }};
        font-size: ${({ theme: { typo } }) => {
            return typo.size.xxl
        }};
        display: inline-block;
        vertical-align: middle;
    }
`;

export default function TestAlarm(){
    return(
        <>
            <AlarmTitle />
            <AlarmContent>
                <li>`$버킷제목` 버킷 리스트 D-DAY입니다.</li>
                <li>`$버킷제목` 버킷 리스트가 3일 남았습니다.</li>
                <li>`$사용자이름`님이 나의 `$버킷제목`을 좋아합니다.</li>
            </AlarmContent>
        </>
    )
}