import { createContext, useState, ReactNode, useContext } from 'react';

type Episode ={
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  customizePlayList: Episode[];
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  personalPlayList: (list: Episode[], index: number) => void;
  clearPersonalPlayList: () => void;
}


export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PLayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [customizePlayList, setCustomizePlayList] = useState([]);
  const [newElement, setNewElement] = useState({"id": "vinheta-1-igcg", "title": "Sua PlayList", "thumbnail": "https://igcgcloud.netlify.app/images/default.png"});


  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function personalPlayList(list: Episode[], index: number) {
    setNewElement(Object(list[index]));
    if (setNewElement == {}) {
      console.log("ESTOU VAZIO")
    }else {
      setCustomizePlayList(oldarray => Object([...oldarray, newElement]));
    }
  }

  function clearPersonalPlayList() {
    setCustomizePlayList([]);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
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

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if(isShuffling) {

      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);

    } else if(hasNext) {

      setCurrentEpisodeIndex(currentEpisodeIndex + 1);

    }
  }

  function playPrevious() {
    if(hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider value={{ 
      episodeList,
      currentEpisodeIndex,
      isPlaying, 
      isLooping,
      isShuffling,
      customizePlayList,
      play, 
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      togglePlay, 
      toggleLoop,
      toggleShuffle,
      setPlayingState,
      clearPlayerState,
      personalPlayList,
      clearPersonalPlayList
      }}
    >
      { children }
    </PlayerContext.Provider>
  );
}

//facilita na hora de chamar o useContext do Player em outros arquivos
export const usePlayer = () => {
  return useContext(PlayerContext);
}