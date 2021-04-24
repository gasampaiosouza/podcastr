import { Episodes } from 'interfaces';
import { createContext, ReactNode, useState, useContext } from 'react';

type IPlayerContext = {
  episodeList: Episodes[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasPreviousEpisode: boolean;
  hasNextEpisode: boolean;
  isLooping: boolean;
  isShuffling: boolean
  clearPlayerState: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  play: (episode: Episodes) => void;
  playList: (list: Episodes[], index: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
};

// little bit of ts hacking
export const PlayerContext = createContext({} as IPlayerContext);

type IPlayerContextProvider = {
  children: ReactNode;
};

// PROVIDER with values
export function PlayerContextProvider({ children }: IPlayerContextProvider) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episodes) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episodes[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPreviousEpisode = currentEpisodeIndex > 0;
  const hasNextEpisode = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (!hasNextEpisode) return;

    if (isShuffling) {
      const randomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(randomEpisodeIndex);
      return;
    }

    setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function playPrevious() {
    if (!hasPreviousEpisode) return;

    setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        togglePlay,
        isPlaying,
        setPlayingState,
        hasPreviousEpisode,
        hasNextEpisode,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
