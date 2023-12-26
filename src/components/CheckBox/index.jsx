import {
  Wrapper,
  CheckLabel,
  CheckInput,
  IconBox,
} from "@/components/CheckBox/style";

import Icons from "@/assets/icons/check.svg?react";

export default function CheckBox({
  inputId,
  inputType,
  isChecked,
  onChange,
  ChkContent,
}) {
  return (
    <Wrapper>
      <CheckInput
        id={inputId}
        type={inputType}
        checked={isChecked}
        onChange={onChange}
      />
      <CheckLabel htmlFor={inputId}>
        <IconBox>
          <Icons />
        </IconBox>
        {ChkContent && <p>{ChkContent}</p>}
      </CheckLabel>
    </Wrapper>
  );
}
