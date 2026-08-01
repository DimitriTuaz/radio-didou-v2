import { getStation } from "@/infrastructure/config/station";
import { Background } from "@/presentation/components/background";
import { Player } from "@/presentation/components/player";
import { SocialLinks } from "@/presentation/components/social-links";
import { StationTitle } from "@/presentation/components/station-title";
import { RadioSessionProvider } from "@/presentation/providers/radio-session-provider";

export default function HomePage() {
  const station = getStation();

  return (
    <>
      <Background />
      <SocialLinks />
      <main className="flex h-dvh flex-col items-center">
        <StationTitle name={station.name} />
        <RadioSessionProvider station={station}>
          <Player />
        </RadioSessionProvider>
      </main>
    </>
  );
}
