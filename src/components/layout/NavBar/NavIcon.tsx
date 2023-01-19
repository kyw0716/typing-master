import { SetStateAction } from "react";
import styled from "styled-components";
import { ExitIcon, HamburgerMenuIcon } from "../../share/Svg";

const MenuArea = styled.div`
  width: max-content;
  height: max-content;
  position: absolute;
  left: 24px;
  bottom: 20px;
  cursor: pointer;
  z-index: 999;
`;

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function NavIcon({ isMenuOpen, setIsMenuOpen }: Props) {
  return (
    <MenuArea
      onClick={() => {
        setIsMenuOpen((current) => !current);
      }}
    >
      {isMenuOpen ? <ExitIcon /> : <HamburgerMenuIcon />}
    </MenuArea>
  );
}
