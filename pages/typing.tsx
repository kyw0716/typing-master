import { useEffect, useState } from "react";
import styled from "styled-components";
import SentenceTyping from "../src/components/feature/SentenceTyping";
import VirtualKeyboard from "../src/components/feature/VirtualKeyboard";
import { useRouter } from "next/router";

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

export default function Typing() {
  const [typeAmount, setTypeAmount] = useState<number>(0);
  const [sentenceArray, setSentenceArray] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/select/sentence?index=${router.query.index}`)
      .then((response) => response.json())
      .then((data) => {
        setSentenceArray(data as string[]);
      });
  }, []);

  return (
    <Style.Wrapper>
      <SentenceTyping sentenceArray={sentenceArray} typeAmount={typeAmount} />
      <VirtualKeyboard setTypeAmount={setTypeAmount} />
    </Style.Wrapper>
  );
}
