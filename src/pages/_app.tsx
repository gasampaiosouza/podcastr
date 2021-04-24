import 'styles/global.scss';

import { Header } from 'src/components/Header';
import { Player } from 'src/components/Player';

import styles from 'styles/app.module.scss';
import { PlayerContextProvider } from 'src/contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
