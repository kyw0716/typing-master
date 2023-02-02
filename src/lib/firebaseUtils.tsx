import { isEmpty } from "@firebase/util";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { Record, Sentence, UserInfo } from "../backend/dto";

export const getFirestoreDocData = async (document: string, field: string) => {
  const docRef = doc(FIREBASE_DB, document, field);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();
  return new Error("empty");
};

export const addSentenceToFirestore = async (
  title: string,
  content: string[],
  uid: string,
  sentenceId: string
) => {
  const docRef = doc(FIREBASE_DB, "sentence", "forTyping");

  const data: Sentence = {
    title: title,
    content: content,
    uid: uid,
    sentenceId: sentenceId,
  };

  await updateDoc(docRef, {
    content: arrayUnion(data),
  }).catch(async () => {
    await setDoc(docRef, {
      content: [data],
    });
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
    await setDoc(docRef, {
      [uid]: record,
    });
  else if (prevSpeed < Number(record.speed) && Number(record.accuracy) >= 80)
    await updateDoc(docRef, {
      [uid]: record,
    });
};

export const addUserInfoToFirestore = async (info: UserInfo, uid: string) => {
  const docRef = doc(FIREBASE_DB, uid, "info");

  await setDoc(docRef, {
    name: info.name,
    photoUrl: info.photoUrl,
    email: info.email,
  });
};

export const addRecordForUserToFirestore = async (
  record: Record & { sentenceId: string },
  uid: string
) => {
  const docRef = doc(FIREBASE_DB, uid, "completeSentence");
  const prevRecord = await getFirestoreDocData(uid, "completeSentence");

  if (
    prevRecord[record.sentenceId] &&
    prevRecord[record.sentenceId]["speed"] > record.speed
  )
    return;
  return updateDoc(docRef, {
    [record.sentenceId]: {
      speed: record.speed,
      accuracy: record.accuracy,
    },
  }).catch(async () => {
    await setDoc(docRef, {
      [record.sentenceId]: {
        speed: record.speed,
        accuracy: record.accuracy,
      },
    });
  });
};

export const addNewOwnSentenceForUserToFirestore = async (
  sentenceId: string,
  uid: string
) => {
  const docRef = doc(FIREBASE_DB, uid, "ownSentence");

  await updateDoc(docRef, {
    sentenceId: arrayUnion(sentenceId),
  }).catch(async () => {
    await setDoc(docRef, {
      sentenceId: [sentenceId],
    });
  });
};
