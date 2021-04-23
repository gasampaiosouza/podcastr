export type Episodes = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: { url: string; type: string; duration: number };
  formatted_duration: string;
};
