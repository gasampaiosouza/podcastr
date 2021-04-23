import Link from 'next/link';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export const Header: React.FC = () => {
  const CURRENT_DATE = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Podcastr" />
        </a>
      </Link>

      <p>O melhor para você ouvir, sempre</p>

      <span>{CURRENT_DATE}</span>
    </header>
  );
};
