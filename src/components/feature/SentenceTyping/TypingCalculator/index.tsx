import { useEffect, useState } from "react";

type Props = {
  answer: string;
  input: string;
  typeAmount: number;
};

export default function TypingCalculator({ answer, input, typeAmount }: Props) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [typeSpeed, setTypeSpeed] = useState<number>(0);
  const [typeAccuracy, setTypeAccuracy] = useState<number>(0);
  const [interv, setInterv] = useState<NodeJS.Timer>();
  const [isTypingStart, setIsTypingStart] = useState<boolean>(false);

  const answerArray = answer.split("");
  const inputArray = input.split("");

  useEffect(() => {
    if (input === "") setIsTypingStart(false);
    else setIsTypingStart(true);
  }, [input]);

  useEffect(() => {
    if (isTypingStart) {
      setCurrentTime((currentTime) => (currentTime += 1));
      setInterv(
        setInterval(() => {
          setCurrentTime((current) => (current += 1));
        }, 100)
      );
    } else clearInterval(interv);
  }, [isTypingStart]);

  useEffect(() => {
    setCurrentTime(0);
  }, [answer]);

  useEffect(() => {
    if (currentTime !== 0 && typeAmount !== 0)
      setTypeSpeed(Math.floor((typeAmount / currentTime) * 600));
  }, [currentTime, typeAmount]);

  useEffect(() => {
    if (input !== "")
      setTypeAccuracy(
        Math.floor(
          (answerArray.filter((v, i) => v === inputArray[i]).length /
            input.length) *
            100
        )
      );
  }, [input]);

  return (
    <>
      속도: {typeSpeed} 정확도: {typeAccuracy}
    </>
  );
}
