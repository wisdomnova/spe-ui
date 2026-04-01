import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the SPE University of Ibadan Student Chapter - access exclusive events, mentorship, resources, and a global professional network in the energy industry.",
  openGraph: {
    title: "Membership | SPE University of Ibadan",
    description:
      "Join the SPE University of Ibadan Student Chapter and unlock opportunities in the energy industry.",
  },
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
