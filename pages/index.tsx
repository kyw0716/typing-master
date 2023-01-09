import { useState } from "react";
import styled from "styled-components";
import SentenceTyping from "../src/components/feature/SentenceTyping";
import { KoreanNationalAnthem } from "../src/components/feature/SentenceTyping/Static";
import VirtualKeyboard from "../src/components/feature/VirtualKeyboard";

const Style = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
  `,
};

export default function Test() {
  const [typeAmount, setTypeAmount] = useState<number>(0);
  return (
    <Style.Wrapper>
      <SentenceTyping
        sentenceArray={KoreanNationalAnthem}
        typeAmount={typeAmount}
      />
      <VirtualKeyboard typeAmount={typeAmount} setTypeAmount={setTypeAmount} />
    </Style.Wrapper>
  );
}
