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

  // sentenceId 문장의 기록이 없을 때
  if (isEmpty(prevRecord))
    return await setDoc(docRef, {
      [uid]: record,
    });
  // sentenceId 문장에 다른 사람의 기록이 존재하는데 내 기록이 없을 때
  if (isEmpty(prevRecord))
    return await updateDoc(docRef, {
      [uid]: record,
    });
  // 내 기록이 존재하는데 지금 세운 기록이 이전 기록보다 높고, 정확도가 80프로 이상일때
  if (prevSpeed < Number(record.speed) && Number(record.accuracy) >= 80)
    return await updateDoc(docRef, {
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
