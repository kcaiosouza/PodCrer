import { useContext } from 'react';
import Switch from 'react-switch';
import DarkModeToggle from "react-dark-mode-toggle";

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

//import styles from './styles.module.scss';
import { HeaderContainer } from './styles';
import { ThemeContext } from 'styled-components';

interface Props {
  toggleTheme(): void;
}

export function Header(props: Props) {
  const { toggleTheme } = props;
  const { colors, title } = useContext(ThemeContext);
  
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  });



  return (
    <HeaderContainer>
      <img src={ title === 'light' ? "/logo.svg" : "/logo-light.svg"} alt="Logo"/>

      <p>Desfrutar é bem melhor</p>
      <span>{currentDate}</span>

      <DarkModeToggle
      onChange={toggleTheme}
      checked={title === 'dark'}
      size={40}
      />
    </HeaderContainer>
  );
}