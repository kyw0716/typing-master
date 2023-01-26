import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../src/components/layout";
import loadingImage from "../../public/loading.gif";
import axios from "axios";
import { Sentence } from "../../src/backend/dto";

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
  const [sentence, setSentence] = useState<Sentence[]>([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/select/sentence",
    }).then((res) => {
      setSentence(res.data as Sentence[]);
    });
  }, []);

  return (
    <Layout>
      {sentence.length > 0 ? (
        <>
          {sentence.map((v) => (
            <Style.StartTypingButton
              key={Math.random()}
              onClick={() => {
                router.push(`/typing/game?name=${v.title}`, "/typing/game");
              }}
            >
              {v.title}
            </Style.StartTypingButton>
          ))}
        </>
      ) : (
        <Image
          src={loadingImage}
          alt={"loading"}
          width={300}
          height={300}
          priority
        />
      )}
    </Layout>
  );
}
