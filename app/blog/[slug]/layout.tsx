import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, description, cover_image_url, author_name, author, category, tags")
    .eq("slug", slug)
    .eq("status", "Published")
    .single();

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist or isn't published yet.",
    };
  }

  const title = post.title;
  const description =
    post.description ||
    `Read "${post.title}" by ${post.author_name || post.author || "SPE UI"} on the SPE University of Ibadan blog.`;

  return {
    title,
    description,
    keywords: [
      ...(post.tags || []),
      post.category,
      "SPE",
      "University of Ibadan",
      "blog",
    ].filter(Boolean),
    openGraph: {
      type: "article",
      title,
      description,
      images: post.cover_image_url ? [{ url: post.cover_image_url, alt: title }] : undefined,
      authors: [post.author_name || post.author || "SPE UI"],
    },
    twitter: {
      card: post.cover_image_url ? "summary_large_image" : "summary",
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
