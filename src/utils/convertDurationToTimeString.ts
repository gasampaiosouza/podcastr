export function convertDurationToTimeString(duration: number) {
  const HOURS = Math.floor(duration / 3600);
  const MINUTES = Math.floor((duration % 3600) / 60);
  const SECONDS = duration % 60;

  const TIME_STRING = [HOURS, MINUTES, SECONDS]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');

  return TIME_STRING;
}
