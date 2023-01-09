import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TypingCalculator from "./TypingCalculator";

const Style = {
  Wrapper: styled.form`
    width: 100vw;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,
  SentenceWrapper: styled.div`
    width: 970px;
    height: max-content;
    font-size: 20px;
  `,
  Input: styled.input`
    width: 970px;
    height: 60px;
    outline: none;
    border: none;
    border-bottom: 2px solid lightgrey;
    font-size: 20px;
  `,
};

type Props = {
  sentenceArray: string[];
  typeAmount: number;
};

export default function SentenceTyping({ sentenceArray, typeAmount }: Props) {
  const [input, setInput] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput("");
    setIndex((current) => (current + 1) % sentenceArray.length);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <Style.Wrapper onSubmit={(event) => handleSubmit(event)}>
      <Style.SentenceWrapper>{sentenceArray[index]}</Style.SentenceWrapper>
      <Style.Input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        ref={inputRef}
      />
      <TypingCalculator
        answer={sentenceArray[index]}
        input={input}
        typeAmount={typeAmount}
      />
    </Style.Wrapper>
  );
}
