import styled from "styled-components";

const LogoDiv = styled.div`
  width: 220px;
  height: 92px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  font-size: 25px;
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
  cursor: pointer;
`;

export default function Logo() {
  return <LogoDiv>TypingMaster</LogoDiv>;
}
