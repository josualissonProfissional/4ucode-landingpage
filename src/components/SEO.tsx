import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
}

export const SEO = ({ 
  title = "4uCode - Mentoria Gratuita .NET + IA-First | Turma Alpha 220",
  description = "Aprenda C# e IA aplicada com projetos reais em 4-6 semanas. Mentoria 100% gratuita, comunidade ativa e portfólio técnico para entrevistas. Em parceria com Fatec e USP.",
  type = "website",
  image = "https://4ucode.com/og-image.png"
}: SEOProps) => {
  
  useEffect(() => {
    // JSON-LD for Organization
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "4uCode",
      "description": "Mentorias gratuitas em tecnologia focadas em .NET e IA-First",
      "url": "https://4ucode.com",
      "logo": "https://4ucode.com/logo.png",
      "sameAs": [
        "https://discord.gg/4ucode"
      ]
    };

    // JSON-LD for C# Course
    const csharpCourseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "C# Iniciante - Do Zero à API REST",
      "description": "Aprenda C# do básico ao avançado com projetos práticos. Crie APIs REST com ASP.NET Core em 4 semanas.",
      "educationalLevel": "Beginner",
      "inLanguage": "pt-BR",
      "provider": {
        "@type": "Organization",
        "name": "4uCode"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "duration": "P4W",
        "instructor": {
          "@type": "Organization",
          "name": "4uCode"
        }
      }
    };

    // JSON-LD for AI Course
    const aiCourseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Fundamentos de IA Aplicada",
      "description": "Domine os conceitos essenciais de IA, LLMs, RAG e ética em IA. Construa um chatbot FAQ em 6 semanas.",
      "educationalLevel": "Beginner",
      "inLanguage": "pt-BR",
      "provider": {
        "@type": "Organization",
        "name": "4uCode"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "duration": "P6W",
        "instructor": {
          "@type": "Organization",
          "name": "4uCode"
        }
      }
    };

    // JSON-LD for FAQ
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "É realmente 100% gratuito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Sem pegadinhas, sem cartão de crédito. Em parceria com Fatec e USP."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso saber programar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. A trilha C# Iniciante parte do zero. Basta dedicação de 4-6h/semana."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto tempo dura?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "4-6 semanas por trilha. Você avança no seu ritmo, mas com prazos sugeridos."
          }
        },
        {
          "@type": "Question",
          "name": "Como funciona o suporte?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Discord ativo 24/7, code reviews semanais, mentorias em grupo quinzenais."
          }
        },
        {
          "@type": "Question",
          "name": "Vou ter um certificado?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, digital. Mas o foco é o portfólio técnico no GitHub."
          }
        }
      ]
    };

    // Add schemas to head
    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.text = JSON.stringify(orgSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.text = JSON.stringify(csharpCourseSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement("script");
    script3.type = "application/ld+json";
    script3.text = JSON.stringify(aiCourseSchema);
    document.head.appendChild(script3);

    const script4 = document.createElement("script");
    script4.type = "application/ld+json";
    script4.text = JSON.stringify(faqSchema);
    document.head.appendChild(script4);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
      document.head.removeChild(script4);
    };
  }, []);

  return null;
};
