import styled from "styled-components";
import VirtualKeyboard from "../src/components/feature/VirtualKeyboard";

const Style = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default function Test() {
  return (
    <Style.Wrapper>
      <VirtualKeyboard />
    </Style.Wrapper>
  );
}
