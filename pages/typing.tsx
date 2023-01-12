import { useEffect, useState } from "react";
import styled from "styled-components";
import SentenceTyping from "../src/components/feature/SentenceTyping";
import VirtualKeyboard from "../src/components/feature/VirtualKeyboard";
import { useRouter } from "next/router";
import Image from "next/image";
import loadingImage from "../public/loading.gif";

const Style = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
  `,
};

export default function Typing() {
  const [typeAmount, setTypeAmount] = useState<number>(0);
  const [sentenceArray, setSentenceArray] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.index) router.push("/");
    else
      fetch(`/api/select/sentence?index=${router.query.index}`)
        .then((response) => response.json())
        .then((data) => {
          setSentenceArray(data as string[]);
        });
  }, []);

  return (
    <Style.Wrapper>
      {sentenceArray.length > 0 ? (
        <>
          <SentenceTyping
            sentenceArray={sentenceArray}
            typeAmount={typeAmount}
          />
          <VirtualKeyboard setTypeAmount={setTypeAmount} />
        </>
      ) : (
        <Image src={loadingImage} alt={"loading"} width={300} height={300} />
      )}
    </Style.Wrapper>
  );
}
