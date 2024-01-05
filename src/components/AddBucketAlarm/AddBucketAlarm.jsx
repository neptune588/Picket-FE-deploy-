import styled from "styled-components";
import UploadBox from "../UploadBox/UploadBox";
import SetAlarm from "./SetAlarm";
import SetPublic from "./SetPublic";
import MovementBtn from "./MovementBtn";

const Container = styled.div`
  margin: 0 auto;
`;

const AddAlarmWrapper = styled.div`
  display: flex;
  width: 1135px;
  margin: 0 auto;
`;

const AlarmBox = styled.div`
  width: 400px;
  height: 400px;
  background: white;
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
`;

export default function AddBucketAlarm() {
  return (
    <Container>
      <AddAlarmWrapper>
        <UploadBox />
        <AlarmBox>
          <SetAlarm />
          <SetPublic />
        </AlarmBox>
      </AddAlarmWrapper>
      <MovementBtn />
    </Container>
  );
}
