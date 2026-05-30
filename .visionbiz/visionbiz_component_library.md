# VisionBiz — component-library.md

# Objetivo

Este documento define os padrões oficiais da Component Library da VisionBiz.

Todos os componentes da plataforma devem seguir estas diretrizes.

O objetivo é garantir:

- consistência visual;
- reutilização;
- escalabilidade;
- acessibilidade;
- previsibilidade;
- integração com design system;
- velocidade de desenvolvimento.

---

# Filosofia da Component Library

A biblioteca de componentes da VisionBiz deve parecer:

- moderna;
- enterprise-grade;
- modular;
- sofisticada;
- altamente reutilizável.

---

# O sistema nunca deve parecer

- improvisado;
- inconsistente;
- visualmente fragmentado;
- acoplado;
- desorganizado.

---

# Objetivo Principal

Todo componente deve:

- resolver um problema claro;
- ser reutilizável;
- ser previsível;
- possuir comportamento consistente;
- seguir os tokens oficiais;
- integrar-se perfeitamente ao ecossistema.

---

# Princípios Fundamentais

# Reutilização

Componentes devem evitar duplicação.

---

# Modularidade

Cada componente deve possuir responsabilidade clara.

---

# Consistência

Toda interface deve parecer parte do mesmo sistema.

---

# Escalabilidade

A biblioteca deve suportar crescimento contínuo.

---

# Acessibilidade

Todos os componentes devem possuir suporte acessível.

---

# Estrutura Oficial

/packages/ui

/components

/layout

/forms

/navigation

/feedback

/data-display

/overlays

/charts

/ai

/dashboard

/primitives

/hooks

/utils

/themes

/tokens

---

# Arquitetura Recomendada

# Estrutura de componente

/button

Button.tsx

Button.types.ts

Button.styles.ts

Button.test.tsx

Button.stories.tsx

index.ts

---

# Todo componente deve possuir

- tipagem;
- variantes;
- estados;
- acessibilidade;
- documentação futura;
- comportamento consistente.

---

# Classificação Oficial

# Primitives

Componentes básicos.

Exemplos:

- Box;
- Stack;
- Flex;
- Grid;
- Text;
- Heading.

---

# Inputs

Componentes de entrada.

Exemplos:

- Input;
- Textarea;
- Select;
- Checkbox;
- Switch;
- Radio;
- DatePicker.

---

# Navigation

Componentes de navegação.

Exemplos:

- Sidebar;
- Topbar;
- Tabs;
- Breadcrumbs;
- Pagination.

---

# Feedback

Componentes de feedback.

Exemplos:

- Toast;
- Alert;
- Skeleton;
- Progress;
- Loading;
- EmptyState.

---

# Overlays

Componentes flutuantes.

Exemplos:

- Modal;
- Drawer;
- Popover;
- Tooltip;
- Dropdown.

---

# Data Display

Exibição de dados.

Exemplos:

- Card;
- Table;
- DataGrid;
- KPI;
- Timeline;
- ActivityFeed.

---

# Dashboard Components

Componentes especializados.

Exemplos:

- DashboardCard;
- AnalyticsChart;
- MetricsGrid;
- AlertPanel;
- InsightsPanel.

---

# AI Components

Componentes relacionados à IA.

Exemplos:

- AIChat;
- AIInsights;
- AIRecommendations;
- WorkflowAssistant;
- SmartActions.

---

# Regras Visuais

# Todos os componentes devem seguir

- design tokens oficiais;
- branding-rules;
- ui-system;
- motion-guidelines.

---

# Nunca utilizar

- estilos hardcoded;
- cores improvisadas;
- espaçamentos arbitrários;
- motion inconsistente.

---

# Variants System

# Todo componente deve suportar variantes.

---

# Exemplo

variant:

- primary;
- secondary;
- ghost;
- outline;
- danger.

---

# Sizes System

# Todo componente interativo deve possuir tamanhos padronizados.

---

# Exemplo

size:

- sm;
- md;
- lg.

---

# States System

# Todo componente deve possuir estados oficiais.

---

# Estados obrigatórios

- default;
- hover;
- focus;
- active;
- disabled;
- loading;
- error.

---

# Motion Rules

# Toda animação deve seguir

- motion tokens;
- motion-guidelines.

---

# Motion permitido

- hover suave;
- transições rápidas;
- feedback visual discreto.

---

# Motion proibido

- bounce exagerado;
- animações agressivas;
- efeitos distrativos.

---

# Accessibility

# Obrigatório

- keyboard navigation;
- aria labels;
- screen reader support;
- focus visible;
- contraste adequado.

---

# Nunca permitir

- componentes inacessíveis;
- foco invisível;
- interação apenas visual.

---

# Responsividade

# Todo componente deve funcionar em

- desktop;
- tablet;
- mobile.

---

# Dark Mode

# Prioridade absoluta.

Todos os componentes devem nascer dark-first.

---

# Light Mode

Deve ser suportado futuramente.

---

# Layout Components

# Exemplos oficiais

- PageContainer;
- Section;
- ContentWrapper;
- SplitLayout;
- DashboardLayout.

---

# Form Components

# Os formulários devem transmitir

- clareza;
- velocidade;
- confiança;
- organização.

---

# Regras

## Inputs devem possuir

- labels claros;
- feedback imediato;
- validação contextual;
- estados consistentes.

---

# Tables

# Tabelas devem priorizar

- leitura rápida;
- escaneabilidade;
- performance.

---

# DataGrid

# Deve suportar

- filtros;
- ordenação;
- paginação;
- virtualização;
- seleção;
- exportação.

---

# KPI Components

# KPIs devem transmitir

- inteligência;
- estabilidade;
- leitura rápida.

---

# Cards

# Os cards devem possuir

- padding confortável;
- hierarquia clara;
- bordas suaves;
- profundidade discreta.

---

# Charts

# Os gráficos devem seguir

- dashboard-patterns;
- design tokens;
- motion guidelines.

---

# AI Components

# Componentes de IA devem transmitir

- inteligência;
- atividade;
- contexto;
- automação.

---

# Nunca parecer

- chatbot genérico;
- sistema improvisado.

---

# Naming Convention

# Componentes

PascalCase.

---

# Hooks

use + PascalCase.

---

# Props

camelCase.

---

# Tokens

kebab-case ou dot notation.

---

# TypeScript Rules

# Obrigatório

- tipagem forte;
- interfaces explícitas;
- variantes tipadas.

---

# Nunca utilizar

- any sem justificativa;
- props ambíguas.

---

# Styling Strategy

# Recomendação oficial

- Tailwind;
- CVA;
- CSS Variables;
- clsx;
- tailwind-merge.

---

# Nunca permitir

- estilos inline excessivos;
- lógica visual duplicada.

---

# Documentation

# Todo componente deve possuir futuramente

- exemplos;
- variantes;
- estados;
- guidelines;
- playground;
- documentação visual.

---

# Storybook

# Recomendação oficial

Utilizar Storybook como ambiente oficial da component library.

---

# Testing

# Todo componente crítico deve possuir

- unit tests;
- accessibility tests;
- interaction tests.

---

# Ferramentas recomendadas

- Vitest;
- Testing Library;
- Playwright.

---

# Performance

# Componentes devem priorizar

- renderização eficiente;
- baixo acoplamento;
- memoização quando necessário;
- lazy loading.

---

# Nunca permitir

- re-render desnecessário;
- componentes pesados.

---

# Versionamento

# A biblioteca deve possuir

- versionamento;
- changelog;
- controle de breaking changes.

---

# Publicação

# Estrutura futura recomendada

- private registry;
- package versioning;
- CI automatizado.

---

# Integração com IA

# O sistema deve permitir

- geração assistida;
- criação automatizada de componentes;
- documentação automática;
- análise visual.

---

# Regras para geração automática

## Toda IA deve respeitar

- design tokens;
- naming conventions;
- accessibility;
- arquitetura oficial.

---

# KPI Visual

# A component library deve transmitir

- robustez;
- maturidade;
- consistência;
- sofisticação;
- engenharia premium.

---

# KPI Técnico

# O sistema deve aumentar

- produtividade;
- velocidade;
- previsibilidade;
- reutilização;
- qualidade.

---

# Integração com Ecossistema

# Toda component library deve seguir

- visionbiz-design-tokens;
- branding-rules;
- ui-system;
- motion-guidelines;
- frontend-architecture;
- developer-experience.

---

# Diretriz Final

Todo componente da VisionBiz deve responder:

"Isso parece parte de uma plataforma enterprise moderna, inteligente e extremamente consistente?"

Se não parecer, deve ser revisado.

