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
  `,
};

export default function Key({ word, width, isClicked }: Props) {
  return (
    <Style.Wrapper
      style={{
        width: width,
        height: 60,
        backgroundColor: isClicked ? "lightgrey" : "black",
        color: isClicked ? "black" : "white",
      }}
    >
      {word}
    </Style.Wrapper>
  );
}
