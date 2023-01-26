import type { NextApiRequest, NextApiResponse } from "next";
import { Sentence } from "../../../src/backend/dto";
import { getFirestoreDocData } from "../../../src/lib/firebaseUtils";

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
