import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the executive committee and members of the SPE University of Ibadan Student Chapter driving innovation in the energy sector.",
  openGraph: {
    title: "Our Team | SPE University of Ibadan",
    description:
      "Meet the executive committee and members of the SPE University of Ibadan Student Chapter.",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
