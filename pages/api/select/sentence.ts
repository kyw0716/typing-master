import type { NextApiRequest, NextApiResponse } from "next";
import { Sentences } from "../../../src/components/share/Sentences";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  res.status(200).json(Sentences[parseInt(req.query.index as string, 10)]);
}
