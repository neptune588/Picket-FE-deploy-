import styled from "styled-components";

const Modal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 65px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const EditBox = styled.div`
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background: white;
    border-radius: 2em;
    z-index: 999;

    & > li {
        height: calc(200px / 4);
        text-align: center;
        display: flex;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;


export default function BucketHandle ({setOpenModal}){
    return (
    <Modal>
        <EditBox>
            <li onClick={() => setOpenModal(false)}>프로필 수정</li>
            <li onClick={() => setOpenModal(false)}>프로필 달성</li>
            <li onClick={() => setOpenModal(false)}>프로필 보류</li>
            <li onClick={() => setOpenModal(false)}>프로필 삭제</li>
        </EditBox>
    </Modal>
    )
}