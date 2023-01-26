import { NextApiRequest, NextApiResponse } from "next";
import { addSentenceToFirestore } from "../../src/lib/firebaseUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const creator = req.body?.creator;
    const title = req.body?.title;
    const content = req.body?.content;
    const uid = req.body?.uid;

    console.log(uid);

    if (uid === undefined)
      return res.status(500).json("로그인 후 이용 가능합니다.");
    if (title === undefined) return res.status(500).json("제목이 필요합니다.");
    if (content === undefined)
      return res.status(500).json("내용이 필요합니다.");

    await addSentenceToFirestore(creator, title, content, uid)
      .then(() => {
        res.status(200).json("success");
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}
