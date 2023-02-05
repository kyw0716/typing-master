import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
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

type RecordValues = {
  input: string;
  allTypeSpeed: number[];
  allTypeAccuracy: number[];
  sentenceIndex: number;
  typeSpeedResult: number;
  typeAccuracyResult: number;
};

type RecordAction = {
  type: string;
  input?: string;
  typeSpeed?: number;
  typeAccuracy?: number;
  sentenceIndex?: number;
};

const recordReducer = (
  recordValues: RecordValues,
  action: RecordAction
): RecordValues => {
  switch (action.type) {
    case "input":
      if (action.input !== undefined)
        return {
          ...recordValues,
          input: action.input,
        };
    case "typeSpeed":
      if (action.typeSpeed !== undefined)
        return {
          ...recordValues,
          allTypeSpeed: [...recordValues.allTypeSpeed, action.typeSpeed].filter(
            (v, i) => !(v === 0 && i === 0)
          ),
        };
    case "typeAccuracy":
      if (action.typeAccuracy !== undefined)
        return {
          ...recordValues,
          allTypeAccuracy: [
            ...recordValues.allTypeAccuracy,
            action.typeAccuracy,
          ].filter((v, i) => !(v === 0 && i === 0)),
        };
    case "sentenceIndex":
      if (action.sentenceIndex !== undefined)
        return {
          ...recordValues,
          sentenceIndex: action.sentenceIndex,
        };
    case "cacluate-record":
      return {
        ...recordValues,
        typeSpeedResult: Math.floor(
          recordValues.allTypeSpeed.reduce((curr, acc) => acc + curr, 0) /
            recordValues.allTypeSpeed.length
        ),
        typeAccuracyResult: Math.floor(
          recordValues.allTypeAccuracy.reduce((curr, acc) => acc + curr, 0) /
            recordValues.allTypeAccuracy.length
        ),
      };
  }
  return recordValues;
};

const initialValue = {
  input: "",
  allTypeSpeed: [],
  allTypeAccuracy: [],
  sentenceIndex: 0,
  typeSpeedResult: 0,
  typeAccuracyResult: 0,
};

export default function SentenceTyping({
  sentenceArray,
  typeAmount,
  sentenceId,
}: Props) {
  const user = useContext(userContext);

  // TODO: useReducer 완성하기
  const [recordValues, recordValuesDispatch] = useReducer(
    recordReducer,
    initialValue
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (recordValues.input.length === 0) return;

    recordValuesDispatch({
      type: "input",
      input: "",
    });
    recordValuesDispatch({
      type: "sentenceIndex",
      sentenceIndex: recordValues.sentenceIndex + 1,
    });
  };

  const handleAllTypeRecord = (speed: number, accuracy: number) => {
    recordValuesDispatch({
      type: "typeSpeed",
      typeSpeed: speed,
    });
    recordValuesDispatch({
      type: "typeAccuracy",
      typeAccuracy: accuracy,
    });
  };

  const addRecord = () => {
    axios(`/api/record`, {
      method: "post",
      data: {
        record: {
          speed: recordValues.typeSpeedResult,
          accuracy: recordValues.typeAccuracyResult,
        },
        sentenceId: sentenceId,
        uid: user?.uid,
      },
    }).then(async () => {
      await axios.post("/api/user", {
        uid: `${user?.uid}`,
        record: {
          sentenceId: sentenceId,
          speed: recordValues.typeSpeedResult,
          accuracy: recordValues.typeAccuracyResult,
        },
      });
      alert("기록이 완료되었습니다!");
    });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (recordValues.sentenceIndex >= sentenceArray.length) {
      recordValuesDispatch({
        type: "cacluate-record",
      });
      if (user?.uid) {
        return addRecord();
      }
      alert("기록을 남기고 싶다면 로그인하세요!");
    }
    /*eslint-disable*/
  }, [recordValues.sentenceIndex, sentenceArray, user]);

  return (
    <Style.Wrapper onSubmit={(event) => handleSubmit(event)}>
      {recordValues.sentenceIndex < sentenceArray.length ? (
        <>
          <TypingCalculator
            answer={sentenceArray[recordValues.sentenceIndex]}
            input={recordValues.input}
            typeAmount={typeAmount}
            handleAllTypeRecord={handleAllTypeRecord}
            sentenceIndex={recordValues.sentenceIndex}
          />
          <Style.SentenceWrapper>
            {sentenceArray[recordValues.sentenceIndex]}
          </Style.SentenceWrapper>
          <Style.Input
            value={recordValues.input}
            onChange={(event) => {
              recordValuesDispatch({
                type: "input",
                input: event.target.value,
              });
            }}
            ref={inputRef}
          />
        </>
      ) : (
        <Style.ResultWrapper>
          <Style.ResultViewer>
            평균 속도: {recordValues.typeSpeedResult}
          </Style.ResultViewer>
          <Style.ResultViewer>
            평균 정확도: {recordValues.allTypeAccuracy}%
          </Style.ResultViewer>
        </Style.ResultWrapper>
      )}
    </Style.Wrapper>
  );
}
