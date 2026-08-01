type IconProps = { className?: string };

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M7.5 5.14v13.72a1.5 1.5 0 0 0 2.29 1.28l11.13-6.86a1.5 1.5 0 0 0 0-2.56L9.79 3.86A1.5 1.5 0 0 0 7.5 5.14Z" />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M7 4.5h2.5A1.5 1.5 0 0 1 11 6v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 18V6A1.5 1.5 0 0 1 7 4.5Zm7.5 0H17A1.5 1.5 0 0 1 18.5 6v12a1.5 1.5 0 0 1-1.5 1.5h-2.5A1.5 1.5 0 0 1 13 18V6a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );
}

export function SpinnerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`animate-spin ${className ?? ""}`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SPEAKER_BODY =
  "M11.3 4.6 6.6 8.9H3.9A1.4 1.4 0 0 0 2.5 10.3v3.4a1.4 1.4 0 0 0 1.4 1.4h2.7l4.7 4.3a1 1 0 0 0 1.7-.74V5.34a1 1 0 0 0-1.7-.74Z";

export function SpeakerHighIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={SPEAKER_BODY} />
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M16.3 8.6a4.8 4.8 0 0 1 0 6.8" />
        <path d="M18.9 5.9a8.6 8.6 0 0 1 0 12.2" />
      </g>
    </svg>
  );
}

export function SpeakerLowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={SPEAKER_BODY} />
      <path
        d="M16.3 8.6a4.8 4.8 0 0 1 0 6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpeakerMutedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={SPEAKER_BODY} />
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="m16.4 9.6 5 4.8" />
        <path d="m21.4 9.6-5 4.8" />
      </g>
    </svg>
  );
}

export function SoundCloudIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <rect x="1.5" y="13" width="1.6" height="5" rx="0.8" />
      <rect x="4.6" y="11" width="1.6" height="7" rx="0.8" />
      <rect x="7.7" y="9.6" width="1.6" height="8.4" rx="0.8" />
      <rect x="10.8" y="7.2" width="1.6" height="10.8" rx="0.8" />
      <path d="M14 18V9a5.4 5.4 0 0 1 5.4 2.8A3.6 3.6 0 0 1 18.8 18H14Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}
