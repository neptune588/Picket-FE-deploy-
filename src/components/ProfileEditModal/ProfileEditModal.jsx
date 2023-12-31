import { useState } from "react";
import { postData, patchData } from "@/services/api";

import styled from "styled-components";

import MyProfileImg from "./ProfileImg";

const Modal = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    background: rgba(0, 0, 0, 0.5);
    top: 65px;
    position: fixed;
`;

const EditBox = styled.div`
    width: 500px;
    height: 500px;
    margin: 20px auto;
    background: white;
    border-radius: 2em;
`;

const Title = styled.div`
    text-align: center;
    padding-top: 30px;
    font-weight: bold;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
`;

const NicknameConfirm = styled.input`
    display: block;
    width: 380px;
    height: 55px;
    margin: 20px auto;
    padding: 0 15px;
    border-radius: 1em;
    font-size: font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    border: #444 1px solid;
`;

const ButtonBox = styled.div`
    width: 380px;
    margin: 20px auto;
    bottom: 0;
    text-align: center;
    background: white;
    justify-content: space-between;
`;

const CancelBtn = styled.button`
    width: 120px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    background: white;
    color: black;
    text-align: center;
    border: 1px solid ${({ theme: { colors } }) => {
        return colors.primary
    }};
    border-radius: 1em;
`;

const DoneBtn = styled.button`
    width: 120px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    justify-content: space-between;
    background: ${({ theme: { colors } }) => {
        return colors.primary
    }};
    color: white;
    text-align: center;
    border: none;
    border-radius: 1em;
`;


export default function ProfileEdit ({setOpenModal}){
    const [file, setFile] = useState(null);
    const [context, setContext] = useState({ nickname: '' });

    const updateContext = (key, value) => {
        setContext(prev => ({ ...prev, [key]: value }));
    }

    const validateNickname = async (context, token) => {
        const validate = await postData('/member/profile/check-nickname', context, {
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `${token}`,
            }
        });

        return validate;
    }

    const saveHandler = async() => {
        let random = JSON.parse(localStorage.getItem("userInfo"));
        const { accessToken } = random;
        const token = `Bearer ${accessToken}`;

        const json = JSON.stringify(context);
        const validate = await validateNickname(json, token);

        const formData = new FormData();
    
        formData.append("patchMemberRequestDTO", new Blob([json], { type: 'application/json' }));
        formData.append("file", file);

        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `${token}`,
            }
        }

        const response = await patchData("/member/profile", formData, headers);
        console.log(response);
    }

    return (
    <Modal>
        <EditBox>
            <Title>프로필 편집</Title>
            <MyProfileImg setFile={setFile}/>
            <NicknameConfirm 
                placeholder={'닉네임을 입력하세요'}
                value={context.nickname} 
                onChange={(e) => { updateContext("nickname", e.target.value)}}
            />
            <ButtonBox>
                <CancelBtn onClick={() => setOpenModal(false)}>취소</CancelBtn>
                <DoneBtn onClick={() => {saveHandler; setOpenModal(false)}}>확인</DoneBtn>
            </ButtonBox>
        </EditBox>
    </Modal>
    )
}