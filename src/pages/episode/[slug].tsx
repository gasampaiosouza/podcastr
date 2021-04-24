import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { Episodes } from 'interfaces';
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';

import styles from './Episode.module.scss';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { convertDurationToTimeString } from 'src/utils/convertDurationToTimeString';
import { usePlayer } from 'src/contexts/PlayerContext';

type IEpisode = {
  episode: Episodes;
};

export default function Episode({ episode }: IEpisode) {
  const { play } = usePlayer();

  return (
    <div className={styles.container}>
      <Head>
        <title>{episode.title}</title>
      </Head>

      <div className={styles['thumbnail-container']}>
        <Link href="/">
          <button>
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>

        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.formatted_duration}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<Episodes[]>(`/episodes`, {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const paths = data.map((episode) => ({
    params: { slug: episode.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get<Episodes>(`/episodes/${slug}`);

  const published_at = format(parseISO(data.published_at), 'd MMM yy', {
    locale: ptBR,
  });

  const episode = {
    ...data,
    published_at,
    formatted_duration: convertDurationToTimeString(data.file.duration),
  };

  return {
    props: { episode },
    revalidate: 216000 * 31, // 31 days
  };
};
