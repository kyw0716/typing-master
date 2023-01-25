import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { FIREBASE_AUTH } from "../Firebase";
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
};

export default function MyPage() {
  const router = useRouter();
  const user = useContext(userContext);

  const logOut = () => {
    FIREBASE_AUTH.signOut();
  };

  useEffect(() => {
    if (!user) router.push("/");
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
      </Style.Wrapper>
    </Layout>
  );
}
