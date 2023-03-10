import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const Style = {
  ResultWrapper: styled.div`
    width: 100vw;
    height: max-content;
    display: flex;
    justify-content: center;
    gap: 20px;
  `,
  ResultViewer: styled.div`
    width: 180px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
  `,
};

type Props = {
  answer: string;
  input: string;
  typeAmount: number;
  handleAllTypeRecord: (speed: number, accuracy: number) => void;
  sentenceIndex: number;
};

export default function TypingCalculator({
  answer,
  input,
  typeAmount,
  handleAllTypeRecord,
  sentenceIndex,
}: Props) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [typeSpeed, setTypeSpeed] = useState<number>(0);
  const [typeAccuracy, setTypeAccuracy] = useState<number>(0);
  const [interv, setInterv] = useState<NodeJS.Timer>();
  const [isTypingStart, setIsTypingStart] = useState<boolean>(false);

  const answerArray = answer.split("");
  const inputArray = input.split("");

  useEffect(() => {
    if (input === "") setIsTypingStart(false);
    else setIsTypingStart(true);
  }, [input]);

  useEffect(() => {
    if (isTypingStart) {
      setCurrentTime((currentTime) => (currentTime += 1));
      setInterv(
        setInterval(() => {
          setCurrentTime((current) => (current += 1));
        }, 1000)
      );
    } else clearInterval(interv);
    /*eslint-disable-next-line*/
  }, [isTypingStart]);

  useEffect(() => {
    setCurrentTime(0);

    handleAllTypeRecord(typeSpeed, typeAccuracy);
    /*eslint-disable-next-line*/
  }, [sentenceIndex]);

  useEffect(() => {
    if (currentTime !== 0 && typeAmount !== 0)
      setTypeSpeed(Math.floor((typeAmount / currentTime) * 60));
  }, [currentTime, typeAmount]);

  useEffect(() => {
    if (input !== "")
      setTypeAccuracy(
        Math.floor(
          (answerArray.filter((v, i) => v === inputArray[i]).length /
            answerArray.length) *
            100
        )
      );
    /*eslint-disable-next-line*/
  }, [input]);

  return (
    <Style.ResultWrapper>
      <Style.ResultViewer>??????: {typeSpeed}</Style.ResultViewer>
      <Style.ResultViewer>?????????: {typeAccuracy} %</Style.ResultViewer>
    </Style.ResultWrapper>
  );
}
