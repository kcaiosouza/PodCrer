import React from 'react';
import { ToggleContainer, ToggleThumb, IconWrapper } from './styles';

interface ThemeToggleProps {
  checked: boolean;
  onChange: () => void;
}

export function ThemeToggle({ checked, onChange }: ThemeToggleProps) {
  return (
    <ToggleContainer onClick={onChange} aria-label="Alterar tema" isDark={checked} type="button">
      <IconWrapper className="sun" isDark={checked}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </IconWrapper>
      
      <IconWrapper className="moon" isDark={checked}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      </IconWrapper>

      <ToggleThumb isDark={checked} />
    </ToggleContainer>
  );
}
