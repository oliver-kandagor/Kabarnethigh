-- Drop existing article-related objects to rebuild
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TYPE IF EXISTS public.article_category CASCADE;
DROP TYPE IF EXISTS public.article_status CASCADE;

-- Enhanced role system
DROP TYPE IF EXISTS public.app_role CASCADE;
CREATE TYPE public.app_role AS ENUM ('super_admin', 'content_editor', 'news_editor', 'developer');

-- Drop and recreate user_roles with new enum
DROP TABLE IF EXISTS public.user_roles CASCADE;
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer functions for role checking
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = 'super_admin'
    )
$$;

CREATE OR REPLACE FUNCTION public.is_content_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role IN ('super_admin', 'content_editor')
    )
$$;

CREATE OR REPLACE FUNCTION public.is_news_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role IN ('super_admin', 'news_editor')
    )
$$;

CREATE OR REPLACE FUNCTION public.is_developer(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role IN ('super_admin', 'developer')
    )
$$;

CREATE OR REPLACE FUNCTION public.has_any_admin_role(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    )
$$;

-- RLS for user_roles
CREATE POLICY "Super admins can manage roles" ON public.user_roles
FOR ALL USING (is_super_admin(auth.uid()));

CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT USING (user_id = auth.uid());

-- News/Posts System (completely rebuilt)
CREATE TYPE public.post_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE public.post_category AS ENUM ('news', 'announcement', 'event', 'achievement', 'sports', 'academics', 'general');

CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    category post_category NOT NULL DEFAULT 'general',
    status post_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    author_id UUID REFERENCES auth.users(id) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[],
    view_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Posts RLS
CREATE POLICY "Anyone can view published posts" ON public.posts
FOR SELECT USING (status = 'published');

CREATE POLICY "News editors can manage posts" ON public.posts
FOR ALL USING (is_news_editor(auth.uid()));

-- Content Blocks (for page builder)
CREATE TYPE public.block_type AS ENUM (
    'hero', 'text', 'image', 'gallery', 'cards', 'cta', 
    'news_feed', 'leadership', 'contact_form', 'map', 
    'accordion', 'tabs', 'video', 'stats', 'testimonials'
);

CREATE TABLE public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    is_homepage BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.page_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE NOT NULL,
    block_type block_type NOT NULL,
    title TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    settings JSONB NOT NULL DEFAULT '{}',
    order_index INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

-- Pages RLS
CREATE POLICY "Anyone can view published pages" ON public.pages
FOR SELECT USING (is_published = true);

CREATE POLICY "Content editors can manage pages" ON public.pages
FOR ALL USING (is_content_editor(auth.uid()));

CREATE POLICY "Anyone can view blocks of published pages" ON public.page_blocks
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pages WHERE id = page_id AND is_published = true)
);

CREATE POLICY "Content editors can manage blocks" ON public.page_blocks
FOR ALL USING (is_content_editor(auth.uid()));

-- Global Content (editable site-wide content)
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}',
    content_type TEXT NOT NULL DEFAULT 'text',
    category TEXT NOT NULL DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content" ON public.site_content
FOR SELECT USING (true);

CREATE POLICY "Content editors can manage site content" ON public.site_content
FOR ALL USING (is_content_editor(auth.uid()));

-- Media Library
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    alt_text TEXT,
    folder TEXT DEFAULT 'root',
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view media" ON public.media
FOR SELECT USING (true);

CREATE POLICY "Admins can manage media" ON public.media
FOR ALL USING (has_any_admin_role(auth.uid()));

-- Leadership profiles
CREATE TABLE public.leadership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    email TEXT,
    phone TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leadership" ON public.leadership
FOR SELECT USING (is_visible = true);

CREATE POLICY "Content editors can manage leadership" ON public.leadership
FOR ALL USING (is_content_editor(auth.uid()));

-- Departments
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    head_name TEXT,
    head_title TEXT,
    image_url TEXT,
    teacher_count INTEGER DEFAULT 0,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view departments" ON public.departments
FOR SELECT USING (is_visible = true);

CREATE POLICY "Content editors can manage departments" ON public.departments
FOR ALL USING (is_content_editor(auth.uid()));

-- Audit log for tracking changes
CREATE TABLE public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view audit log" ON public.audit_log
FOR SELECT USING (is_super_admin(auth.uid()));

CREATE POLICY "System can insert audit log" ON public.audit_log
FOR INSERT WITH CHECK (true);

-- CMS Modules (feature toggles)
CREATE TABLE public.cms_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view enabled modules" ON public.cms_modules
FOR SELECT USING (true);

CREATE POLICY "Super admins can manage modules" ON public.cms_modules
FOR ALL USING (is_super_admin(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_blocks_updated_at BEFORE UPDATE ON public.page_blocks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leadership_updated_at BEFORE UPDATE ON public.leadership
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_modules_updated_at BEFORE UPDATE ON public.cms_modules
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default modules
INSERT INTO public.cms_modules (name, display_name, description, is_enabled) VALUES
('page_builder', 'Page Builder', 'Visual drag-and-drop page editor', true),
('news_system', 'News & Posts', 'Publish news, announcements, and events', true),
('media_manager', 'Media Library', 'Upload and manage images, documents, and videos', true),
('content_manager', 'Content Manager', 'Edit global site content', true),
('leadership', 'Leadership Profiles', 'Manage school leadership information', true),
('departments', 'Departments', 'Manage academic departments', true),
('code_editor', 'Code Editor', 'Advanced HTML/CSS editing (developers only)', false),
('analytics', 'Analytics', 'View site traffic and engagement', false);

-- Insert default site content
INSERT INTO public.site_content (key, title, content, content_type, category) VALUES
('school_name', 'School Name', '{"value": "Kabarnet High School"}', 'text', 'general'),
('school_motto', 'School Motto', '{"value": "Loyalty, Service, Knowledge"}', 'text', 'general'),
('school_vision', 'Vision', '{"value": "To be a leading centre of excellence in holistic education"}', 'text', 'about'),
('school_mission', 'Mission', '{"value": "To provide quality education that nurtures learners to become responsible citizens"}', 'text', 'about'),
('contact_email', 'Contact Email', '{"value": "info@kabarnethigh.sc.ke"}', 'text', 'contact'),
('contact_phone', 'Contact Phone', '{"value": "+254 XXX XXX XXX"}', 'text', 'contact'),
('contact_address', 'Address', '{"value": "P.O. Box 25, Kabarnet, Baringo County, Kenya"}', 'text', 'contact');