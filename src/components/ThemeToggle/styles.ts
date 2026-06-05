import styled from "styled-components";

export const ToggleContainer = styled.button<{ isDark: boolean }>`
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 30px;
  border: 2px solid ${props => props.isDark ? '#2a2f3a' : '#dee2e6'};
  background: ${props => props.isDark ? '#161b22' : '#f8f9fa'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  outline: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);

  &:hover {
    border-color: ${props => props.isDark ? '#495057' : '#ced4da'};
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const ToggleThumb = styled.div<{ isDark: boolean }>`
  position: absolute;
  top: 3px;
  left: ${props => props.isDark ? '35px' : '3px'};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${props => props.isDark ? '#ced4da' : '#04d361'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
`;

export const IconWrapper = styled.div<{ isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  z-index: 1;
  transition: all 0.3s ease;

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2.5px;
  }

  &.sun {
    color: ${props => props.isDark ? '#8b949e' : '#f59e0b'};
    opacity: ${props => props.isDark ? 0.4 : 1};
    transform: ${props => props.isDark ? 'rotate(-45deg) scale(0.8)' : 'rotate(0) scale(1)'};
  }

  &.moon {
    color: ${props => props.isDark ? '#58a6ff' : '#ced4da'};
    opacity: ${props => props.isDark ? 1 : 0.4};
    transform: ${props => props.isDark ? 'rotate(0) scale(1)' : 'rotate(45deg) scale(0.8)'};
  }
`;
