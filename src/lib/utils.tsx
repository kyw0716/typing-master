import { FIREBASE_AUTH } from "../../Firebase";
import { Sentence } from "../backend/dto";

export const makeSentenceData = (
  title: string,
  content: string[],
  sentenceId: string
) => {
  const data: Sentence = {
    title: title,
    content: content,
    creator: `${FIREBASE_AUTH.currentUser?.displayName}`,
    uid: `${FIREBASE_AUTH.currentUser?.uid}`,
    sentenceId: sentenceId,
  };

  return data;
};
