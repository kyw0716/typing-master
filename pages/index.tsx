import styled from "styled-components";
import { useRouter } from "next/router";
import { SentenceTitle } from "../src/components/share/Sentences";
import Layout from "../src/components/layout";

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

export default function Home() {
  return <Layout>홈페이지</Layout>;
}
