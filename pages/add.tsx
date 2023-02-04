import axios from "axios";
import React, { useContext, useEffect, useReducer, useRef } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import Layout from "../src/components/layout";
import { makeSentenceData } from "../src/lib/utils";
import { userContext } from "./_app";

const Style = {
  Wrapper: styled.form`
    width: 100vw;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  `,
  Container: styled.div`
    width: 970px;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: ${(props) => props.about};
  `,
  Label: styled.label`
    font-size: 20px;
    font-weight: bold;
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
    padding-left: 10px;
  `,
  TextArea: styled.textarea`
    width: 970px;
    height: 300px;
    outline: none;
    border: none;
    padding-top: 15px;
    border-bottom: 2px solid lightgrey;
    font-size: 20px;
    background-color: #2a2a2a;
    color: lightgrey;
    resize: none;
    padding-left: 10px;
  `,
  SubmitButton: styled.input`
    width: 100px;
    height: 50px;
    background-color: #2a2a2a;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  `,
};

type InputValues = {
  title: string;
  content: string[];
  isTitleExist: boolean;
};

type InputValueAction = {
  title?: string;
  content?: string;
  isTitleExist?: boolean;
  type: string;
};

const inputReducer = (
  inputValues: InputValues,
  inputAction: InputValueAction
): InputValues => {
  switch (inputAction.type) {
    case "title":
      if (inputAction.title !== undefined)
        return {
          ...inputValues,
          title: inputAction.title,
        };
    case "content":
      if (inputAction.content !== undefined)
        return {
          ...inputValues,
          content: inputAction.content.split("\n").filter((v) => v !== ""),
        };
    case "titleExist":
      if (inputAction.isTitleExist !== undefined)
        return {
          ...inputValues,
          isTitleExist: inputAction.isTitleExist,
        };
  }
  return inputValues;
};

export default function Add() {
  const user = useContext(userContext);
  const [inputValues, inputValuesDispatch] = useReducer(inputReducer, {
    title: "",
    content: [],
    isTitleExist: false,
  });

  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) (inputRef.current as HTMLInputElement).focus();
    if (inputValues.isTitleExist && textAreaRef.current)
      (textAreaRef.current as HTMLTextAreaElement).focus();
  }, [inputValues.isTitleExist]);

  useEffect(() => {
    if (inputValues.title === "")
      inputValuesDispatch({
        type: "titleExist",
        isTitleExist: false,
      });
  }, [inputValues.title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.uid) return alert("로그인 후 등록이 가능합니다!");

    const randomId = v4();
    const data = makeSentenceData(
      inputValues.title,
      inputValues.content,
      randomId
    );

    if (inputValues.content.length > 0)
      axios(`/api/addSentence`, {
        method: "POST",
        data: data,
      }).then(async () => {
        await axios.post(`/api/user`, {
          uid: user?.uid,
          sentenceId: randomId,
        });
        handleAfterRequest();
      });
    if (inputValues.title.length > 0)
      inputValuesDispatch({
        type: "titleExist",
        isTitleExist: true,
      });
  };

  const handleAfterRequest = () => {
    inputValuesDispatch({
      type: "title",
      title: "",
    });
    inputValuesDispatch({
      type: "content",
      content: "",
    });

    if (textAreaRef.current)
      (textAreaRef.current as HTMLTextAreaElement).value = "";

    alert("등록이 완료되었습니다. 메뉴의 시작하기로 들어가서 확인해보세요!");
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputValuesDispatch({
      type: "title",
      title: event.target.value,
    });
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputValuesDispatch({
      type: "content",
      content: event.target.value,
    });
  };

  return (
    <Layout>
      <Style.Wrapper onSubmit={handleSubmit}>
        <Style.Container
          about="flex-start"
          style={{ display: inputValues.isTitleExist ? "none" : "flex" }}
        >
          <Style.Label htmlFor="TITLE">제목:</Style.Label>
          <Style.Input
            id="TITLE"
            placeholder="문장의 제목을 입력해주세요."
            onChange={handleTitle}
            value={inputValues.title}
            ref={inputRef}
          />
        </Style.Container>
        <Style.Container
          about="flex-start"
          style={{ display: inputValues.isTitleExist ? "flex" : "none" }}
        >
          <Style.Label htmlFor="CONTENT">문장:</Style.Label>
          <Style.TextArea
            id="CONTENT"
            placeholder="문장을 입력해주세요."
            onChange={handleContent}
            ref={textAreaRef}
          />
        </Style.Container>
        <Style.Container
          about="flex-end"
          style={{ display: inputValues.isTitleExist ? "flex" : "none" }}
        >
          <Style.SubmitButton type="submit" value="제출" />
        </Style.Container>
      </Style.Wrapper>
    </Layout>
  );
}
