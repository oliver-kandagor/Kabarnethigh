import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import type { Database } from '@/integrations/supabase/types';

type Page = Database['public']['Tables']['pages']['Row'];
type PageBlock = Database['public']['Tables']['page_blocks']['Row'];

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (pageError || !pageData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data: blocksData } = await supabase
        .from('page_blocks')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('is_visible', true)
        .order('order_index');

      setPage(pageData);
      setBlocks(blocksData || []);
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.title} | Kabarnet High School</title>
        {page.description && <meta name="description" content={page.description} />}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DynamicPage;
