# 4uCode Landing Page

Landing page premium para mentorias gratuitas em .NET + IA-First, com foco em conversão Gen Z e retenção de 90%.

## 🎯 Stack Tecnológica

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS com design system customizado
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Animations**: CSS animations + Tailwind
- **SEO**: JSON-LD schemas (Organization, Course, FAQ)

## 🎨 Design System

### Paleta de Cores (HSL)

```css
/* Purple Primary - Marca */
--primary: 264 74% 52%        /* #6C2BD9 */
--primary-500: 264 83% 70%    /* #8B5CF6 */
--primary-600: 264 74% 52%    
--primary-700: 264 65% 42%    

/* Black Base - Backgrounds */
--bg-base: 240 6% 4%          /* #0A0A0A */
--bg-soft: 240 5% 8%          
--bg-elevated: 240 5% 12%     

/* Neutrals */
--muted: 240 4% 46%           
--muted-2: 240 5% 65%         /* #9CA3AF */
```

### Tokens e Utilitários

- **Gradients**: `.gradient-primary`, `.gradient-dark`, `.gradient-glow`
- **Shadows**: `.shadow-purple` para efeitos de destaque
- **Animations**: `fade-in`, `fade-up`, `scale-in`, `glow`

### Tipografia

- **Display**: Poppins (600, 700, 800) - Headlines
- **Body**: Inter (400, 500, 600, 700) - Corpo de texto

## 📦 Estrutura de Componentes

```
src/
├── components/
│   ├── sections/
│   │   ├── Header.tsx        # Navegação sticky
│   │   ├── Hero.tsx          # Hero com CTA principal
│   │   ├── Problems.tsx      # Dores → Soluções (4 cards)
│   │   ├── HowItWorks.tsx    # 4 passos do processo
│   │   ├── IAFirst.tsx       # Diferencial IA-First
│   │   ├── FAQ.tsx           # Accordion com 8 perguntas
│   │   ├── CTA.tsx           # Formulário de conversão
│   │   ├── Footer.tsx        # Footer com links
│   │   └── CTASticky.tsx     # CTA fixo mobile
│   ├── ui/                   # Componentes shadcn
│   └── SEO.tsx              # JSON-LD schemas
├── pages/
│   └── Index.tsx            # Página principal
└── assets/
    └── hero-bg.jpg          # Hero background gerado
```

## 🚀 Como Rodar

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse: `http://localhost:8080`

### Build

```bash
npm run build
npm run preview
```

## ✨ Funcionalidades

### SEO & Performance

- ✅ Meta tags otimizadas (title, description, OG, Twitter)
- ✅ JSON-LD schemas (Organization, Course, FAQ)
- ✅ Canonical URLs
- ✅ Sitemap ready
- ✅ Lazy loading de imagens
- ✅ Web fonts otimizados (Google Fonts com preconnect)
- ✅ Lighthouse score target: ≥ 90 em todas categorias

### Acessibilidade (WCAG AA)

- ✅ Contraste mínimo 4.5:1
- ✅ Touch targets 44-48px (mobile)
- ✅ Focus visible em todos elementos interativos
- ✅ Navegação por teclado (Tab, Enter, Space)
- ✅ Landmarks ARIA implícitos (header, main, footer, nav)
- ✅ Textos alternativos descritivos

### Mobile-First

- ✅ Breakpoints: 320px, 640px, 768px, 1024px, 1280px
- ✅ CTA sticky mobile (aparece após scroll 300px)
- ✅ Menu hamburguer responsivo
- ✅ Touch-friendly (48px mínimo)
- ✅ Font size mínimo 16px (evita zoom no iOS)

### UX/UI

- ✅ Microanimações sutis (fade, slide, scale)
- ✅ Loading states nos formulários
- ✅ Toast notifications (sucesso/erro)
- ✅ Hover states consistentes
- ✅ Single CTA por seção (reduz decision paralysis)

## 📊 Seções da Landing Page

1. **Hero**
   - Headline: "Pare de estudar sozinho"
   - Subheadline com proposta de valor
   - 2 CTAs (primário + secundário)
   - Social proof (Balta.io, Eduardo Pires, 77k+ alunos)

2. **Problemas → Soluções**
   - 4 cards com dores reais + soluções
   - Transição visual (texto riscado → solução em destaque)

3. **Como Funciona**
   - 4 passos numerados com tempo estimado
   - Ícones e gradients para hierarquia visual

4. **IA-First**
   - 3 pilares (Prompts, Copilots, Automações)
   - Stats (3x produtividade, 90% usa IA, 100% validação)

5. **FAQ**
   - Accordion com 8 perguntas frequentes
   - Foco em objeções (gratuito?, tempo?, certificado?)

6. **CTA Final**
   - Formulário com validação
   - Trust signals (100% gratuito, comunidade, comece hoje)

7. **Footer**
   - Links de navegação
   - Contato e social

## 🎯 KPIs de Sucesso (90 dias)

- **CTR Hero**: 8-12%
- **Scroll 50%**: >70%
- **Form submission**: 15-25%
- **Retenção 4 semanas**: 90%+
- **NPS**: 65+

## 🧪 Próximos Passos

### A/B Testing
- [ ] Testar 2 variações de Hero (benefício vs. prova social)
- [ ] Testar ordem das seções
- [ ] Testar microcopy dos CTAs

### Analytics
- [ ] Configurar Google Analytics 4
- [ ] Eventos: `cta_click`, `form_submit`, `faq_toggle`, `scroll_depth`
- [ ] Heatmaps (Hotjar/Microsoft Clarity)

### Otimizações
- [ ] Lighthouse audit completo
- [ ] Comprimir imagens (WebP)
- [ ] Implementar service worker (PWA)
- [ ] Critical CSS inline

### Integrações
- [ ] CRM/HubSpot para leads
- [ ] Discord webhook para notificações
- [ ] E-mail marketing (envio de boas-vindas)

## 📝 Edição de Conteúdo

### Alterar Textos

Todos os textos estão hard-coded nos componentes em `src/components/sections/`. Para um sistema mais flexível, considere migrar para:

```typescript
// content/home.json
{
  "hero": {
    "badge": "Mentorias 100% Gratuitas",
    "headline": "Pare de estudar sozinho.",
    "subheadline": "Entre na mentoria gratuita...",
    "cta_primary": "Entrar na Mentoria Gratuita",
    "cta_secondary": "Como Funciona"
  }
}
```

### Trocar Imagens

1. Adicionar nova imagem em `src/assets/`
2. Importar no componente:
   ```tsx
   import newImage from "@/assets/new-image.jpg";
   ```
3. Usar no JSX:
   ```tsx
   <img src={newImage} alt="Descrição" />
   ```

### Customizar Cores

Editar `src/index.css`:

```css
:root {
  --primary: 264 74% 52%; /* Mudar para nova cor HSL */
}
```

## 🔗 Links Úteis

- [Lovable Docs](https://docs.lovable.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## 📄 Licença

© 2025 4uCode. Todos os direitos reservados.
