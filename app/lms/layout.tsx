import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Management System",
  description:
    "Access courses, tutorials, and educational resources from the SPE University of Ibadan Student Chapter to advance your petroleum engineering knowledge.",
  openGraph: {
    title: "LMS | SPE University of Ibadan",
    description:
      "Access courses and educational resources from the SPE UI Student Chapter.",
  },
};

export default function LmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
