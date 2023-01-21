import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestoreDocData } from "../../../src/lib/firebaseUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sentences = await getFirestoreDocData("sentence", "sample");
  const dataType = req.query.dataType as string;

  if (req.method === "GET") {
    if (dataType === "name")
      return res.status(200).json(Object.keys(sentences));
    if (dataType === undefined) return res.status(200).json(sentences);
    return res.status(200).json(sentences[dataType]);
  }
}
