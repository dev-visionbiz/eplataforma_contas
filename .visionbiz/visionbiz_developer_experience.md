# VisionBiz — developer-experience.md

# Objetivo

Este documento define os padrões oficiais de Developer Experience (DX) da VisionBiz.

Toda arquitetura, fluxo de desenvolvimento, automação e estrutura técnica deve priorizar experiência de desenvolvimento de alto nível.

O objetivo é garantir:

- produtividade;
- escalabilidade;
- previsibilidade;
- qualidade;
- onboarding rápido;
- colaboração eficiente;
- desenvolvimento sustentável.

---

# Filosofia de DX

A experiência de desenvolvimento da VisionBiz deve parecer:

- moderna;
- organizada;
- previsível;
- inteligente;
- modular;
- enterprise-grade.

---

# O ambiente nunca deve parecer

- improvisado;
- confuso;
- acoplado;
- desorganizado;
- burocrático;
- difícil de escalar.

---

# Objetivo Principal

Todo desenvolvedor deve conseguir:

- entender rapidamente o projeto;
- localizar informações facilmente;
- criar funcionalidades com previsibilidade;
- manter consistência;
- evitar retrabalho;
- desenvolver com velocidade.

---

# Princípios Fundamentais

# Clareza

O projeto deve ser fácil de entender.

---

# Modularidade

Tudo deve ser desacoplado e reutilizável.

---

# Escalabilidade

A estrutura deve suportar crescimento contínuo.

---

# Automação

Processos repetitivos devem ser automatizados.

---

# Padronização

Todos os times devem seguir os mesmos padrões.

---

# Estrutura do Projeto

# Estrutura Base

/apps

/web

/admin

/landing

/packages

/ui

/config

/types

/eslint-config

/tsconfig

/utils

/docs

/scripts

/agents

/infrastructure

---

# Filosofia Monorepo

## O projeto deve priorizar

- compartilhamento;
- reutilização;
- consistência;
- manutenção centralizada.

---

# Stack Recomendada

# Frontend

- Next.js;
- React;
- TypeScript;
- Tailwind;
- Framer Motion.

---

# Backend

- Node.js;
- NestJS;
- Fastify.

---

# Database

- PostgreSQL;
- Prisma ORM.

---

# Infraestrutura

- Docker;
- Vercel;
- AWS;
- Cloudflare.

---

# Qualidade de Código

# O código deve ser

- legível;
- previsível;
- desacoplado;
- modular;
- documentado;
- tipado.

---

# Nunca permitir

- lógica duplicada;
- arquivos gigantes;
- código sem contexto;
- arquitetura improvisada.

---

# Naming Convention

# Componentes

PascalCase.

---

# Hooks

camelCase iniciando com use.

---

# Pastas

kebab-case.

---

# Variáveis

camelCase.

---

# Constantes

UPPER_CASE.

---

# Git Strategy

# Branches

## Estrutura recomendada

- main;
- develop;
- feature/*;
- hotfix/*;
- release/*.

---

# Commits

## Utilizar Conventional Commits.

Exemplos:

feat:
fix:
refactor:
perf:
docs:
style:
chore:

---

# Pull Requests

## Todo PR deve possuir

- descrição clara;
- objetivo;
- impacto;
- screenshots quando necessário;
- checklist.

---

# Code Review

# O review deve avaliar

- clareza;
- performance;
- segurança;
- escalabilidade;
- acessibilidade;
- consistência.

---

# Nunca aprovar

- código inconsistente;
- lógica duplicada;
- quebra de padrões;
- soluções improvisadas.

---

# TypeScript Rules

# Obrigatório

- tipagem forte;
- evitar any;
- interfaces reutilizáveis;
- tipos compartilhados.

---

# Nunca utilizar

- any sem justificativa;
- inferência excessiva;
- tipos desorganizados.

---

# Design System Integration

# Todo frontend deve seguir

- branding-rules;
- ui-system;
- motion-guidelines;
- dashboard-patterns.

---

# Component Library

# Objetivo

Centralizar componentes reutilizáveis.

---

# Todo componente deve possuir

- tipagem;
- documentação futura;
- acessibilidade;
- responsividade;
- estados;
- variantes.

---

# Documentation Culture

# Toda feature importante deve possuir

- contexto;
- objetivo;
- arquitetura;
- dependências;
- exemplos.

---

# O projeto deve possuir

- documentação viva;
- onboarding técnico;
- padrões claros.

---

# Developer Onboarding

# Um novo desenvolvedor deve conseguir

- subir ambiente rapidamente;
- entender arquitetura;
- localizar módulos;
- executar testes;
- contribuir rapidamente.

---

# Tempo ideal de onboarding

Menos de 1 dia para ambiente funcional.

---

# Ambiente Local

# Deve possuir

- setup automatizado;
- scripts padronizados;
- ambiente previsível;
- hot reload rápido.

---

# Scripts Recomendados

- dev;
- build;
- test;
- lint;
- format;
- typecheck.

---

# Linting

# Obrigatório

- ESLint;
- Prettier;
- regras padronizadas.

---

# Nunca permitir

- estilos inconsistentes;
- código sem lint;
- formatação manual inconsistente.

---

# Testing Strategy

# Prioridades

- estabilidade;
- previsibilidade;
- segurança;
- regressão controlada.

---

# Estratégia recomendada

- unit tests;
- integration tests;
- e2e tests.

---

# Ferramentas recomendadas

- Vitest;
- Testing Library;
- Playwright.

---

# CI/CD

# O pipeline deve possuir

- lint;
- build validation;
- testes;
- preview deploy;
- deploy automatizado.

---

# Objetivo

Deploy rápido e confiável.

---

# Observabilidade

# O sistema deve suportar

- logs;
- tracing;
- métricas;
- monitoramento;
- rastreamento de erros.

---

# Ferramentas recomendadas

- Sentry;
- OpenTelemetry;
- LogRocket.

---

# Performance Culture

# Performance deve ser cultura.

Não otimização tardia.

---

# Prioridades

- bundles pequenos;
- renderização eficiente;
- lazy loading;
- cache inteligente;
- streaming.

---

# Segurança

# Todo desenvolvimento deve considerar

- autenticação;
- autorização;
- LGPD;
- proteção de dados;
- segurança de APIs.

---

# Nunca permitir

- secrets expostos;
- permissões frágeis;
- acesso inseguro.

---

# Infraestrutura

# O ambiente deve parecer

- robusto;
- moderno;
- escalável;
- automatizado.

---

# Docker

## Todo serviço importante deve suportar containerização.

---

# Infra as Code

## Prioridade futura

- Terraform;
- Pulumi;
- automação de ambientes.

---

# Developer Productivity

# Objetivo

Reduzir atrito operacional.

---

# O ecossistema deve favorecer

- velocidade;
- clareza;
- previsibilidade;
- automação.

---

# DX para IA

# O projeto deve suportar

- agentes especializados;
- automações;
- geração assistida;
- workflows inteligentes.

---

# Regras para IA no Desenvolvimento

## Toda geração automática deve respeitar

- arquitetura oficial;
- design system;
- tipagem;
- segurança;
- modularidade.

---

# Knowledge Base

# O projeto deve possuir

- documentação centralizada;
- padrões;
- decisões arquiteturais;
- playbooks;
- troubleshooting.

---

# Cultura Técnica

# A VisionBiz deve incentivar

- qualidade;
- organização;
- ownership;
- melhoria contínua;
- arquitetura sustentável.

---

# KPI de DX

## O ambiente deve aumentar

- produtividade;
- velocidade;
- consistência;
- colaboração;
- qualidade.

---

# KPI Técnico

## O projeto deve transmitir

- robustez;
- maturidade;
- organização;
- engenharia moderna;
- escalabilidade.

---

# Integração com Ecossistema

# Todo desenvolvimento deve seguir

- frontend-architecture;
- ui-system;
- ai-agents-rules;
- copywriting-system;
- motion-guidelines.

---

# Diretriz Final

Toda decisão de engenharia da VisionBiz deve responder:

"Isso reduz atrito, aumenta qualidade e permite escalar o ecossistema com previsibilidade?"

Se não permitir, deve ser revisado.

