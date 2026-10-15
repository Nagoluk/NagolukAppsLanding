/**
 * Store links for each game page.
 * An empty store link shows as "Coming soon" instead of a broken URL.
 * A new game also needs its own folder (like herojump/index.html)
 * and a card on the home page, so its search description stays separate.
 */
const APPS = [
  {
    id: "herojump",
    page: "herojump/",
    name: "HeroJump",
    kind: "Mobile game",
    tagline: "Jump higher. Beat your record.",
    description:
      "An endless platform jumper. Steer by tapping or tilting your phone, collect diamonds, and unlock characters with different abilities.",
    icon: "assets/icon-herojump.png",
    cover: "assets/splash-herojump.png",
    logo: "assets/logo-herojump.png",
    featured: true,
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.herojump.app",
        store: "google",
      },
      {
        label: "App Store",
        href: "",
        store: "apple",
      },
      {
        label: "Privacy policy",
        href: "https://magical-kheer-41b1ed.netlify.app/",
        store: "privacy",
      },
    ],
  },
];
