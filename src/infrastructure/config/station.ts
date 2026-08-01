import { createStation, type Station } from "@/domain/station";

/**
 * v1 read this from `config.yaml` and served it to the browser through
 * `GET /configuration`. Here it stays on the server and is handed to the page
 * as a prop, so the values are never variables the client has to fetch.
 *
 * Defaults match the Icecast mount declared in `config-files/audio/radio-didou.liq`.
 */
const DEFAULT_NAME = "Radio Didou";
const DEFAULT_STREAM_URL = "http://37.59.99.228:8889/radio-didou";

export function getStation(): Station {
  return createStation(
    process.env.RADIO_STATION_NAME ?? DEFAULT_NAME,
    process.env.RADIO_STREAM_URL ?? DEFAULT_STREAM_URL,
  );
}
