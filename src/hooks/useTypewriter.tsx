import { useState, useEffect } from 'react';

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText(''); // Reset display text for each new input text.

    const typingInterval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1)); // Efficient slicing approach
      i++;

      if (i >= text.length) {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
