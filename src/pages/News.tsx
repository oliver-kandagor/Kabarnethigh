import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Post = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  featured_image_url: string | null;
  published_at: string | null;
  slug: string;
  is_featured: boolean;
};

import schoolAssembly from "@/assets/school-assembly.jpg";

// ... existing imports ...

const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, excerpt, category, featured_image_url, published_at, slug, is_featured")
        .eq("status", "published")
        .order("is_featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categoryColors: Record<string, string> = {
    general: "bg-muted text-muted-foreground",
    news: "bg-primary/10 text-primary",
    announcement: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    event: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    achievement: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    sports: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    academics: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <>
      <Helmet>
        <title>News & Updates | Kabarnet High School</title>
        <meta name="description" content="Stay updated with the latest news, events, and achievements from Kabarnet High School." />
      </Helmet>

      <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={schoolAssembly} alt="KHS News" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground mb-6">News & Updates</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Latest happenings at Kabarnet High School
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden shadow-soft">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No posts published yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow group ${post.is_featured ? 'ring-2 ring-primary' : ''}`}
                  >
                    {post.featured_image_url && (
                      <div className="aspect-video overflow-hidden relative">
                        <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {post.is_featured && (
                          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">Featured</span>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={categoryColors[post.category] || categoryColors.general}>{post.category}</Badge>
                        {post.published_at && (
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.published_at), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      {post.excerpt && <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>}
                      <Link to={`/news/${post.slug}`} className="mt-4 flex items-center text-primary text-sm font-medium hover:underline">
                        Read more <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default News;
