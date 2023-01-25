import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { FIREBASE_AUTH, getGithubAuthProvider } from "../../../../Firebase";
import { userContext } from "../../../../pages/_app";
import { AddIcon, GithubIcon, HomeIcon, KeyBoardIcon } from "../../share/Svg";

const Style = {
  Wrapper: styled.div`
    width: 220px;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 40px;
  `,
  Menu: styled.div`
    width: 220px;
    height: 48px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    gap: 10px;
    font-size: 24px;
    cursor: pointer;
    :hover {
      background-color: #1c1c1c;
    }
  `,
};

export default function MenuContainer() {
  const router = useRouter();
  const login = async () => {
    await signInWithPopup(FIREBASE_AUTH, getGithubAuthProvider());
  };

  const user = useContext(userContext);

  return (
    <Style.Wrapper>
      <Style.Menu
        onClick={() => {
          router.push("/");
        }}
      >
        <HomeIcon />홈
      </Style.Menu>
      <Style.Menu
        onClick={() => {
          router.push("/typing/list");
        }}
      >
        <KeyBoardIcon /> 시작하기
      </Style.Menu>
      <Style.Menu
        onClick={() => {
          router.push("/add");
        }}
      >
        <AddIcon /> 추가하기
      </Style.Menu>
      <Style.Menu
        onClick={() => {
          user ? router.push("/myPage") : login();
        }}
      >
        {user ? (
          <Image
            src={user.photoURL as string}
            alt="profile"
            width={24}
            height={24}
            style={{
              borderRadius: "50%",
            }}
          />
        ) : (
          <GithubIcon />
        )}
        {user ? "프로필" : "로그인"}
      </Style.Menu>
    </Style.Wrapper>
  );
}
