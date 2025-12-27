import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';

type PageBlock = Database['public']['Tables']['page_blocks']['Row'];

interface BlockRendererProps {
  block: PageBlock;
}

const BlockRenderer = ({ block }: BlockRendererProps) => {
  const content = block.content as Record<string, any>;

  switch (block.block_type) {
    case 'hero':
      return (
        <section
          className="relative min-h-[60vh] flex items-center justify-center bg-primary overflow-hidden"
          style={content.backgroundImage ? { backgroundImage: `url(${content.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {content.backgroundImage && <div className="absolute inset-0 bg-black/50" />}
          <div className="container mx-auto px-4 py-20 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
            >
              {content.headline}
            </motion.h1>
            {content.subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8"
              >
                {content.subheadline}
              </motion.p>
            )}
            {content.buttonText && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button asChild size="lg" variant="secondary">
                  <Link to={content.buttonLink || '#'}>{content.buttonText}</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      );

    case 'text':
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            {block.title && <h2 className="text-3xl font-heading font-bold mb-6">{block.title}</h2>}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="whitespace-pre-wrap">{content.body}</p>
            </div>
          </div>
        </section>
      );

    case 'image':
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <figure className="max-w-4xl mx-auto">
              <img src={content.src} alt={content.alt || ''} className="w-full rounded-xl shadow-lg" />
              {content.caption && <figcaption className="text-center text-muted-foreground mt-4">{content.caption}</figcaption>}
            </figure>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">{content.headline}</h2>
            {content.description && <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">{content.description}</p>}
            {content.buttonText && (
              <Button asChild size="lg" variant="secondary">
                <Link to={content.buttonLink || '#'}>{content.buttonText}</Link>
              </Button>
            )}
          </div>
        </section>
      );

    case 'stats':
      const stats = content.items || [];
      return (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            {block.title && <h2 className="text-3xl font-heading font-bold text-center mb-12">{block.title}</h2>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-heading font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cards':
      const cards = content.items || [];
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {block.title && <h2 className="text-3xl font-heading font-bold text-center mb-12">{block.title}</h2>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl p-6 border shadow-soft"
                >
                  <h3 className="text-xl font-heading font-bold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                  {card.link && (
                    <Link to={card.link} className="text-primary hover:underline mt-4 inline-block">Learn more →</Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'accordion':
      const faqs = content.items || [];
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            {block.title && <h2 className="text-3xl font-heading font-bold text-center mb-12">{block.title}</h2>}
            <div className="space-y-4">
              {faqs.map((faq: any, i: number) => (
                <details key={i} className="bg-card rounded-lg border p-4 group">
                  <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      );

    case 'video':
      const getYouTubeId = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        return match ? match[1] : null;
      };
      const youtubeId = content.url ? getYouTubeId(content.url) : null;
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {block.title && <h2 className="text-3xl font-heading font-bold text-center mb-8">{block.title}</h2>}
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video src={content.url} controls className="w-full h-full" />
              )}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default BlockRenderer;
