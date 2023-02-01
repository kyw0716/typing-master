import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { userContext } from "../../../../pages/_app";
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
    background-color: #2a2a2a;
    color: lightgrey;
  `,
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
    border: 4px solid lightgrey;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
  `,
};

type Props = {
  sentenceArray: string[];
  typeAmount: number;
  sentenceId: string;
};

export default function SentenceTyping({
  sentenceArray,
  typeAmount,
  sentenceId,
}: Props) {
  const user = useContext(userContext);
  const [input, setInput] = useState<string>("");
  const [allTypeSpeed, setAllTypeSpeed] = useState<number[]>([]);
  const [allTypeAccuracy, setAllTypeAccuracy] = useState<number[]>([]);
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.length === 0) return;

    setInput("");
    setSentenceIndex((current) => current + 1);
  };

  const addRecord = () => {
    const speed = Math.floor(
      allTypeSpeed.reduce((curr, acc) => acc + curr, 0) / allTypeSpeed.length
    );
    const accuracy = Math.floor(
      allTypeAccuracy.reduce((curr, acc) => acc + curr, 0) /
        allTypeAccuracy.length
    );

    axios(`/api/record`, {
      method: "post",
      data: {
        record: {
          speed: speed,
          accuracy: accuracy,
        },
        sentenceId: sentenceId,
        uid: user?.uid,
      },
    }).then(async () => {
      await axios.post("/api/user", {
        uid: `${user?.uid}`,
        newRecord: {
          sentenceId: sentenceId,
          speed: speed,
          accuracy: accuracy,
        },
      });
      alert("기록이 완료되었습니다!");
    });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (allTypeAccuracy[0] === 0 && allTypeSpeed[0] === 0) {
      setAllTypeAccuracy(allTypeAccuracy.slice(1, -1));
      setAllTypeSpeed(allTypeSpeed.slice(1, -1));
    }
  }, [allTypeAccuracy, allTypeSpeed]);

  useEffect(() => {
    if (sentenceIndex >= sentenceArray.length) {
      if (user?.uid) {
        return addRecord();
      }
      alert("기록을 남기고 싶다면 로그인하세요!");
    }
    /*eslint-disable*/
  }, [sentenceIndex, sentenceArray, user]);

  return (
    <Style.Wrapper onSubmit={(event) => handleSubmit(event)}>
      {sentenceIndex < sentenceArray.length ? (
        <>
          <TypingCalculator
            answer={sentenceArray[sentenceIndex]}
            input={input}
            typeAmount={typeAmount}
            setAllTypeSpeed={setAllTypeSpeed}
            setAllTypeAccuracy={setAllTypeAccuracy}
          />
          <Style.SentenceWrapper>
            {sentenceArray[sentenceIndex]}
          </Style.SentenceWrapper>
          <Style.Input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            ref={inputRef}
          />
        </>
      ) : (
        <Style.ResultWrapper>
          <Style.ResultViewer>
            평균 속도:{" "}
            {Math.floor(
              allTypeSpeed.reduce((curr, acc) => acc + curr, 0) /
                allTypeSpeed.length
            )}
          </Style.ResultViewer>
          <Style.ResultViewer>
            평균 정확도:{" "}
            {Math.floor(
              allTypeAccuracy.reduce((curr, acc) => acc + curr, 0) /
                allTypeAccuracy.length
            )}
            %
          </Style.ResultViewer>
        </Style.ResultWrapper>
      )}
    </Style.Wrapper>
  );
}
