import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';


import { format, parseISO } from 'date-fns'; //parseISO pega uma string e converte para um Date do JS
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../../services/api'; //fakeapi
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { AllEpisodes, EpisodeDetails, HomepageComponent, LatestEpisodes, ImageContainer, AllEpisodesTable, AllEpisodesCard, ButtomPrevious } from '../../styles/index';

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
}

//chamada API em SSG(Static site generator) => faz o mesmo que o SSR porém mudando o nome da função e 
//passando no return a opção de revalidate com os segundos para acontecer o recarregamento da api
//então com este metodo quando uma pessoa acessar a home, é gerado um html estático que será mostrado para
//as proximas pessoa que acessarem o site, e mudará apenas quando a api carregar novamente, assim repetindo o processo

export default function cddoo({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <HomepageComponent>
        
      <Head>
        <title>CD 288 | IGCGMusic</title>
      </Head>

      <LatestEpisodes>
        <Link href={'/'}>
            <ButtomPrevious>
            <img src="/arrow-left.svg" alt="Voltar"/>
            <h3> Voltar</h3>
            </ButtomPrevious>
        </Link>
        <h2>Destaques</h2>
        <ul>
          {latestEpisodes.map((episode, index) =>{
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
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </EpisodeDetails>

                <button type="button" onClick={() => playList(episodeList, index)}>
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>
              </li>
            )
          })}
        </ul>
        </LatestEpisodes>

        <AllEpisodes>
          <h2>Todas as músicas</h2>

          <AllEpisodesTable cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Músicas</th>
                <th>Autores</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map((episode, index) =>{
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
                    <td style={{width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button" onClick={() => playList(episodeList, index + latestEpisodes.length)}>
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
              {allEpisodes.map((episode, index) =>{
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
                      <span>{episode.publishedAt}</span>
                      <span>{episode.durationAsString}</span>
                    </EpisodeDetails>

                    <button type="button" onClick={() => playList(episodeList, index + latestEpisodes.length)}>
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
  const { data } = await api.get('doisoo', {
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

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
      props: {
        latestEpisodes,
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