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
// 사용자 정보 업데이트 기능
// request body: {
//   uid: 현재 로그인한 사용자 uid <string>,
//   info: {
//     name: 이름 <string>,
//     photoUrl: 프로필 사진 url <string>,
//     email: 이메일 <string>
//   }
// }
//
// 사용자 기록 등록 기능
// request body: {
//   uid: 현재 로그인한 사용자 uid <string>,
//   record: {
//     sentenceId: 완료한 문장의 id <string>,
//     speed: 평균 속도 <number>,
//     accuracy: 평균 정확도 <number>
//   }
// }
//
// 사용자가 등록한 문장 업데이트 기능
// request body: {
//   uid: 현재 로그인한 사용자 uid <string>,
//   sentenceId: 등록한 문장 id <string>,
// }

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
    const sentenceId: string | undefined = req.body?.sentenceId;
    const record: (Record & { sentenceId: string }) | undefined =
      req.body?.record;

    if (info)
      return addUserInfoToFirestore(info, uid)
        .then(() => {
          res.status(200).json("success");
        })
        .catch((error) => {
          res.status(500).json(error);
        });

    if (sentenceId)
      return addNewOwnSentenceForUserToFirestore(sentenceId, uid)
        .then(() => {
          res.status(200).json("success");
        })
        .catch((error) => {
          res.status(500).json(error);
        });

    if (record)
      return addRecordForUserToFirestore(record, uid)
        .then(() => {
          res.status(200).json("success");
        })
        .catch((error) => {
          res.status(500).json(error);
        });
  }
}
