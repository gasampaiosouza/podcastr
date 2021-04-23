import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Episodes } from 'interfaces';
import { api } from 'src/services/api';
import { convertDurationToTimeString } from 'src/utils/convertDurationToTimeString';

import styles from './Home.module.scss';
import { getParsedEpisodes } from 'src/utils/getParsedEpisodes';

type IHome = {
  latestEpisodes: Episodes[];
  allEpisodes: Episodes[];
};

export default function Home({ latestEpisodes, allEpisodes }: IHome) {
  return (
    <div className={styles.container}>
      <section className={styles['latest-episodes']}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode) => (
            <li key={episode.id}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />

              <div className={styles['episode-details']}>
                <Link href={`/episode/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>

                <span>{episode.published_at}</span>
                <span>{episode.formatted_duration}</span>
              </div>

              <button>
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles['all-episodes']}>
        <h2>Todos os episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map((episode) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>

                <td>
                  <Link href={`/episode/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.published_at}</td>
                <td>{episode.formatted_duration}</td>
                <td>
                  <button>
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<Episodes[]>(`/episodes`, {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = getParsedEpisodes(data);
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: { allEpisodes, latestEpisodes },
    revalidate: 60 * 60 * 8,
  };
};
