/**
 * A radio station: a name to display and a stream to listen to.
 * Knows nothing about how the stream is fetched or rendered.
 */
export type Station = {
  readonly name: string;
  readonly streamUrl: string;
};

export function createStation(name: string, streamUrl: string): Station {
  const stationName = name.trim();
  if (stationName.length === 0) {
    throw new Error("A station needs a name.");
  }
  if (!isPlayableStreamUrl(streamUrl)) {
    throw new Error(`"${streamUrl}" is not a playable stream URL.`);
  }
  return { name: stationName, streamUrl };
}

function isPlayableStreamUrl(candidate: string): boolean {
  try {
    const { protocol } = new URL(candidate);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
