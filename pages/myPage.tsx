import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FIREBASE_AUTH } from "../Firebase";
import { Sentence } from "../src/backend/dto";
import Layout from "../src/components/layout";
import { userContext } from "./_app";

const Style = {
  Wrapper: styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  `,
  Container: styled.div`
    display: flex;
    gap: 10px;
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

export default function MyPage() {
  const router = useRouter();
  const user = useContext(userContext);
  const [ownSentences, setOwnSentences] = useState<Sentence[]>([]);

  const logOut = () => {
    FIREBASE_AUTH.signOut();
  };

  useEffect(() => {
    if (!user) router.push("/");

    axios(`/api/select/sentence`, {
      method: "POST",
      data: {
        uid: user?.uid,
      },
    }).then((res) => {
      setOwnSentences(res.data);
    });
  }, [user]);

  return (
    <Layout>
      <Style.Wrapper>
        <div>이름: {user?.displayName}</div>
        <div>이메일: {user?.email}</div>
        <span>
          사진:
          <Image
            src={user?.photoURL as string}
            width={50}
            height={50}
            alt="profile"
          />
        </span>
        <button onClick={logOut}>로그아웃</button>
        <Style.Container>
          {ownSentences.map((sentenceObj) => (
            <Style.StartTypingButton
              key={Math.random()}
              onClick={() => {
                router.push(
                  `/typing/game?name=${sentenceObj.sentenceId}`,
                  "/typing/game"
                );
              }}
            >
              {sentenceObj.title}
            </Style.StartTypingButton>
          ))}
        </Style.Container>
      </Style.Wrapper>
    </Layout>
  );
}
