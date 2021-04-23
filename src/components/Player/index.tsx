import styles from './styles.module.scss';

export const Player: React.FC = () => {
  return (
    <section className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles['empty-player']}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles['empty-slider']} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles['buttons-container']}>
          <button>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button className={styles['play-button']}>
            <img src="/play.svg" alt="Tocar" />
          </button>

          <button>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>

          <button>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </section>
  );
};
