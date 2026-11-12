import React, { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  className = '',
  parentClassName = '',
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const runDecryption = () => {
      interval = setInterval(() => {
        setDisplayText((current) =>
          text
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / (maxIterations / text.length);
      }, speed);
    };

    runDecryption();

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, isHovered]);

  return (
    <span
      className={`inline-block font-mono ${parentClassName}`}
      onMouseEnter={() => setIsHovered((prev) => !prev)}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
