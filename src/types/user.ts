export type UF = 
  | "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" 
  | "MG" | "MS" | "MT" | "PA" | "PB" | "PE" | "PI" | "PR" | "RJ" | "RN" 
  | "RO" | "RR" | "RS" | "SC" | "SE" | "SP" | "TO";

export const UF_OPTIONS: UF[] = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO"
];

export const UF_NAMES: Record<UF, string> = {
  "AC": "Acre",
  "AL": "Alagoas",
  "AM": "Amazonas",
  "AP": "Amapá",
  "BA": "Bahia",
  "CE": "Ceará",
  "DF": "Distrito Federal",
  "ES": "Espírito Santo",
  "GO": "Goiás",
  "MA": "Maranhão",
  "MG": "Minas Gerais",
  "MS": "Mato Grosso do Sul",
  "MT": "Mato Grosso",
  "PA": "Pará",
  "PB": "Paraíba",
  "PE": "Pernambuco",
  "PI": "Piauí",
  "PR": "Paraná",
  "RJ": "Rio de Janeiro",
  "RN": "Rio Grande do Norte",
  "RO": "Rondônia",
  "RR": "Roraima",
  "RS": "Rio Grande do Sul",
  "SC": "Santa Catarina",
  "SE": "Sergipe",
  "SP": "São Paulo",
  "TO": "Tocantins"
};

export interface User {
  id: string;
  nome: string;
  email: string;
  estado: UF;
  isEstudante: boolean;
  faculdade?: string;
  cargo?: string;
  createdAt: string;
  origem: "mock" | "signup";
}

export const COMMON_COLLEGES = [
  "USP - Universidade de São Paulo",
  "UNICAMP - Universidade Estadual de Campinas",
  "UFRJ - Universidade Federal do Rio de Janeiro",
  "UFMG - Universidade Federal de Minas Gerais",
  "UFRGS - Universidade Federal do Rio Grande do Sul",
  "UnB - Universidade de Brasília",
  "UFSC - Universidade Federal de Santa Catarina",
  "UFPR - Universidade Federal do Paraná",
  "UFPE - Universidade Federal de Pernambuco",
  "UFC - Universidade Federal do Ceará",
  "UNESP - Universidade Estadual Paulista",
  "UFG - Universidade Federal de Goiás",
  "UFBA - Universidade Federal da Bahia",
  "UFF - Universidade Federal Fluminense",
  "PUC-Rio - Pontifícia Universidade Católica do Rio de Janeiro",
  "PUC-SP - Pontifícia Universidade Católica de São Paulo",
  "Mackenzie - Universidade Presbiteriana Mackenzie",
  "FGV - Fundação Getulio Vargas"
];
