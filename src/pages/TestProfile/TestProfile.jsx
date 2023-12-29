import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import {MdModeEdit} from "react-icons/md";
import ProfileEdit from "../../components/ProfileEditModal/ProfileEditModal";
import HomeThumnailCard from "../../components/HomeThumnailCard";
import { getData } from "@/services/api";

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
    margin: 20px;
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
  width: 600px;
  height: 60px;
  margin: 0 auto;
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

const BucketWrapper = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  text-align: center;
`

export default function TestMyProfile(){
    const [openModal, setOpenModal] = useState(false);
    const [bucketList, setBucketList] = useState([]);

    const init = async() => {    
        let random = JSON.parse(localStorage.getItem("userInfo"));
        const {grantType, accessToken} = random;
        const token = `Bearer ${accessToken}`

        const response = await getData("board/myposts", {
            headers: {
                Authorization: token
            }
        },
        // { 
        //     withCredentials: true 
        // }
        );
        console.log(response);
        if(response.data) {
            setBucketList(response.data);
        }
    }

    const items = bucketList.map((data, idx) => {
        return <HomeThumnailCard key={idx} props={data} />
    })

    useEffect(() => {
        init();
    }, []);

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
                    <span>{items.length}</span>
                </NavStyle>
                <NavStyle to="/profile/scrap">
                    스크랩한 버킷
                    <span>0</span>
                </NavStyle>
            </BucketList>
            <BucketWrapper>
                {items.length > 0 ?
                    items
                    : <BucketListContainer> 작성한 버킷 리스트가 없습니다. </BucketListContainer>
                }
            </BucketWrapper>       
        </>
    )
}