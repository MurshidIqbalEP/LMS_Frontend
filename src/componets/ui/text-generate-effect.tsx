import useTypewriter from "../../hooks/useTypewriter";

interface TypewriterProps {
  text: string;
  speed: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p className="text-6xl mt-1 md:text-9xl text-right  font-black  -tracking-normal md:leading-28 ">{displayText}</p>;
};

export default Typewriter;
