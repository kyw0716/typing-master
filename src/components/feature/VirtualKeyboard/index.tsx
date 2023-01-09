import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import Key from "./Key";
import KeyEncoder from "./KeyEncoder";
import keyArray, { specialKeyArray, specialKeyWidth } from "./Static";

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

type Props = {
  typeAmount: number;
  setTypeAmount: React.Dispatch<SetStateAction<number>>;
};

export default function VirtualKeyboard({ typeAmount, setTypeAmount }: Props) {
  const [currentKey, setCurrentKey] = useState<string>("");

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      setCurrentKey(event.code);
    });

    window.addEventListener("keyup", (event) => {
      setCurrentKey("");
      if (event.code === "Enter") setTypeAmount(0);
      else if (event.code === "Backspace")
        setTypeAmount((current) => (current -= 1));
      else setTypeAmount((current) => (current += 1));
    });
  }, []);

  return (
    <Style.Wrapper>
      {keyArray.map((keys) => {
        return (
          <Style.KeyRowContainer key={Math.random()}>
            {keys.map((key) => {
              if (key === " ")
                return (
                  <Key
                    key={Math.random()}
                    word="Space"
                    width={specialKeyWidth[specialKeyArray.indexOf(" ")]}
                    isClicked={KeyEncoder(key) === currentKey}
                  />
                );
              if (specialKeyArray.includes(key))
                return (
                  <Key
                    key={Math.random()}
                    word={key}
                    width={specialKeyWidth[specialKeyArray.indexOf(key)]}
                    isClicked={KeyEncoder(key) === currentKey}
                  />
                );
              return (
                <Key
                  key={Math.random()}
                  word={key}
                  width={60}
                  isClicked={KeyEncoder(key) === currentKey}
                />
              );
            })}
          </Style.KeyRowContainer>
        );
      })}
    </Style.Wrapper>
  );
}
