export function formatMS(totalSeconds) {
  const minute = Math.floor(totalSeconds / 60);
  const second = totalSeconds % 60;
  const mm = String(minute).padStart(2, "0");
  const ss = String(second).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function toTotalSeconds(minutes, seconds) {
  return minutes * 60 + seconds;
}

export function displayFormat(minutes, seconds) {
  return formatMS(toTotalSeconds(minutes, seconds));
}