import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming workshops, conferences, and networking events organized by the SPE University of Ibadan Student Chapter.",
  openGraph: {
    title: "Events | SPE University of Ibadan",
    description:
      "Discover upcoming workshops, conferences, and networking events organized by the SPE UI Student Chapter.",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
