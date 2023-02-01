import { isEmpty } from "@firebase/util";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { Record, Sentence, UserInfo } from "../backend/dto";
import { undefinedConverter } from "./utils";

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

export const addUserInfoToFirestore = async (info: UserInfo) => {
  const docRef = doc(FIREBASE_DB, "user", info.uid);
  const userData = await getFirestoreDocData("user", info.uid);

  await setDoc(docRef, {
    info: info,
    ownSentence: undefinedConverter(userData.ownSentence),
    completeSentence: undefinedConverter(userData.completeSentence),
  });
};

export const addRecordForUserToFirestore = async (
  record: Record & { sentenceId: string },
  uid: string
) => {
  const docRef = doc(FIREBASE_DB, "user", uid);
  const userData = await getFirestoreDocData("user", uid);

  const prevRecord: (Record & { sentenceId: string })[] | undefined =
    userData?.completeSentence;

  if (prevRecord) {
    const prevSpeed = prevRecord.filter(
      (prev) => prev.sentenceId === record.sentenceId
    )[0]["speed"];
    if (prevSpeed > record.speed) return;

    await setDoc(docRef, {
      info: undefinedConverter(userData.info),
      ownSentence: undefinedConverter(userData.ownSentence),
      completeSentence: [
        ...prevRecord.filter((prevR) => {
          return prevR.sentenceId !== record.sentenceId;
        }),
        record,
      ],
    });
  } else
    await setDoc(docRef, {
      info: undefinedConverter(userData.info),
      ownSentence: undefinedConverter(userData.ownSentence),
      completeSentence: [record],
    });
};

export const addNewOwnSentenceForUserToFirestore = async (
  sentence: string,
  uid: string
) => {
  const docRef = doc(FIREBASE_DB, "user", uid);
  const userData = await getFirestoreDocData("user", uid);
  const prevOwn: string[] | undefined = userData.ownSentence;

  if (prevOwn)
    await setDoc(docRef, {
      info: undefinedConverter(userData.info),
      ownSentence: [...prevOwn, sentence],
      completeSentence: undefinedConverter(userData.completeSentence),
    });
  else
    await setDoc(docRef, {
      info: undefinedConverter(userData.info),
      ownSentence: [sentence],
      completeSentence: undefinedConverter(userData.completeSentence),
    });
};
