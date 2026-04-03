"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ThumbsUp } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  cover_image_url: string | null;
  slug: string;
  category: string;
  author: string;
  author_name: string;
  author_image_url: string | null;
  author_role: string;
  tags: string[];
  read_time: string;
  created_at: string;
}

export default function BlogSlugPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Generate a stable fingerprint for this browser
  const getFingerprint = useCallback(() => {
    const key = "spe_fp";
    let fp = localStorage.getItem(key);
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem(key, fp);
    }
    return fp;
  }, []);

  useEffect(() => {
    if (!params?.slug) return;
    fetchPost(params.slug as string);
  }, [params?.slug]);

  const fetchPost = async (slug: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "Published")
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setPost(data);
      // Track the view (fire-and-forget)
      fetch("/api/blog-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_id: data.id, slug: data.slug }),
      }).catch(() => {});
      // Fetch like count + check if this user already liked
      fetchLikes(data.id);
    }
    setLoading(false);
  };

  const fetchLikes = async (blogId: string) => {
    try {
      const res = await fetch(`/api/blog-likes?blog_id=${blogId}`);
      if (res.ok) {
        const d = await res.json();
        setLikes(d.likes || 0);
      }
    } catch {}
    // Check localStorage for existing like
    const likedBlogs: string[] = JSON.parse(localStorage.getItem("spe_liked_blogs") || "[]");
    setLiked(likedBlogs.includes(blogId));
  };

  const handleLike = async () => {
    if (!post || likeLoading) return;
    setLikeLoading(true);
    try {
      const fp = getFingerprint();
      const res = await fetch("/api/blog-likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_id: post.id, slug: post.slug, fingerprint: fp }),
      });
      if (res.ok) {
        const d = await res.json();
        setLikes(d.likes);
        setLiked(d.liked);
        // Persist in localStorage
        const likedBlogs: string[] = JSON.parse(localStorage.getItem("spe_liked_blogs") || "[]");
        if (d.liked) {
          if (!likedBlogs.includes(post.id)) likedBlogs.push(post.id);
        } else {
          const idx = likedBlogs.indexOf(post.id);
          if (idx >= 0) likedBlogs.splice(idx, 1);
        }
        localStorage.setItem("spe_liked_blogs", JSON.stringify(likedBlogs));
      }
    } catch {}
    setLikeLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-sans text-black">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-sans text-black">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 pt-32">
          <h1 className="text-4xl font-bold text-gray-900">Post not found</h1>
          <p className="text-gray-500">The blog post you&apos;re looking for doesn&apos;t exist or isn&apos;t published yet.</p>
          <a href="/blog" className="mt-4 text-blue-600 font-bold hover:underline">← Back to Blog</a>
        </main>
        <Footer />
      </div>
    );
  }

  /**
   * Process blog HTML for public display:
   *  - Empty paragraphs get a <br> so they keep their height
   *  - Images with data-caption are wrapped in <figure>+<figcaption>
   */
  const processContent = (html: string) => {
    // Fix collapsed empty paragraphs
    let processed = html.replace(/<p><\/p>/g, '<p><br></p>');

    // Wrap captioned images: <img … data-caption="…"> → <figure>…<figcaption>
    processed = processed.replace(
      /<img\s([^>]*?)data-caption="([^"]*)"([^>]*?)\/?>/g,
      '<figure class="image-figure" data-type="image"><img $1$3><figcaption>$2</figcaption></figure>'
    );

    return processed;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-44 md:px-0">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Back Button */}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors mb-8"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current stroke-[2.5px]">
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
            Back to Blog
          </a>

          {/* Header Section */}
          <div className="flex flex-col gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[34px] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[74px] text-gray-900"
            >
              {post.title}
            </motion.h1>
            
            {post.description && (
              <p className="text-base sm:text-lg font-medium text-gray-500 leading-relaxed max-w-4xl">
                {post.description}
              </p>
            )}

            <div className="w-full h-px bg-gray-200 mt-4"></div>

            {/* Author and Badges Section */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                {post.author_image_url ? (
                  <Image
                    src={post.author_image_url}
                    alt={post.author_name || post.author || "Author"}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold">
                    {(post.author_name || post.author)?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">{post.author_name || post.author || "SPE UI"}</span>
                  <span className="text-base font-medium text-gray-500">{post.author_role || post.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {post.read_time && (
                  <div className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400">
                    {post.read_time}
                  </div>
                )}
                <div className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400">
                  {formatDate(post.created_at)}
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Main Image */}
          {post.cover_image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-16 relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl"
            >
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Body Content - rendered exactly as designed in admin */}
          <article 
            className="mt-16 prose prose-lg prose-gray max-w-none text-lg font-medium leading-relaxed text-gray-700
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-a:text-blue-600 prose-a:font-semibold
              prose-img:rounded-2xl prose-img:shadow-lg
              prose-blockquote:border-l-blue-600 prose-blockquote:text-gray-600"
            dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
          />

          {/* Like Button */}
          <div className="mt-16 flex items-center justify-center">
            <motion.button
              onClick={handleLike}
              disabled={likeLoading}
              whileTap={{ scale: 0.9 }}
              className={`group flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all duration-300 ${
                liked
                  ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200"
                  : "bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
              }`}
            >
              <ThumbsUp
                size={22}
                className={`transition-transform duration-300 ${liked ? "fill-white" : "group-hover:scale-110"}`}
                fill={liked ? "currentColor" : "none"}
              />
              <span className="text-lg font-bold">
                {likes > 0 ? likes.toLocaleString() : "Like"}
              </span>
            </motion.button>
          </div>
        </div>
      </main>

      {/* CTA Section (The Purple One) */}
      <section className="bg-[#6366F1] py-24 text-white md:py-32 mt-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-[80px] leading-[1.1]">
              Grow Skills. Build Networks.<br />
              Shape Futures.
            </h2>
            <p className="max-w-2xl text-lg font-medium text-white/90 md:text-xl">
              Connect with peers, professionals, and opportunities through SPE University of Ibadan.
            </p>
            <motion.a
              href="/membership"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 flex items-center gap-4 rounded-full border border-white/40 bg-white/10 px-10 py-4 text-xl font-bold backdrop-blur-sm transition-all hover:bg-white hover:text-[#6366F1]"
            >
              <span>Join SPE</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current stroke-[3px]">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
