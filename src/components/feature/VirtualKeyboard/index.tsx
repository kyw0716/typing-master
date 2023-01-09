import { useEffect, useState } from "react";
import styled from "styled-components";
import Key from "./Key";

const Style = {
  Wrapper: styled.div`
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  KeyRowContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
  `,
};

export default function VirtualKeyboard() {
  const [currentKey, setCurrentKey] = useState<string>("");
  const keys = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      setCurrentKey(event.key);
    });

    window.addEventListener("keyup", () => {
      setCurrentKey("");
    });
  }, []);

  return (
    <Style.Wrapper>
      <Style.KeyRowContainer>
        {keys[0].map((k) => (
          <Key
            key={Math.random()}
            word={k}
            width={60}
            height={60}
            isClicked={k.toLowerCase() === currentKey.toLowerCase()}
          />
        ))}
        <Key
          key={Math.random()}
          word="Backspace"
          width={120}
          height={60}
          isClicked={currentKey === "Backspace"}
        />
      </Style.KeyRowContainer>
      <Style.KeyRowContainer>
        <Key
          word="Tab"
          width={90}
          height={60}
          isClicked={currentKey === "Tab"}
        />
        {keys[1].map((k) => (
          <Key
            key={Math.random()}
            word={k}
            width={60}
            height={60}
            isClicked={currentKey.toLowerCase() === k.toLowerCase()}
          />
        ))}
        <Key
          key={Math.random()}
          word="|"
          width={90}
          height={60}
          isClicked={currentKey === "\\"}
        />
      </Style.KeyRowContainer>
      <Style.KeyRowContainer>
        <Key
          word="CapsLock"
          width={120}
          height={60}
          isClicked={currentKey === "CapsLock"}
        />
        {keys[2].map((k) => (
          <Key
            key={Math.random()}
            word={k}
            width={60}
            height={60}
            isClicked={currentKey.toLowerCase() === k.toLowerCase()}
          />
        ))}
        <Key
          key={Math.random()}
          word="Enter"
          width={125}
          height={60}
          isClicked={currentKey === "Enter"}
        />
      </Style.KeyRowContainer>
      <Style.KeyRowContainer>
        <Key
          word="Shift"
          width={150}
          height={60}
          isClicked={currentKey === "Shift"}
        />
        {keys[3].map((k) => (
          <Key
            key={Math.random()}
            word={k}
            width={60}
            height={60}
            isClicked={currentKey.toLowerCase() === k.toLowerCase()}
          />
        ))}
        <Key
          key={Math.random()}
          word="Shift"
          width={160}
          height={60}
          isClicked={currentKey === "Shift"}
        />
      </Style.KeyRowContainer>
      <Style.KeyRowContainer>
        <Key
          word="Space"
          width={360}
          height={60}
          isClicked={currentKey === " "}
        />
      </Style.KeyRowContainer>
    </Style.Wrapper>
  );
}
