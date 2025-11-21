export interface TrailModule {
  title: string;
  objective: string;
  miniProject: string;
}

export interface Trail {
  id: string;
  title: string;
  level: string;
  description: string;
  weeks: string;
  modules: TrailModule[];
  skills: string[];
  prerequisites: string[];
  finalProject: string;
  color: string;
}

export const trails: Trail[] = [
  {
    id: 'csharp-iniciante',
    title: 'C# Iniciante',
    level: 'Iniciante',
    description: 'Aprenda os fundamentos de C# e .NET construindo projetos práticos do zero.',
    weeks: '4-6 semanas',
    color: 'from-purple-500 to-blue-500',
    skills: ['C# Básico', 'POO', 'ASP.NET Core', 'Entity Framework', 'xUnit'],
    prerequisites: ['Lógica de programação', 'Conhecimento básico de HTML'],
    modules: [
      {
        title: 'Fundamentos de C#',
        objective: 'Dominar sintaxe, tipos de dados, estruturas de controle e coleções.',
        miniProject: 'Calculadora de Console com validações'
      },
      {
        title: 'Programação Orientada a Objetos',
        objective: 'Entender classes, herança, polimorfismo, interfaces e encapsulamento.',
        miniProject: 'Sistema de Gestão de Biblioteca (console)'
      },
      {
        title: 'ASP.NET Core Web API',
        objective: 'Criar APIs REST com endpoints CRUD, rotas e middleware.',
        miniProject: 'API de Lista de Tarefas (Todo List)'
      },
      {
        title: 'Banco de Dados com Entity Framework',
        objective: 'Integrar banco de dados, migrations e relacionamentos.',
        miniProject: 'API de Blog com Posts e Comentários'
      },
      {
        title: 'Testes Unitários com xUnit',
        objective: 'Escrever testes automatizados para garantir qualidade do código.',
        miniProject: 'Suite de testes para API de Blog'
      }
    ],
    finalProject: 'Sistema CRUD Completo: API ASP.NET Core com autenticação, banco de dados, testes unitários e documentação Swagger.'
  },
  {
    id: 'fundamentos-ia',
    title: 'Fundamentos de IA',
    level: 'Iniciante',
    description: 'Explore Machine Learning, LLMs e IA aplicada com projetos práticos e éticos.',
    weeks: '4-6 semanas',
    color: 'from-blue-500 to-cyan-500',
    skills: ['ML Básico', 'LLMs', 'RAG', 'Prompt Engineering', 'Ética em IA'],
    prerequisites: ['Python básico', 'Lógica de programação'],
    modules: [
      {
        title: 'Introdução ao Machine Learning',
        objective: 'Entender conceitos de ML, tipos de aprendizado e aplicações práticas.',
        miniProject: 'Classificador de Sentimentos com scikit-learn'
      },
      {
        title: 'Large Language Models (LLMs)',
        objective: 'Conhecer arquitetura de LLMs, tokens, embeddings e APIs.',
        miniProject: 'Assistente de escrita com OpenAI API'
      },
      {
        title: 'Prompt Engineering',
        objective: 'Dominar técnicas de prompts eficazes, few-shot learning e chain-of-thought.',
        miniProject: 'Sistema de geração de conteúdo personalizado'
      },
      {
        title: 'RAG (Retrieval Augmented Generation)',
        objective: 'Implementar busca semântica e geração aumentada com documentos.',
        miniProject: 'Chatbot que responde com base em documentos próprios'
      },
      {
        title: 'Ética e Responsabilidade em IA',
        objective: 'Entender vieses, privacidade, transparência e uso responsável de IA.',
        miniProject: 'Análise de viés em dataset e documentação de práticas éticas'
      }
    ],
    finalProject: 'Chatbot FAQ Inteligente: Sistema RAG com embeddings, busca semântica, interface web e métricas de precisão.'
  }
];
