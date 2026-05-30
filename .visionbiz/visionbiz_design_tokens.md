# VisionBiz — visionbiz-design-tokens.md

# Objetivo

Este documento define os Design Tokens oficiais da VisionBiz.

Os tokens são a fundação visual e técnica do ecossistema da plataforma.

Todo frontend, componente, dashboard, animação e interface deve utilizar estes tokens.

O objetivo é garantir:

- consistência visual;
- escalabilidade;
- manutenção simplificada;
- integração entre equipes;
- previsibilidade;
- identidade forte.

---

# Filosofia dos Tokens

Os design tokens da VisionBiz devem transmitir:

- sofisticação;
- clareza;
- estabilidade;
- tecnologia;
- inteligência operacional;
- percepção premium.

---

# Regras Gerais

# Nunca utilizar

- valores aleatórios;
- cores improvisadas;
- espaçamentos inconsistentes;
- sombras diferentes sem padrão;
- tipografia desorganizada.

---

# Todo elemento visual deve utilizar tokens oficiais.

---

# Estrutura Oficial

/tokens

/colors

/spacing

/typography

/radius

/shadows

/motion

/z-index

/opacities

/breakpoints

---

# Color Tokens

# Core Colors

## Graphite Black

HEX: #0D1117

Token:

color.graphite.900

---

## Vision Blue

HEX: #2563EB

Token:

color.vision.500

---

## Ice White

HEX: #F8FAFC

Token:

color.ice.50

---

## Slate Gray

HEX: #64748B

Token:

color.slate.500

---

# Neutral Scale

color.neutral.50

#F8FAFC

---

color.neutral.100

#F1F5F9

---

color.neutral.200

#E2E8F0

---

color.neutral.300

#CBD5E1

---

color.neutral.400

#94A3B8

---

color.neutral.500

#64748B

---

color.neutral.600

#475569

---

color.neutral.700

#334155

---

color.neutral.800

#1E293B

---

color.neutral.900

#0F172A

---

# Semantic Colors

# Success

color.success.500

#22C55E

---

# Warning

color.warning.500

#F59E0B

---

# Danger

color.danger.500

#EF4444

---

# Info

color.info.500

#3B82F6

---

# Background Tokens

background.primary

#0D1117

---

background.secondary

#111827

---

background.card

#161B22

---

background.overlay

rgba(0,0,0,0.65)

---

# Surface Tokens

surface.default

#161B22

---

surface.hover

#1E293B

---

surface.active

#2563EB

---

# Border Tokens

border.default

rgba(255,255,255,0.08)

---

border.strong

rgba(255,255,255,0.16)

---

border.focus

#2563EB

---

# Typography Tokens

# Font Families

font.family.primary

"Inter", sans-serif

---

font.family.secondary

"Sora", sans-serif

---

font.family.code

"JetBrains Mono", monospace

---

# Font Sizes

font.size.xs

12px

---

font.size.sm

14px

---

font.size.md

16px

---

font.size.lg

18px

---

font.size.xl

20px

---

font.size.2xl

24px

---

font.size.3xl

30px

---

font.size.4xl

36px

---

font.size.5xl

48px

---

# Font Weights

font.weight.regular

400

---

font.weight.medium

500

---

font.weight.semibold

600

---

font.weight.bold

700

---

# Line Heights

font.lineHeight.tight

1.1

---

font.lineHeight.normal

1.5

---

font.lineHeight.relaxed

1.8

---

# Letter Spacing

font.letterSpacing.tight

-0.02em

---

font.letterSpacing.normal

0

---

font.letterSpacing.wide

0.04em

---

# Spacing Tokens

space.1

4px

---

space.2

8px

---

space.3

12px

---

space.4

16px

---

space.6

24px

---

space.8

32px

---

space.12

48px

---

space.16

64px

---

space.20

80px

---

space.24

96px

---

# Radius Tokens

radius.sm

6px

---

radius.md

10px

---

radius.lg

16px

---

radius.xl

24px

---

radius.2xl

32px

---

radius.full

999px

---

# Shadow Tokens

shadow.sm

0 1px 2px rgba(0,0,0,0.15)

---

shadow.md

0 4px 12px rgba(0,0,0,0.18)

---

shadow.lg

0 10px 24px rgba(0,0,0,0.22)

---

shadow.xl

0 20px 48px rgba(0,0,0,0.28)

---

# Glow Tokens

glow.primary

0 0 24px rgba(37,99,235,0.22)

---

glow.soft

0 0 16px rgba(255,255,255,0.08)

---

# Opacity Tokens

opacity.disabled

0.4

---

opacity.soft

0.72

---

opacity.medium

0.88

---

opacity.full

1

---

# Motion Tokens

motion.fast

120ms

---

motion.normal

220ms

---

motion.slow

420ms

---

# Easing Tokens

motion.ease.default

cubic-bezier(0.4, 0, 0.2, 1)

---

motion.ease.smooth

cubic-bezier(0.22, 1, 0.36, 1)

---

motion.ease.soft

cubic-bezier(0.25, 0.46, 0.45, 0.94)

---

# Blur Tokens

blur.sm

4px

---

blur.md

12px

---

blur.lg

24px

---

# Z-Index Tokens

z.base

1

---

z.dropdown

100

---

z.sticky

200

---

z.overlay

400

---

z.modal

500

---

z.toast

700

---

z.tooltip

800

---

# Breakpoints

breakpoint.sm

640px

---

breakpoint.md

768px

---

breakpoint.lg

1024px

---

breakpoint.xl

1280px

---

breakpoint.2xl

1536px

---

# Grid Tokens

grid.columns

12

---

grid.gutter

24px

---

grid.container

1440px

---

# Dashboard Tokens

dashboard.card.padding

24px

---

dashboard.card.radius

24px

---

dashboard.chart.height

320px

---

# Sidebar Tokens

sidebar.width.expanded

280px

---

sidebar.width.collapsed

84px

---

# Topbar Tokens

topbar.height

72px

---

# Input Tokens

input.height

48px

---

input.radius

16px

---

# Button Tokens

button.height.md

44px

---

button.height.lg

52px

---

button.radius

16px

---

# Animation Principles

# Toda animação deve utilizar

- motion tokens;
- easing oficial;
- durações padronizadas.

---

# Nunca utilizar

- timings arbitrários;
- shadows aleatórias;
- radius inconsistente.

---

# Theme System

# O sistema deve suportar

- dark mode;
- light mode;
- temas corporativos futuros.

---

# Estrutura recomendada

/theme

/dark

/light

/enterprise

---

# CSS Variables

# Recomendação oficial

Todos os tokens devem ser exportados como:

- CSS Variables;
- Tailwind Tokens;
- JSON Tokens;
- TypeScript Tokens.

---

# Estrutura recomendada

:root {
  --color-background-primary: #0D1117;
}

---

# Integração com Tailwind

# Recomendado

Extender o tailwind.config.ts com tokens oficiais.

---

# Integração com Componentes

# Todo componente deve consumir tokens.

Nunca utilizar estilos hardcoded.

---

# Integração com Motion

# Toda animação deve seguir

- motion-guidelines;
- motion tokens oficiais.

---

# Performance

# Tokens devem favorecer

- reutilização;
- consistência;
- otimização;
- manutenção.

---

# Escalabilidade

# O sistema deve suportar

- novos módulos;
- novos temas;
- white-label futuro;
- multi-branding;
- expansão enterprise.

---

# KPI Visual

# Os tokens devem transmitir

- sofisticação;
- estabilidade;
- clareza;
- modernidade;
- robustez.

---

# Integração com Ecossistema

# Todos os sistemas devem seguir

- branding-rules;
- ui-system;
- motion-guidelines;
- dashboard-patterns;
- frontend-architecture.

---

# Diretriz Final

Todo elemento visual da VisionBiz deve responder:

"Isso parece parte de uma infraestrutura empresarial moderna, inteligente e premium?"

Se não parecer, deve ser revisado.
