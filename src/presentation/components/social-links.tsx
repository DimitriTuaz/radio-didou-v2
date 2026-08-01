import { FacebookIcon, SoundCloudIcon } from "@/presentation/components/icons";

const SOCIAL_LINKS = [
  {
    label: "Radio Didou sur SoundCloud",
    href: "https://soundcloud.com/radio-didou",
    Icon: SoundCloudIcon,
  },
  {
    label: "Radio Didou sur Facebook",
    href: "https://fb.me/radiodidou",
    Icon: FacebookIcon,
  },
];

export function SocialLinks() {
  return (
    <nav className="fixed top-[1%] left-[1%] flex flex-row">
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="rounded-[0.6em] p-[0.8em] text-white transition-colors hover:bg-white/10"
        >
          <Icon className="size-9 portrait:size-7" />
        </a>
      ))}
    </nav>
  );
}
