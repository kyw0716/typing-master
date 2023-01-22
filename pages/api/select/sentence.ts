import { doc, getDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { FIREBASE_DB } from "../../../Firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const docRef = doc(FIREBASE_DB, "sentence", "sample");
  const docSnap = await getDoc(docRef);
  const dataType = req.query.dataType as string;

  if (docSnap.exists()) {
    const sentences = docSnap.data();

    if (req.method === "GET") {
      if (dataType === "name")
        return res.status(200).json(Object.keys(sentences));
      if (dataType === undefined) return res.status(200).json(sentences);
      return res.status(200).json(sentences[dataType]);
    }
  }
  return res.status(404).json("not-found");
}
