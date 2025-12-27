import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { BackgroundSlideshow } from "@/components/ui/BackgroundSlideshow";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen pb-16 lg:pb-0 relative">
      <BackgroundSlideshow />
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
