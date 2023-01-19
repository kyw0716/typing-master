import Image from "next/image";
import styled from "styled-components";
import { AddIcon, HomeIcon, KeyBoardIcon } from "../../share/Svg";

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
  return (
    <Style.Wrapper>
      <Style.Menu>
        <HomeIcon />홈
      </Style.Menu>
      <Style.Menu>
        <KeyBoardIcon /> 시작하기
      </Style.Menu>
      <Style.Menu>
        <AddIcon /> 추가하기
      </Style.Menu>
      <Style.Menu>
        <Image
          src={
            "https://avatars.githubusercontent.com/u/77326660?s=80&u=9b4ee6d7178e3ef1dc2a79703c3e865a0297cdbe&v=4"
          }
          alt="profile"
          width={24}
          height={24}
          style={{ borderRadius: "50%" }}
        />
        프로필
      </Style.Menu>
    </Style.Wrapper>
  );
}
