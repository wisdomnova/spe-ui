import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore SPE University of Ibadan programs - electoral sessions, membership spotlights, resources, and sponsorship opportunities.",
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
