import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the SPE University of Ibadan Student Chapter - our mission, values, and commitment to advancing petroleum engineering education in Nigeria.",
  openGraph: {
    title: "About Us | SPE University of Ibadan",
    description:
      "Learn about the SPE University of Ibadan Student Chapter - our mission, values, and commitment to advancing petroleum engineering education in Nigeria.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
