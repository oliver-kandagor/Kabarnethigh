import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { PrincipalWelcome } from "@/components/sections/PrincipalWelcome";
import { SchoolIdentity } from "@/components/sections/SchoolIdentity";
import { AboutSection } from "@/components/sections/AboutSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { AcademicsSection } from "@/components/sections/AcademicsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { AlumniSection } from "@/components/sections/CTASection";
import { MagazineSection } from "@/components/sections/MagazineSection";
import { FeatureSlideshow } from "@/components/sections/FeatureSlideshow";
import { DeveloperSection } from "@/components/sections/DeveloperSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kabarnet High School - Excellence, Integrity, & Service</title>
        <meta name="description" content="Welcome to Kabarnet High School. Since 1964, we have been nurturing future leaders through holistic education, academic excellence, and character development." />
        <meta name="keywords" content="Kabarnet High School, KHS, Kenya secondary school, Baringo County, national school Kenya, Strong to Excel" />
        <link rel="canonical" href="https://kabarnethigh.sc.ke" />
      </Helmet>

      <Layout>
        <HeroSection />
        <FeatureSlideshow />
        <MagazineSection />
        <AboutSection />
        <PrincipalWelcome />
        <SchoolIdentity />
        <AcademicsSection />
        <LeadershipSection />
        <NewsSection />
        <AlumniSection />
        <DeveloperSection />
      </Layout>
    </>
  );
};

export default Index;
