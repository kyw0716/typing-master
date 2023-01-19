import { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MenuContainer from "./MenuContainer";
import NavIcon from "./NavIcon";
import { StaticValues } from "./StaticValues";

const Style = {
  Wrapper: styled.div`
    position: absolute;
    width: ${StaticValues.NAVBAR_WIDTH}px;
    height: 100vh;
    border-right: 0.5px solid #515151;
    transition: all 0.4s;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    padding-left: 12px;
    background-color: black;
  `,
  Logo: styled.div`
    width: 220px;
    height: 92px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    font-size: 25px;
    display: flex;
    gap: 5px;
    margin-bottom: 30px;
  `,
};

export default function NavBar() {
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);

  return (
    <>
      <NavIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setisMenuOpen} />
      <Style.Wrapper
        style={{ left: isMenuOpen ? 0 : -StaticValues.NAVBAR_WIDTH }}
      >
        <Logo />
        <MenuContainer />
      </Style.Wrapper>
    </>
  );
}
