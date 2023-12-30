import styled from "styled-components";

const TopButtonBox = styled.div`
  width: 50px;
  height: 50px;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-radius: 50%;
`;
export default function TopButton() {
  return <div>TopButton</div>;
}
