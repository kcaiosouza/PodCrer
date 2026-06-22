import React, { useState, useEffect } from 'react';
import { 
  Overlay, 
  ModalContainer, 
  CloseIconButton, 
  ModalHeader, 
  BetaBadge, 
  Title, 
  Description, 
  ButtonGroup, 
  PrimaryButton, 
  SecondaryButton 
} from './styles';

export function BetaModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only access sessionStorage on the client side
    const hasSeen = sessionStorage.getItem('hasSeenBetaModal');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('hasSeenBetaModal', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseIconButton onClick={handleClose} aria-label="Fechar modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </CloseIconButton>

        <ModalHeader>
          <BetaBadge>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </BetaBadge>
          <Title>O novo IGCGMusic chegou!</Title>
        </ModalHeader>

        <Description>
          <p>
            Estamos preparando uma experiência completamente nova, e você já pode testá-la. Como toda versão Beta, alguns detalhes ainda estão sendo ajustados e podem ocorrer pequenos problemas durante o uso. Estamos trabalhando constantemente para deixar tudo ainda melhor.
          </p>
          <p>
            Se quiser conhecer as novidades antes de todo mundo, basta acessar a versão Beta. Caso prefira, você também pode continuar utilizando a versão estável normalmente.
          </p>
        </Description>

        <ButtonGroup>
          <PrimaryButton 
            href="https://beta.igcgmusic.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 15 2 22"/>
              <path d="M15 9h.01"/>
            </svg>
            Acessar Beta
          </PrimaryButton>

          <SecondaryButton onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Permanecer na versão estável
          </SecondaryButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}
