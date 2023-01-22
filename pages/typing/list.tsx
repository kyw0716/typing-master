import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../src/components/layout";
import { getFirestoreDocData } from "../../src/lib/firebaseUtils";
import loadingImage from "../../public/loading.gif";
import axios from "axios";

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
    axios({
      method: "GET",
      url: "/api/select/sentence?dataType=name",
    }).then((res) => {
      setNames(res.data as string[]);
    });
  }, []);

  return (
    <Layout>
      {names.length > 0 ? (
        <>
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
        </>
      ) : (
        <Image src={loadingImage} alt={"loading"} width={300} height={300} />
      )}
    </Layout>
  );
}
