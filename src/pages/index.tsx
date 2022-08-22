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

import { AllEpisodes, EpisodeDetails, HomepageComponent, LatestEpisodes, ImageContainer, AllEpisodesTable, AllEpisodesCard } from '../styles/index';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  publishedAt: string;
  url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
  shuffleEpisodes: Episodes[];
}

//chamada API em SSG(Static site generator) => faz o mesmo que o SSR porém mudando o nome da função e 
//passando no return a opção de revalidate com os segundos para acontecer o recarregamento da api
//então com este metodo quando uma pessoa acessar a home, é gerado um html estático que será mostrado para
//as proximas pessoa que acessarem o site, e mudará apenas quando a api carregar novamente, assim repetindo o processo

export default function Home({ latestEpisodes, allEpisodes, shuffleEpisodes }: HomeProps) {
  const { playList, toggleShuffle } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];
  
  async function randomplaylist() {
    toast.warn("Aguarde... Estamos criando uma playlist para você", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      toastId: 'criarplaylist'
    })

    console.log("Coletei os dados da API, Olha ela ai a baixo:")
    console.log(shuffleEpisodes);
  
    const episodes = shuffleEpisodes.map(music => {
      return {
        id: music.id,
        title: music.title,
        thumbnail: music.thumbnail,
        members: music.members,
        duration: music.duration,
        durationAsString: music.durationAsString,
        url: music.url,
      }
    })
    
    console.log("Mapiei a API")

    const playListRandom = [...episodes]

    for (let i = playListRandom.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playListRandom[i], playListRandom[j]] = [playListRandom[j], playListRandom[i]];
    }

    console.log(playListRandom)

    playList(Object(playListRandom), 0);
    console.log("Toquei a Musica")
    setTimeout(function() {
      toast.update('criarplaylist', {
        render: "Playlist criada com sucesso. Bom desfrute!",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000
      })
    }, 1000)
  }
  return (
    <HomepageComponent>
       <ToastContainer /> 
      <Head>
        <title>Home | IGCGMusic</title>
      </Head>

      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((data) =>{
            return (
              <li key={data.id}>
                <ImageContainer>
                  <Image 
                    width={192}
                    height={192} 
                    src={data.thumbnail} 
                    alt={data.title}
                    objectFit="cover"
                  />
                </ImageContainer>

                <EpisodeDetails>
                  <Link href={`/${data.id}`}>
                    <a>{data.title}</a>
                  </Link>
                  <p>{data.members}</p>
                  <span>{data.publishedAt}</span>
                  <span>{data.durationAsString}</span>
                </EpisodeDetails>
              </li>
            )
          })}
        </ul>
        </LatestEpisodes>

        <AllEpisodes>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >

            <h2>Todos os CDs</h2>
            <button

            style={{
              backgroundColor: '#b3cdbe',
              border: 0,
              borderRadius: 30,
              paddingRight: 15,
              paddingLeft: 15,
              paddingTop: 10,
              paddingBottom: 10,
              color:'#fff',
              fontSize: 16,
              fontWeight: 'bold',
              display:'flex',
              alignItems: 'center'}}

            onClick={() => { randomplaylist() }}>
              
              SURPREENDA-ME
            <img style={{marginLeft: 10}}
              src="/shuffle.svg"
              alt="shuffle"/></button>

          </div>
          <AllEpisodesTable cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>CDs</th>
                <th>Autores</th>
                <th>Data</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map((data) =>{
                return (
                  <tr key={data.id}>
                    <td style={{width: 72}}>
                      <Image 
                        width={120}
                        height={120}
                        src={data.thumbnail}
                        alt={data.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/${data.id}`}>
                        <a>{data.title}</a>
                      </Link>
                    </td>
                    <td>{data.members}</td>
                    <td style={{width: 100}}>{data.publishedAt}</td>
                    <td style={{width: 10}}>{data.durationAsString}</td>
                  </tr>
                )
              })}
            </tbody>
          </AllEpisodesTable>

          <AllEpisodesCard>
            <ul>
              {allEpisodes.map((data) =>{
                return (
                  <li key={data.id}>
                    <ImageContainer>
                      <Image 
                        width={192}
                        height={192} 
                        src={data.thumbnail} 
                        alt={data.title}
                        objectFit="cover"
                      />
                    </ImageContainer>

                    <EpisodeDetails>
                      <Link href={`/${data.id}`}>
                        <a>{data.title}</a>
                      </Link>
                      <p>{data.members}</p>
                      <span>{data.publishedAt}</span>
                      <span>{data.durationAsString}</span>
                    </EpisodeDetails>
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
  const home = await api.get('home', {
    params: {
      _limit: 1000,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const slug = await api.get('slug', {
    params: {
      _limit: 5000,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = home.data.map(episode => {
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

  const shuffle = slug.data.map(episode => {
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

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  const shuffleEpisodes = shuffle;

  return {
      props: {
        latestEpisodes,
        allEpisodes,
        shuffleEpisodes,
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
