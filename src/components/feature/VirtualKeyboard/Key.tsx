import { useState } from "react";
import styled from "styled-components";

type Props = {
  word: string;
  width: number;
  isClicked: boolean;
};

const Style = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid lightgrey;
    border-radius: 10px;
    color: lightgrey;
    font-weight: bold;
    box-sizing: border-box;
    cursor: pointer;
  `,
};

export default function Key({ word, width, isClicked }: Props) {
  const [isDirectClicked, setisDirectClicked] = useState<boolean>(false);

  return (
    <Style.Wrapper
      onMouseDown={() => {
        setisDirectClicked(true);
      }}
      onMouseUp={() => {
        setisDirectClicked(false);
      }}
      onMouseLeave={() => {
        setisDirectClicked(false);
      }}
      style={{
        width: width,
        height: 60,
        backgroundColor: isClicked || isDirectClicked ? "lightgrey" : "black",
        color: isClicked || isDirectClicked ? "black" : "white",
      }}
    >
      {word}
    </Style.Wrapper>
  );
}
