import { useState } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import {MdModeEdit} from "react-icons/md";
import ProfileEdit from "../../components/ProfileEditModal/ProfileEditModal";

const ProfileImage = styled.div`
    margin: 50px auto 10px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${({ theme: { colors } }) => {
        return colors.primary
    }};
`

const ProfileName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl
    }};
  cursor: pointer;

  & > svg {
    margin-bottom: -2px;
    color: ${({ theme: { colors } }) => {
        return colors.primary
    }};
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }}
`;

const BucketContainer = styled.div`
  height: 60px;
  margin: 30px 300px;
  display: flex;
  justify-content: space-between;

  & > div {
    width: 250px;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: ${({ theme: { colors } }) => {
        return colors.gray["20"]
    }};
    color: ${({ theme: { colors } }) => {
        return colors.gray["80"]
    }};
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};

    & > span {
        color: black;
        font-weight: bold;
      }
    }
  }
`;

const BucketList = styled.div`
    height: 60px;
    margin: auto 20px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px ${({ theme: { colors } }) => {
        return colors.gray["40"]
    }};
`;

const NavStyle = styled(NavLink)`
width: 120px;
text-align: center;

    &:hover {
        color: black;
        font-weight: bold;
    }
    &.active {
        color: black;
        font-weight: bold;
    }
`;

const BucketListContainer = styled.div`
    min-height: 300px;
    display: flex;
    margin: 0 20px;
    align-items: center;
    justify-content: center;
    color: ${({ theme: { colors } }) => {
        return colors.gray["40"]
    }};
`;

export default function TestMyProfile(){
    const [openModal, setOpenModal] = useState(false);

    return(
        <>
            <ProfileImage />
            <ProfileName  onClick={() => setOpenModal(true)}>
                    미도 <MdModeEdit/>
            </ProfileName>
            {openModal && <ProfileEdit setOpenModal={setOpenModal} />}
            <BucketContainer>
                <div>
                    달성 완료한 버킷
                    <span>0</span>
                </div>
                <div>
                    진행 중인 버킷
                    <span>0</span>
                </div>
            </BucketContainer>
            <BucketList>
                <NavStyle to="/profile">
                    마이 버킷
                    <span>0</span>
                </NavStyle>
                <NavStyle to="/profile/scrap">
                    스크랩한 버킷
                    <span>0</span>
                </NavStyle>
            </BucketList>
            <BucketListContainer>
                작성한 버킷 리스트가 없습니다.
            </BucketListContainer>
        </>
    )
}