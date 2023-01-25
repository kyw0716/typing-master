import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestoreDocData } from "../../../src/lib/firebaseUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sentences = await getFirestoreDocData("sentence", "forTyping");

  if (req.method === "GET") {
    return res.status(200).json(sentences.content);
  }
}
