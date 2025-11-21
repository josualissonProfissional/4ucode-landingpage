import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RevealSection } from "@/components/RevealSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <RevealSection as="div" className="text-center max-w-md" data-reveal-stagger="140">
        <div className="mb-8">
          <div className="text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-3xl font-bold mb-2">Página não encontrada</h1>
          <p className="text-muted-foreground">
            Parece que você se perdeu. Essa página não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Button>
          <Button 
            onClick={() => window.location.href = '/'}
            className="gradient-primary"
            size="lg"
          >
            <Home className="mr-2 w-4 h-4" />
            Ir para Home
          </Button>
        </div>
      </RevealSection>
    </div>
  );
};

export default NotFound;
