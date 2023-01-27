import { useState } from "react";

export default function useInput() {
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const resetInput = () => {
    setInputValue("");
  };

  return { inputValue, onChange, resetInput };
}
