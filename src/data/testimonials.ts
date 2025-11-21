export interface Testimonial {
  id: string;
  name: string;
  role: string;
  school: string;
  city: string;
  state: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Josué Nogueira",
    role: "Front-end React | IA aplicada ao produto",
    school: "USP",
    city: "São Paulo",
    state: "SP",
    quote:
      "Sou dev focado em React, mas a 4uCode me mostrou como a IA acelera o front-end de verdade: de geração de componentes a testes e documentação. Aprendi a estruturar prompts, conectar serviços e medir impacto em performance e UX. Hoje tomo decisões melhores, com entregas rápidas e consistentes — sem gambiarra.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=400&h=400&q=80",
  },
  {
    id: "t2",
    name: "Mateus Andrade",
    role: "Dev em inicio de carreira | Trilha C# + IA",
    school: "UFPR",
    city: "Curitiba",
    state: "PR",
    quote:
      "Entrei recentemente e já consegui tirar meu primeiro módulo do papel usando C# e fundamentos de IA. A trilha me deu segurança para entender arquitetura, escrever código limpo e pedir ajuda do jeito certo. O que mais mudou foi minha cabeça: deixei o medo de errar de lado e passei a iterar rápido, com propósito.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=facearea&w=400&h=400&q=80",
  },
  {
    id: "t3",
    name: "Tawara Silva",
    role: "Onboarding | C# + IA + Métodos Ágeis",
    school: "UFMG",
    city: "Belo Horizonte",
    state: "MG",
    quote:
      "Estou prestes a começar a trabalhar com o time e venho nas trilhas de C# e IA enquanto aprofundo metodologias ágeis. A 4uCode me deu um mapa: backlog pessoal, cadência de estudos e métrica de evolução. Já chego falando a mesma língua do time, entendendo priorização, entregas incrementais e como a IA reduz atritos no fluxo.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=400&h=400&q=80",
  },
  {
    id: "t4",
    name: "Danilo Ferreira",
    role: "Estudante | Trilha C# com IA em projetos reais",
    school: "UFPE",
    city: "Recife",
    state: "PE",
    quote:
      "Ainda seguindo a trilha, comecei a praticar em projetos e senti a melhora na hora: leitura de código ficou mais rápida, entendi melhor LINQ, testes e como integrar IA para validar ideias antes de codar. A cada entrega ganho confiança e visão de produto. Estudar virou progresso visível.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400&q=80",
  },
  {
    id: "t5",
    name: "Gustavo Almeida",
    role: "Estudante | Trilha C# com IA",
    school: "UFRJ",
    city: "Rio de Janeiro",
    state: "RJ",
    quote:
      "Estou seguindo a trilha de C# com IA e, pela primeira vez, tenho uma sequência que faz sentido do básico ao avançado. Aprendi a estruturar meu portfólio, documentar o que faço e transformar teoria em mini projetos. O resultado é disciplina: todo dia um avanço pequeno, mas consistente — isso está mudando meu nível.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=400&h=400&q=80",
  },
  {
    id: "t6",
    name: "Guilherme Cardoso",
    role: "Dev C# | Estudos avançados em IA",
    school: "UNICAMP",
    city: "Campinas",
    state: "SP",
    quote:
      "Já trabalho na área e completei boa parte dos cursos da 4uCode. Agora estou mais avançado nas trilhas de IA — entendendo prompts, avaliação de modelos e como levar isso para o dia a dia com C#. Minhas próximas metas são aplicar automação nos fluxos do time e transformar os aprendizados em entregas reais. A diferença aqui é a clareza do caminho.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=facearea&w=400&h=400&q=80",
  },
];
