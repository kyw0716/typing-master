import { useEffect, useState } from "react";
import styled from "styled-components";
import Key from "./Key";
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

export default function VirtualKeyboard() {
  const [currentKey, setCurrentKey] = useState<string>("");

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
                    isClicked={" " === currentKey}
                  />
                );
              if (specialKeyArray.includes(key))
                return (
                  <Key
                    key={Math.random()}
                    word={key}
                    width={specialKeyWidth[specialKeyArray.indexOf(key)]}
                    isClicked={key === currentKey}
                  />
                );
              return (
                <Key
                  key={Math.random()}
                  word={key}
                  width={60}
                  isClicked={key.toLowerCase() === currentKey.toLowerCase()}
                />
              );
            })}
          </Style.KeyRowContainer>
        );
      })}
    </Style.Wrapper>
  );
}
