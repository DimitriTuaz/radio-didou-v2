"use client";

import { isConnecting, isPlaying, speakerLevel } from "@/domain/listening-session";
import {
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerLowIcon,
  SpeakerMutedIcon,
  SpinnerIcon,
} from "@/presentation/components/icons";
import { VolumeControl } from "@/presentation/components/volume-control";
import { useRadioSession } from "@/presentation/providers/radio-session-provider";

const SPEAKER_ICONS = {
  high: SpeakerHighIcon,
  low: SpeakerLowIcon,
  muted: SpeakerMutedIcon,
};

export function Player() {
  const { session, play, stop, toggleMute } = useRadioSession();

  const connecting = isConnecting(session);
  const playing = isPlaying(session);
  const SpeakerIcon = SPEAKER_ICONS[speakerLevel(session)];

  return (
    <div className="flex h-1/5 w-full items-center justify-center portrait:h-[10%]">
      <ControlButton
        label={playing ? "Couper la radio" : "Écouter la radio"}
        onClick={playing ? stop : play}
      >
        {connecting ? <PlayerIcon as={SpinnerIcon} /> : null}
        {!connecting && playing ? <PlayerIcon as={PauseIcon} /> : null}
        {!connecting && !playing ? <PlayerIcon as={PlayIcon} /> : null}
      </ControlButton>

      <ControlButton label="Couper le son" pressed={session.muted} onClick={toggleMute}>
        <PlayerIcon as={SpeakerIcon} />
      </ControlButton>

      <VolumeControl />
    </div>
  );
}

function ControlButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="group grid size-[10vw] cursor-pointer place-items-center rounded-[20px] text-white portrait:size-[12vh]"
    >
      {children}
    </button>
  );
}

function PlayerIcon({ as: Icon }: { as: (props: { className?: string }) => React.ReactNode }) {
  return (
    <Icon className="size-[85%] transition-transform group-hover:scale-105 group-active:scale-95" />
  );
}
