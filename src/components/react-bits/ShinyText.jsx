import React from 'react';

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${
        disabled
          ? 'text-[var(--text-primary)]'
          : 'animate-shiny-text bg-gradient-to-r from-[var(--text-primary)] via-indigo-300 to-[var(--text-primary)] dark:via-indigo-400 bg-[length:200%_auto]'
      } ${className}`}
      style={{
        animationDuration: disabled ? undefined : animationDuration,
      }}
    >
      {text}
    </span>
  );
}
