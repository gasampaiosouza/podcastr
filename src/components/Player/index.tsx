import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { usePlayer } from 'src/contexts/PlayerContext';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';
import { convertDurationToTimeString } from 'src/utils/convertDurationToTimeString';

export const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasPreviousEpisode,
    hasNextEpisode,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
  } = usePlayer();

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    if (isPlaying) audioElement.play();
    else audioElement.pause();
  }, [isPlaying]);

  function setupProgressListener() {
    const audioElement = audioRef.current;
    audioElement.currentTime = 0;

    audioElement.addEventListener('timeupdate', e => {
      const currentTime = Math.floor(audioElement.currentTime);
      setProgress(currentTime);
    })
  }

  function handleEpisodeEnded() {
    if (!hasNextEpisode) {
      clearPlayerState();
      return;
    };

    playNext();
  }

  function handleSeek(amount: number) {
    const audioElement = audioRef.current;

    audioElement.currentTime = amount;
    setProgress(amount);
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <section className={styles.container}>
      <Head>
        <title>Podcastr - O melhor para você ouvir, sempre</title>
      </Head>

      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles['current-episode']}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />

          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles['empty-player']}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                max={episode.file.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ background: '#04d361' }}
                railStyle={{ background: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles['empty-slider']} />
            )}
          </div>
          <span>{convertDurationToTimeString(episode?.file.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.file.url}
            autoPlay
            onEnded={handleEpisodeEnded}
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <div className={styles['buttons-container']}>
          <button
            disabled={!episode || episodeList.length == 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles['is-active'] : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button
            disabled={!episode || !hasPreviousEpisode}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            className={styles['play-button']}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>

          <button disabled={!episode || !hasNextEpisode} onClick={playNext}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>

          <button
            className={isLooping ? styles['is-active'] : ''}
            disabled={!episode}
            onClick={toggleLoop}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </section>
  );
};
function clearPlayerState() {
  throw new Error('Function not implemented.');
}

