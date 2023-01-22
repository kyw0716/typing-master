import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../src/components/layout";
import { getFirestoreDocData } from "../../src/lib/firebaseUtils";

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
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    getFirestoreDocData("sentence", "sample").then((data) => {
      setNames(Object.keys(data));
    });
  }, []);

  return (
    <Layout>
      {names.map((v) => (
        <Style.StartTypingButton
          key={Math.random()}
          onClick={() => {
            router.push(`/typing/game?name=${v}`, "/typing/game");
          }}
        >
          {v}
        </Style.StartTypingButton>
      ))}
    </Layout>
  );
}
