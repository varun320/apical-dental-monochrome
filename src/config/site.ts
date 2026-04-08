export const siteConfig = {
  name: "Apical Dental",
  tagline: "The apex of the craft. In every sense.",
  headline: {
    line1: "Human Expertise.",
    line2: "Robotic Precision.",
  },
  description:
    "Pioneering the integration of Tesla's Optimus humanoid robot into dental laboratory procedures — delivering surgical-grade accuracy at unprecedented scale.",
  url: "https://apicaldental.com",
  nav: [
    { label: "Technology", href: "/technology" },
    { label: "About", href: "/about" },
    { label: "For DSOs", href: "/for-dsos" },
    { label: "Contact", href: "/contact" },
  ],
  cta: {
    primary: "Partner With Us",
    href: "/contact",
  },
  stats: [
    { value: 40, suffix: "+", label: "Years Expertise" },
    { value: 800, suffix: "+", label: "Adaptations" },
    { value: 500, suffix: "+", label: "DSO Offices" },
    { value: 0, suffix: "", label: "Regulatory Barriers" },
  ],
} as const;
