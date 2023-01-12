import styled from "styled-components";
import { useRouter } from "next/router";
import { SentenceTitle } from "../src/components/share/Sentences";

const Style = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  `,
  StartTypingButton: styled.button`
    width: max-content;
    height: max-content;
    padding: 15px 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
  `,
};

export default function Home() {
  const router = useRouter();

  return (
    <Style.Wrapper>
      {SentenceTitle.map((v, i) => (
        <Style.StartTypingButton
          key={Math.random()}
          onClick={() => {
            router.push(`/typing?index=${i}`, "/typing");
          }}
        >
          {v}
        </Style.StartTypingButton>
      ))}
    </Style.Wrapper>
  );
}
