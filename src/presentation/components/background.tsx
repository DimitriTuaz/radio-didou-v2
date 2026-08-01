import Image from "next/image";

import backgroundPhoto from "@/presentation/assets/background.png";

export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-station">
      <Image
        src={backgroundPhoto}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
