import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NewsModal } from "@/components/ui/NewsModal";
import campusAerial from "@/assets/campus-aerial.jpg";
import schoolLogo from "@/assets/Logos/logo.png";

const facebookPosts = [
  {
    id: 1,
    title: "School Update",
    date: "Latest Post",
    iframe: '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fofficialkabarnethighschool%2Fposts%2Fpfbid02SvdrmenfiMYCvhuKPkyyP8gJBrmZ73k8VF5EPU8o1hBzka4iYjtUsAUsNrBsQyQKl&show_text=true&width=500" width="500" height="498" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>'
  },
  {
    id: 2,
    title: "Community Highlights",
    date: "Recent Update",
    iframe: '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fofficialkabarnethighschool%2Fposts%2Fpfbid0agoQj34k3QmzQcbdqKZRb6QGMofohAjiUEf28Pf8VgQuYkg5VMBuEYCDS1JR4352l&show_text=true&width=500" width="500" height="667" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>'
  },
  {
    id: 3,
    title: "Student Achievements",
    date: "Featured News",
    iframe: '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fofficialkabarnethighschool%2Fposts%2Fpfbid0SdvnfsDK73BxnZDfw7CYD3Wm2XdBVrB3Z8U77Zu76uQiKBt3xRE6kNFMqk8HMDaFl&show_text=true&width=500" width="500" height="718" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>'
  },
  {
    id: 4,
    title: "Video Reel: Highlights",
    date: "Watch Now",
    iframe: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F385242717632445%2F&show_text=true&width=267&t=0" width="267" height="591" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>'
  },
  {
    id: 5,
    title: "Video: Events",
    date: "Watch Now",
    iframe: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fofficialkabarnethighschool%2Fvideos%2F1380162612906069%2F&show_text=true&width=267&t=0" width="267" height="591" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>'
  }
];

export function NewsSection() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img src={campusAerial} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              News & Updates
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Latest from{" "}
              <span className="text-primary">Facebook</span>
            </h2>
          </div>
          <Link to="/news">
            <Button variant="outline" className="w-fit animate-shake">
              View All News <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facebookPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-card shadow-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col h-full hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedPost(post.iframe)}
            >
              {/* Card Image Area */}
              <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                {/* Generic Social Bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/5" />
                <img src={schoolLogo} alt="Logo" className="w-16 h-16 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-3 right-3 bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
                  <Facebook className="w-4 h-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">{post.date}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                  Click to read the full update from our official Facebook page.
                </p>
                <div className="mt-auto pt-4 border-t border-border flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Shaking Button at Bottom for Mobile visibility too */}
        <div className="mt-12 text-center md:hidden">
          <Link to="/news">
            <Button className="w-full animate-shake bg-blue-600 hover:bg-blue-700 text-white shadow-xl">
              Follow Our Page <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <NewsModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        embedCode={selectedPost || ""}
      />

      <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
            animation: shake 3s cubic-bezier(.36,.07,.19,.97) infinite;
        }
      `}</style>
    </section>
  );
}
