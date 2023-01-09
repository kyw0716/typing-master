type Props = {
  sentence: string[];
  index: number;
};

export default function SentenceGenerator({ sentence, index }: Props) {
  return sentence[index];
}
