import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionProvider } from "@/providers/motion-provider";

const Index = lazy(() => import("./pages/Index"));
const Mentoria = lazy(() => import("./pages/Mentoria"));
const Fabrica = lazy(() => import("./pages/Fabrica"));
const Consultoria = lazy(() => import("./pages/ConsultoriaTreinamento"));
const Projetos = lazy(() => import("./pages/Projetos"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center bg-background text-muted-foreground">
    Carregando...
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mentoria" element={<Mentoria />} />
      <Route path="/fabrica" element={<Fabrica />} />
      <Route path="/consultoria" element={<Consultoria />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MotionProvider>
          <AppRoutes />
        </MotionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
