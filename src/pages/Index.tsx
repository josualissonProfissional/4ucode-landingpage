import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { SEO } from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen">
    <SEO />
    <a href="#main" className="skip-to-content">
      Pular para conteúdo
    </a>
    <Header />
    <main id="main">
      <Hero />
    </main>
  </div>
);

export default Index;
