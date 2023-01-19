import { ReactNode } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const Style = {
  Wrapper: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    position: relative;
  `,
};

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Style.Wrapper>
      <NavBar />
      {children}
    </Style.Wrapper>
  );
}
