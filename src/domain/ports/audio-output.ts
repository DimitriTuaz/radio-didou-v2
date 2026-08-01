/**
 * The way out of the domain: something able to turn a stream URL into sound.
 * Implemented in the infrastructure layer (see `html-audio-output`), so the
 * domain and the use cases never touch the DOM.
 */
export type AudioOutputEvents = {
  /** Sound is actually coming out — the stream is connected. */
  onPlaying: () => void;
  /** The stream could not be reached, or the browser refused to play it. */
  onFailure: () => void;
};

export type AudioOutput = {
  play: (streamUrl: string) => void;
  stop: () => void;
  changeVolume: (value: number) => void;
  changeMuted: (muted: boolean) => void;
  subscribe: (events: AudioOutputEvents) => () => void;
  dispose: () => void;
};
