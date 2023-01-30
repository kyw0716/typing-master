import type { NextApiRequest, NextApiResponse } from "next";
import {
  addRecordToFirestore,
  getFirestoreDocData,
} from "../../src/lib/firebaseUtils";

// method: GET
// request url: /api/record?sentenceId={문장 고유 id} | /api/record?sentenceId={문장 고유 id}&uid={현재 로그인한 유저 uid}
// response (uid 없을 때):
// {
//     userNames: 유저 이름 배열 <string[]>,
//     records: {
//         user1(유저 이름): {
//             accuracy: 정확도 <string>,
//             speed: 속도 <string>,
//         },
//         user2(유저 이름): {
//             accuracy: 정확도 <string>,
//             speed: 속도 <string>,
//         } ...
//     }
// }
// response (uid 있을 때):
// {
//     accuracy: 정확도 <string>,
//     speed: 속도 <string>,
// }

// method: POST
// request url: /api/record
// request body:
// {
//     record: {
//         speed: 속도 <string>,
//         accuracy: 정확도 <string>
//     },
//     uid: 현재 로그인한 유저 uid <string>,
//     sentenceId: 문장 고유 id <string>
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const sentenceId = req.query?.sentenceId;
    const uid = req.query?.uid;
    const record = await getFirestoreDocData("record", sentenceId as string);

    if (uid) return res.status(200).json(record[`${uid}`]);
    return res.status(200).json({
      userNames: Object.keys(record),
      record: record,
    });
  }
  if (req.method === "POST") {
    const record = req.body?.record;
    const uid = req.body?.uid;
    const sentenceId = req.body?.sentenceId;

    return addRecordToFirestore(record, sentenceId, uid)
      .then(() => {
        return res.status(200).json("success");
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}
