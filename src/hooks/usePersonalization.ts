import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type CampaignVariant = "default" | "bootcamp" | "backend" | "ai";

interface PersonalizationConfig {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  heroVisualAccent: string;
  primarySectionOrder: string[];
  campaign?: string;
}

const VARIANTS: Record<CampaignVariant, PersonalizationConfig> = {
  default: {
    headline: "Sua jornada como dev começa com IA-first",
    subheadline:
      "Projetos reais, mentoria humana e tecnologia assistida por IA para acelerar seu portfólio.",
    ctaLabel: "Começar Minha Jornada",
    heroVisualAccent: "#8a3ffc",
    primarySectionOrder: ["parcerias", "beneficios", "jornada", "ia-first", "cultura", "cta"],
  },
  bootcamp: {
    headline: "Bootcamp intensivo com tecnologia e IA aplicada",
    subheadline:
      "Estude em sprints guiadas, valide com code review e conquiste projetos certificados.",
    ctaLabel: "Entrar no Bootcamp Gratuito",
    heroVisualAccent: "#ff6f61",
    primarySectionOrder: ["beneficios", "jornada", "parcerias", "ia-first", "cultura", "cta"],
    campaign: "bootcamp",
  },
  backend: {
    headline: "Domine back-end em C# com pipelines inteligentes",
    subheadline:
      "Aprenda APIs, testes e integrações com IA para revisar código em tempo real.",
    ctaLabel: "Criar minha API inteligente",
    heroVisualAccent: "#36c6f4",
    primarySectionOrder: ["jornada", "beneficios", "parcerias", "ia-first", "cultura", "cta"],
    campaign: "backend",
  },
  ai: {
    headline: "Construa produtos com IA generativa do zero",
    subheadline:
      "Crie copilotos e chatbots usando C#, Azure OpenAI e automações baseadas em dados.",
    ctaLabel: "Prototipar meu Copiloto",
    heroVisualAccent: "#ff9c27",
    primarySectionOrder: ["cta", "beneficios", "jornada", "parcerias", "ia-first", "cultura"],
    campaign: "ai",
  },
};

const CAMPAIGN_KEY = "4ucode_campaign";

const mapParamToVariant = (value?: string | null): CampaignVariant => {
  if (!value) return "default";
  const normalized = value.toLowerCase();
  if (normalized.includes("bootcamp")) return "bootcamp";
  if (normalized.includes("back") || normalized.includes("backend")) return "backend";
  if (normalized.includes("ia") || normalized.includes("ai")) return "ai";
  return "default";
};

export const usePersonalization = () => {
  const location = useLocation();
  const [variant, setVariant] = useState<CampaignVariant>("default");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utmCampaign = params.get("utm_campaign") || params.get("campaign");
    const utmSource = params.get("utm_source");

    const persistedCampaign = window.localStorage.getItem(CAMPAIGN_KEY);
    const candidate = utmCampaign || utmSource || persistedCampaign;
    const newVariant = mapParamToVariant(candidate);

    setVariant(newVariant);
    if (candidate) {
      window.localStorage.setItem(CAMPAIGN_KEY, candidate);
    }
  }, [location.search]);

  const personalization = useMemo(() => {
    const config = VARIANTS[variant];
    return {
      ...config,
      variant,
      primarySectionOrder: Array.from(new Set([...config.primarySectionOrder, "parcerias", "beneficios", "jornada", "ia-first", "cultura", "cta"])),
    };
  }, [variant]);

  return personalization;
};
