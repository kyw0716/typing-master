import { FIREBASE_AUTH } from "../../Firebase";
import { Sentence } from "../backend/dto";

export const makeSentenceData = (title: string, content: string[]) => {
  const displayName = FIREBASE_AUTH.currentUser?.displayName
    ? FIREBASE_AUTH.currentUser?.displayName
    : "";
  const uid = FIREBASE_AUTH.currentUser?.uid
    ? FIREBASE_AUTH.currentUser?.uid
    : "";

  const data: Sentence = {
    title: title,
    content: content,
    creator: displayName,
    uid: uid,
  };

  return data;
};
