import styled from "styled-components";

const Calender = styled.section`
  width: 575px;
  height: 60px;
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  border-radius: 1rem;

  .react-datepicker {
    border-radius: 2em;
  }
  .react-datepicker__header {
    justify-content: center;
    background-color: white;
    border: none;
    border-radius: 2em;
  }

  .react-datepicker__day-name {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};
  }
  .react-datepicker__month {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};
  }

  .react-datepicker__day--selected {
    border-radius: 2rem;
    background: ${({ theme: { colors } }) => {
      return colors.primary;
    }};
  }
`;

const DateCustomHeader = styled.div`
  padding: 20px 50px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: bold;

  .button {
    cursor: pointer;
  }
`;

export { Calender, DateCustomHeader };
