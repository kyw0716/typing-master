import { NextApiRequest, NextApiResponse } from "next";
import { addSentenceToFirestore } from "../../src/lib/firebaseUtils";

// request url: /api/addSentence
// method: POST
// request body:
// {
//   uid: 현재 로그인한 유저의 uid <string>,
//   title: 제목 <string>,
//   content: 문장 배열 <string[]>,
//   sentenceId: 문장 고유 id <string>,
// }
// response: "success" | Error

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const title = req.body?.title;
    const content = req.body?.content;
    const uid = req.body?.uid;
    const sentenceId = req.body?.sentenceId;

    if (uid === undefined)
      return res.status(500).json("로그인 후 이용 가능합니다.");
    if (title === undefined) return res.status(500).json("제목이 필요합니다.");
    if (content === undefined)
      return res.status(500).json("내용이 필요합니다.");

    await addSentenceToFirestore(title, content, uid, sentenceId)
      .then(() => {
        res.status(200).json("success");
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}
