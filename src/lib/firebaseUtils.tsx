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

  if (prevSpeed < Number(record.speed) && Number(record.accuracy) >= 80)
    await updateDoc(docRef, {
      [uid]: record,
    }).catch((e) => {
      setDoc(docRef, {
        [uid]: record,
      });
    });
};
