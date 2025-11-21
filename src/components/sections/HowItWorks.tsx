import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CheckCircle2,
    title: "Escolha sua trilha",
    description: ".NET + IA-First em 6 semanas",
    time: "1 minuto",
    color: "from-primary-500 to-primary-600"
  },
  {
    number: "02",
    icon: Users,
    title: "Entre no seu pod",
    description: "Grupo pequeno + cronograma + Discord",
    time: "5 minutos",
    color: "from-primary-600 to-primary-700"
  },
  {
    number: "03",
    icon: Clock,
    title: "Primeiro desafio 20min",
    description: "Prático, direto e com suporte real",
    time: "20 minutos",
    color: "from-primary-700 to-primary"
  },
  {
    number: "04",
    icon: Rocket,
    title: "Mentoria + constância",
    description: "Lives semanais, checkpoints e projetos reais",
    time: "6 semanas",
    color: "from-primary to-accent"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32" id="como-funciona">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <Badge variant="secondary" className="mb-4 bg-primary/20 text-white border-primary/30">
            Sem pegadinhas
          </Badge>
          <h2 className="font-display mb-4">
            Como funciona na prática?
          </h2>
          <p className="text-xl text-muted-foreground">
            4 passos simples. Você começa hoje e publica seu primeiro projeto em semanas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${step.color} text-white mb-4`}>
                <step.icon className="w-6 h-6" />
              </div>
              
              {/* Content */}
              <div className="space-y-3 relative z-10">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{step.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
