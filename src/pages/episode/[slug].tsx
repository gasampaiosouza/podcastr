import Image from 'next/image';
import Link from 'next/link';

import { Episodes } from 'interfaces';
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from 'src/services/api';
import { getParsedEpisodes } from 'src/utils/getParsedEpisodes';

import styles from './Episode.module.scss';

type IEpisode = {
  episode: Episodes;
};

export default function Episode({ episode }: IEpisode) {
  return (
    <div className={styles.container}>
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

        <button>
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
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = getParsedEpisodes(data);

  return {
    props: { episode },
    revalidate: 216000 * 31, // 31 days
  };
};
