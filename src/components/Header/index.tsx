import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function  Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    return(
        <header className={styles.headerContainer}>
            <img width={60} height={60} src="/headphone.svg" alt="IGCGMusic"/>
            <img width={192} height={84} src="/logo.svg" alt="IGCGMusic"/>

            <p>Desfrutar é bem melhor!</p>

            <span>{currentDate}</span>
        </header>
    );
}