import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { PlayerContainer, CurrentEpisode, EmptyPlayer, Progress, SliderStyle, EmptySlider, ButtonsContainer, Buttons, Footer, ImageContainer, MobileInfo } from './styles'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    setPlayingState,
    clearPlayerState,
  } 
  = usePlayer();

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }

    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  // Sincroniza metadados e ações de controle com a Media Session do celular (tela de bloqueio / fones)
  useEffect(() => {
    const nav = typeof window !== 'undefined' ? (navigator as any) : null;
    if (nav && 'mediaSession' in nav && episode) {
      const MediaMetadataClass = (window as any).MediaMetadata;
      if (MediaMetadataClass) {
        nav.mediaSession.metadata = new MediaMetadataClass({
          title: episode.title,
          artist: episode.members || 'IGCGMusic',
          album: 'PodCrer',
          artwork: [
            { src: episode.thumbnail, sizes: '96x96', type: 'image/png' },
            { src: episode.thumbnail, sizes: '128x128', type: 'image/png' },
            { src: episode.thumbnail, sizes: '192x192', type: 'image/png' },
            { src: episode.thumbnail, sizes: '256x256', type: 'image/png' },
            { src: episode.thumbnail, sizes: '384x384', type: 'image/png' },
            { src: episode.thumbnail, sizes: '512x512', type: 'image/png' },
          ]
        });
      }

      nav.mediaSession.setActionHandler('play', () => {
        togglePlay();
      });
      nav.mediaSession.setActionHandler('pause', () => {
        togglePlay();
      });
      nav.mediaSession.setActionHandler('previoustrack', () => {
        if (hasPrevious) {
          playPrevious();
        }
      });
      nav.mediaSession.setActionHandler('nexttrack', () => {
        if (hasNext) {
          playNext();
        }
      });
    }
  }, [episode, hasNext, hasPrevious, playNext, playPrevious, togglePlay]);

  // Sincroniza o estado do play/pause com a Media Session
  useEffect(() => {
    const nav = typeof window !== 'undefined' ? (navigator as any) : null;
    if (nav && 'mediaSession' in nav) {
      nav.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodesEnded() {
    if(hasNext) {
      // Obter o índice da próxima faixa de forma síncrona
      const nextIndex = isShuffling 
        ? Math.floor(Math.random() * episodeList.length)
        : currentEpisodeIndex + 1;
      
      const nextEpisode = episodeList[nextIndex];
      if (nextEpisode && audioRef.current) {
        // Altera o source e dá play sincronicamente antes do navegador suspender o processo em background
        audioRef.current.src = nextEpisode.url;
        audioRef.current.load();
        audioRef.current.play().catch(err => {
          console.warn("Erro ao reproduzir faixa de forma síncrona no background:", err);
        });
      }
      playNext();
    } else {
      clearPlayerState();
    }
  }

  return (
    <PlayerContainer>
      <MobileInfo>
        <img src="/info.svg" width="25px" height="25px" />
        {episode ? (
          <div id="infobox">
            <span>Tocando agora:</span>
            <strong>{episode.title}</strong>
          </div>
        ) : (
          <div id="infobox">
            <strong>Selecione uma música para ouvir!</strong>
          </div>
        ) }
      </MobileInfo>

      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <CurrentEpisode>
          <ImageContainer>
            <Image 
              width={592} 
              height={592} 
              src={episode.thumbnail} 
              objectFit="cover"
            />
          </ImageContainer>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione uma música para ouvir</strong>
        </EmptyPlayer>
      ) }

      <Footer isEmpty={!episode? true : false}>
        <Progress>
          <span>{convertDurationToTimeString(progress)}</span>
          <SliderStyle>
            { episode ? (
              <Slider 
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#B3CDBE'}}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
              />
              ) : (
                <EmptySlider />
              ) 
            }
          </SliderStyle>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </Progress>

        { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodesEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <ButtonsContainer>
          <Buttons isActive={isShuffling ? true : false} type="button" onClick={toggleShuffle} disabled={!episode || episodeList.length == 1}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </Buttons>

          <Buttons type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </Buttons>

          <Buttons isPlayButton={true} type="button" disabled={!episode} onClick={togglePlay}> 
            { isPlaying ? (<img src="/pause.svg" alt="Tocar" />) : (<img src="/play.svg" alt="Tocar" />)}
          </Buttons>

          <Buttons type="button" onClick={playNext} disabled={!episode || !hasNext}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </Buttons>
          
          <Buttons isActive={isLooping ? true : false} type="button" onClick={toggleLoop} disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </Buttons>
        </ButtonsContainer>

      </Footer>
    </PlayerContainer>
  );
}

