import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, stories, and updates from the SPE University of Ibadan Student Chapter - covering petroleum engineering, energy trends, and student achievements.",
  openGraph: {
    title: "Blog | SPE University of Ibadan",
    description:
      "Insights, stories, and updates from the SPE University of Ibadan Student Chapter.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
