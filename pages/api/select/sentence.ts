import type { NextApiRequest, NextApiResponse } from "next";
import { Sentence } from "../../../src/backend/dto";
import { getFirestoreDocData } from "../../../src/lib/firebaseUtils";

// request url: /api/select/sentence
// method: GET
// response:
// {
//   content: 문장 배열 <string[]>,
//   sentenceId: 문장 고유 id <string>,
//   title: 제목 <string>,
//   uid: 문장 등록자 uid <string>
// } 형식의 전체 등록된 문장 배열

// method: POST
// request body: {uid: 현재 로그인한 유저의 uid <string>}
// response:
// {
//   content: 문장 배열 <string[]>,
//   sentenceId: 문장 고유 id <string>,
//   title: 제목 <string>,
//   uid: 문장 등록자 uid <string>
// } 형식의 현재 사용자가 등록한 문장 배열

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sentences = await getFirestoreDocData("sentence", "forTyping");
  const uid = req.body?.uid;

  if (req.method === "GET") return res.status(200).json(sentences.content);
  if (req.method === "POST") {
    const ownSentences = sentences.content.filter((obj: Sentence) => {
      return obj.uid === uid;
    });

    return res.status(200).json(ownSentences);
  }
}
