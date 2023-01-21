import { useEffect, useState } from "react";
import styled from "styled-components";
import SentenceTyping from "../../src/components/feature/SentenceTyping";
import VirtualKeyboard from "../../src/components/feature/VirtualKeyboard";
import { useRouter } from "next/router";
import Image from "next/image";
import loadingImage from "../../public/loading.gif";
import Layout from "../../src/components/layout";
import axios from "axios";

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
  HomeButton: styled.div`
    width: max-content;
    height: max-content;
    padding: 15px 20px;
    background-color: grey;
    color: lightgrey;
    font-size: 17px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export default function TypingGame() {
  const [typeAmount, setTypeAmount] = useState<number>(0);
  const [sentenceArray, setSentenceArray] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.name) router.push("/");
    else
      axios({
        method: "GET",
        url: `/api/select/sentence?dataType=${router.query.name}`,
      })
        .then((res) => setSentenceArray(res.data as string[]))
        .catch((error) => alert(error));
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
}
