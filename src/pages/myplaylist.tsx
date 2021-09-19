import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

//Notificação addQueue
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format, parseISO } from 'date-fns'; //parseISO pega uma string e converte para um Date do JS
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api'; //fakeapi
import { usePlayer } from '../contexts/PlayerContext';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import { AllEpisodes, EpisodeDetails, HomepageComponent, ImageContainer, AllEpisodesTable, AllEpisodesCard, ButtomPrevious, StyledButtom } from '../styles/index';
import { ThumbnailContainer } from '../styles/episode'

//chamada API em SSG(Static site generator) => faz o mesmo que o SSR porém mudando o nome da função e 
//passando no return a opção de revalidate com os segundos para acontecer o recarregamento da api
//então com este metodo quando uma pessoa acessar a home, é gerado um html estático que será mostrado para
//as proximas pessoa que acessarem o site, e mudará apenas quando a api carregar novamente, assim repetindo o processo

export default function myplaylist() {
  const emojiChoose = [
    '🎵',
    '🎶',
    '📻',
    '🎤',
    '🎼',
    '🎧',
    '🎷',
    '🎸',
    '🎹',
    '🥁',
    '🎺',
    '📯',
    '🎻',
    '🪕',
    '🔉',
    '🔊'
  ];
  function random(mn, mx) { 
    return Math.random() * (mx - mn) + mn; 
  } 
  
  const { playList, personalPlayList, clearPersonalPlayList, customizePlayList } = usePlayer();

  return (
    <HomepageComponent>
      <ToastContainer />
      <Head>
        <title>Sua PlayList | IGCGMusic</title>
      </Head>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20}} >
            <ThumbnailContainer>
                <Link href="/">
                <button>
                    <img src="/arrow-left.svg" alt="Voltar"/>
                </button>
                </Link>
                
                <Image 
                width={700}
                height={160}
                src="https://igcgcloud.netlify.app/images/playlistthumb.png"
                objectFit="cover"
                />
                <button type="button" onClick={() => { playList(customizePlayList, 0), personalPlayList(Object([{"id": "vinheta-1-igcg", "thumbnail": "https://igcgcloud.netlify.app/images/default.png"}]), 0) }}>
                <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </ThumbnailContainer>
        </div>
        <AllEpisodes>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Sua PlayList</h2>
          <button style={{background: 'none', border: 'none'}} onClick={ () => {
              toast.success("Playlist limpa", {
                icon: emojiChoose[Math.floor(random(1,17))-1],
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }),
              clearPersonalPlayList()
          }}><img width={30} height={30} src="/trash.svg" alt="limpar playlist" /></button>
        </div>

          <AllEpisodesTable cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Músicas</th>
                <th>Autores</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customizePlayList.map((episode, index) =>{
                return (
                  <tr key={episode.id}>
                    <td style={{width: 72}}>
                      <Image 
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/music/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{width: 100}}>
                      <button type="button" onClick={() => playList(customizePlayList, index)}>
                        <img src="/play-green.svg" alt="Tocar episódio" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </AllEpisodesTable>

          <AllEpisodesCard>
            <ul>
              {customizePlayList.map((episode, index) =>{
                return (
                  <li key={episode.id}>
                    <ImageContainer>
                      <Image 
                        width={192}
                        height={192} 
                        src={episode.thumbnail} 
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </ImageContainer>

                    <EpisodeDetails>
                      <Link href={`/music/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                      <p>{episode.members}</p>
                    </EpisodeDetails>

                    <button id="playMusic" type="button" onClick={() => playList(customizePlayList, index)}>
                      <img src="/play-green.svg" alt="Tocar episódio"/>
                    </button>
                  </li>
                )
              })}
            </ul>
          </AllEpisodesCard>
        </AllEpisodes>
    </HomepageComponent>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('slug', {
    params: {
      _limit: 1000,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  })
  const allEpisodes = episodes.slice(0, episodes.length);

  return {
      props: {
        allEpisodes,
      },
      revalidate: 60 * 60 * 8,
  }
}


//SPA:
/* export default function Home(props) {
  chamada API no formato SPA (ñ é indexável à google pois "demora" um pouco para carregar)
    useEffect(() => {
      fetch('http://localhost:3333/episodes')
        .then(response => response.json())
        .then(data => console.log(data))
    }, [])

  return (
      <div>
          <h1>Index</h1>

          <p>{JSON.stringify(props.episodes)}</p>
      </div>
  )
} */

/* SSR:
chamada API em SSR(Server side rendering) => basta ir em qualquer arquivo da pasta pages e fazer o seguinte:
executa a função toda vez que a pagina é carregada por alguem
export default function Home(props) {
  return (
      <div>
          <h1>Index</h1>

          <p>{JSON.stringify(props.episodes)}</p>
      </div>
  )
}
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
} */
