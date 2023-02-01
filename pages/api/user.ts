import type { NextApiRequest, NextApiResponse } from "next";
import { Record, UserInfo } from "../../src/backend/dto";
import {
  addNewOwnSentenceForUserToFirestore,
  addRecordForUserToFirestore,
  addUserInfoToFirestore,
  getFirestoreDocData,
} from "../../src/lib/firebaseUtils";

// request url: /api/user

// method: GET
// response:
// info: {
//     name: 이름 <string>,
//     uid: 사용자 uid <string>,
//     photoUrl: 프로필 사진 url <string>,
// }
// ownSentence: 등록한 문장 고유 id 배열 <string[]>,
// completeSentence: 타이핑 완료한 문장 정보 객체 배열 <{
//     sentenceId: 문장 고유 id <string>,
//     speed: 속도 <number>,
//     accuracy: 정확도 <number>
// }[]>,

// method: POST
// request body:

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = req.body?.uid;

  if (req.method === "GET") {
    const user = await getFirestoreDocData("user", uid as string);
    return res.status(200).json(user);
  }
  if (req.method === "POST") {
    const info: UserInfo | undefined = req.body?.info;
    const newOwnSentence: string | undefined = req.body?.newOwnSentence;
    const newRecord: (Record & { sentenceId: string }) | undefined =
      req.body?.newRecord;

    if (info)
      return addUserInfoToFirestore(info)
        .then(() => {
          res.status(200).json("success");
        })
        .catch((error) => {
          res.status(500).json(error);
        });

    if (newOwnSentence)
      return addNewOwnSentenceForUserToFirestore(newOwnSentence, uid)
        .then(() => {
          res.status(200).json("success");
        })
        .catch((error) => {
          res.status(500).json(error);
        });

    if (newRecord)
      return addRecordForUserToFirestore(newRecord, uid)
        .then(() => {
          res.status(200).json("success");
        })
        .catch((error) => {
          res.status(500).json(error);
        });
  }
}
