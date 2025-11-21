import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trails } from "@/data/trails";
import { Clock, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export const Trails = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Comece do zero, avance com segurança
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trilhas guiadas com projetos práticos em cada módulo. Aprenda fazendo.
          </p>
        </div>

        {/* Trails Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {trails.map((trail) => (
            <Card key={trail.id} className="group hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {trail.level}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{trail.weeks}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{trail.title}</CardTitle>
                <CardDescription className="text-base">
                  {trail.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    O que você vai aprender
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trail.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                    Módulos ({trail.modules.length})
                  </h4>
                  <Accordion type="single" collapsible className="space-y-2">
                    {trail.modules.map((module, idx) => (
                      <AccordionItem key={idx} value={`module-${idx}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-sm hover:no-underline py-3">
                          <span className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                              {idx + 1}
                            </span>
                            {module.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm space-y-2 pb-3">
                          <p className="text-muted-foreground">
                            <strong>Objetivo:</strong> {module.objective}
                          </p>
                          <p className="text-primary/90 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span><strong>Mini-projeto:</strong> {module.miniProject}</span>
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Final Project */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="text-sm font-semibold mb-2 text-primary flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Projeto Final
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {trail.finalProject}
                  </p>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full gradient-primary shadow-purple group-hover:shadow-xl transition-all"
                  onClick={() => window.location.href = "/cadastro"}
                >
                  Começar esta Trilha
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
