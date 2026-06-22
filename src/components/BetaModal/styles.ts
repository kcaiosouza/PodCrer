import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

export const ModalContainer = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.backgroundDeep};
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(4, 211, 97, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${scaleUp} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (max-width: 480px) {
    padding: 1.75rem;
    gap: 1.25rem;
  }
`;

export const CloseIconButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text200};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.text800};
    background: ${props => props.theme.colors.backgroundDeep};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BetaBadge = styled.div`
  background: linear-gradient(135deg, rgba(4, 211, 97, 0.15) 0%, rgba(3, 168, 78, 0.1) 100%);
  color: ${props => props.theme.colors.secondary};
  border: 1px solid rgba(4, 211, 97, 0.3);
  padding: 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(4, 211, 97, 0.1);
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text800};
  line-height: 1.3;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.text500};
    margin: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const PrimaryButton = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #04d361 0%, #03a84e 100%);
  color: #ffffff !important;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 8px 16px rgba(4, 211, 97, 0.2);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(4, 211, 97, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translate(2px, -2px);
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: transparent;
  color: ${props => props.theme.colors.text800};
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.colors.backgroundDeep};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundDeep};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
