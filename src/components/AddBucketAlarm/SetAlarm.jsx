import { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale/ko";

import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Calender, DateCustomHeader } from "./calender_style";
import ColoredBell from "@/assets/icons/coloredbell.svg?react";

const SetAlarmTitle = styled.div`
  color: black;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin-bottom: 30px;
`;

const InputBtn = styled.div`
  width: 575px;
  display: flex;
  align-items: center;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  cursor: pointer;
  > svg {
    margin-left: 20px;
  }
`;

export default function SetAlarm({ context, updateContext }) {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <InputBtn onClick={onClick} ref={ref}>
      {value}
      <ColoredBell />
    </InputBtn>
  ));

  const years = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => i + 2000
  );
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  return (
    <>
      <SetAlarmTitle>알림 설정</SetAlarmTitle>
      <Calender>
        <ReactDatePicker
          locale={ko}
          dateFormat="yyyy.MM.dd"
          selected={context.deadline}
          value={context.deadline}
          onChange={(date) => {
            updateContext("deadline", date);
          }}
          customInput={<CustomInput />}
          showPopperArrow={false}
          withPortal
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <DateCustomHeader>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <div>
                <span>{date.getFullYear()}. </span>
                <span>{months[date.getMonth()]}</span>
              </div>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </DateCustomHeader>
          )}
        />
      </Calender>
    </>
  );
}
