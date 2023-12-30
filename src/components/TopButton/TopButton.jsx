import styled from "styled-components";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopButtonBox = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-radius: 50%;
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;
  > svg {
    color: #464645;
  }
`;

/* const Arrow = styled(faArrowUp)`
  width: 10px;
  height: 10px;
`; */

export default function TopButton({ onClick }) {
  return (
    <TopButtonBox onClick={onClick}>
      <FontAwesomeIcon icon={faArrowUp} />
    </TopButtonBox>
  );
}
