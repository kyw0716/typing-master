import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../src/components/layout";
import { SentenceTitle } from "../../src/components/share/Sentences";

const Style = {
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

export default function TypingList() {
  const router = useRouter();

  return (
    <Layout>
      {SentenceTitle.map((v, i) => (
        <Style.StartTypingButton
          key={Math.random()}
          onClick={() => {
            router.push(`/typing/game?index=${i}`, "/typing/game");
          }}
        >
          {v}
        </Style.StartTypingButton>
      ))}
    </Layout>
  );
}
