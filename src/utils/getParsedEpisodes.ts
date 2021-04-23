import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Episodes } from 'interfaces';
import { convertDurationToTimeString } from './convertDurationToTimeString';

export function getParsedEpisodes(data: Episodes[] | Episodes) {
  const PARSE_DATA = (episode: Episodes) => {
    const published_at = format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    });

    return {
      ...episode,
      published_at,
      formatted_duration: convertDurationToTimeString(episode.file.duration),
    };
  }

  if (Array.isArray(data)) {
    const FINAL_DATA = data.map(PARSE_DATA);

    return FINAL_DATA;
  }

  return PARSE_DATA(data);
}
