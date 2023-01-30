import { isEmpty } from "@firebase/util";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { Record, Sentence } from "../backend/dto";

export const getFirestoreDocData = async (document: string, field: string) => {
  const docRef = doc(FIREBASE_DB, document, field);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();
  return new Error("empty");
};

export const addSentenceToFirestore = async (
  creator: string,
  title: string,
  content: string[],
  uid: string,
  sentenceId: string
) => {
  const docRef = doc(FIREBASE_DB, "sentence", "forTyping");

  const data: Sentence = {
    creator: creator,
    title: title,
    content: content,
    uid: uid,
    sentenceId: sentenceId,
  };

  await updateDoc(docRef, {
    content: arrayUnion(data),
  });
};

export const addRecordToFirestore = async (
  record: Record,
  sentenceId: string,
  uid: string
) => {
  const docRef = doc(FIREBASE_DB, "record", sentenceId);
  const prevRecord = await getFirestoreDocData("record", sentenceId);
  const prevSpeed = Number(prevRecord[uid]?.speed);

  // uid의 유저의 기록이 없을 때
  if (isEmpty(prevRecord[uid]))
    // sentenceId 문장에 다른 사람의 기록이 있으면 update, 아니면 set을 진행
    await updateDoc(docRef, {
      [uid]: record,
    }).catch(() =>
      setDoc(docRef, {
        [uid]: record,
      })
    );

  if (prevSpeed < Number(record.speed) && Number(record.accuracy) >= 80)
    await updateDoc(docRef, {
      [uid]: record,
    });
};
