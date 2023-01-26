import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import Layout from "../src/components/layout";
import { makeSentenceData } from "../src/lib/utils";

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

export default function Add() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string[]>([]);
  const [isTitleExist, setIsTitleExist] = useState<boolean>(false);

  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) (inputRef.current as HTMLInputElement).focus();
    if (isTitleExist && textAreaRef.current)
      (textAreaRef.current as HTMLTextAreaElement).focus();
  }, [isTitleExist]);

  useEffect(() => {
    if (!title) setIsTitleExist(false);
  }, [title]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = makeSentenceData(title, content, v4());

    if (content.length > 0)
      axios(`/api/addSentence`, {
        method: "POST",
        data: data,
      })
        .then(() => {
          handleAfterRequest();
        })
        .catch((error) => {
          alert(error.response.data);
        });
    if (title.length > 0) setIsTitleExist(true);
  };

  const handleAfterRequest = () => {
    setTitle("");
    setContent([]);

    if (textAreaRef.current)
      (textAreaRef.current as HTMLTextAreaElement).value = "";

    alert("등록이 완료되었습니다. 메뉴의 시작하기로 들어가서 확인해보세요!");
  };

  return (
    <Layout>
      <Style.Wrapper onSubmit={handleSubmit}>
        <Style.Container
          about="flex-start"
          style={{ display: isTitleExist ? "none" : "flex" }}
        >
          <Style.Label htmlFor="TITLE">제목:</Style.Label>
          <Style.Input
            id="TITLE"
            placeholder="문장의 제목을 입력해주세요."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
            ref={inputRef}
          />
        </Style.Container>
        <Style.Container
          about="flex-start"
          style={{ display: isTitleExist ? "flex" : "none" }}
        >
          <Style.Label htmlFor="CONTENT">문장:</Style.Label>
          <Style.TextArea
            id="CONTENT"
            placeholder="문장을 입력해주세요."
            onChange={(event) => {
              const sentences = event.target.value
                .split("\n")
                .filter((v) => v !== "");
              setContent(sentences);
            }}
            ref={textAreaRef}
          ></Style.TextArea>
        </Style.Container>
        <Style.Container
          about="flex-end"
          style={{ display: isTitleExist ? "flex" : "none" }}
        >
          <Style.SubmitButton type="submit" value="제출" />
        </Style.Container>
      </Style.Wrapper>
    </Layout>
  );
}
