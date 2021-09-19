import Link from 'next/link';

import { useContext } from 'react';
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

      <Link href="/">
        <img id="logo" width={250} src={ title === 'light' ? "/logoigcg.svg" : "/logoigcg-light.svg"} alt="Logo"/>
      </Link>

      <div id="hoverList">
        <Link href="/myplaylist">
        <button>
          <img width={40} src="/playlist.svg" alt="BPL" />
        </button>
        </Link>
      </div>

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