# VisionBiz — ai-coding-automation-rules.md

# Objetivo

Este documento define as regras fundamentais e obrigatórias para qualquer Inteligência Artificial (Agente, Copiloto ou LLM) ao gerar, refatorar ou modificar códigos no ecossistema VisionBiz.

O objetivo é garantir a consistência arquitetural, a experiência de desenvolvimento (DX), o alinhamento com os design tokens e, principalmente, a **automação total de testes integrados**.

---

# 1. Stack Tecnológica Obrigatória

Toda geração de código deve utilizar estritamente a stack homologada:
* **Framework:** Next.js (App Router, Server Components por padrão, Client Components apenas quando houver interatividade) [cite: visionbiz_frontend_architecture.md].
* **Estilização:** Tailwind CSS (utilizando apenas os Design Tokens oficiais) [cite: visionbiz_design_tokens.md, visionbiz_frontend_architecture.md].
* **Componentes Base:** Radix UI primitives / shadcn/ui [cite: visionbiz_frontend_architecture.md, visionbiz_project_governance_rules.md].
* **Ícones:** Lucide Icons [cite: visionbiz_frontend_architecture.md].
* **Gerenciamento de Estado:** Zustand (Global) e TanStack Query (Server-state/Cache) [cite: visionbiz_frontend_architecture.md].
* **Formulários e Validação:** React Hook Form + Zod [cite: visionbiz_frontend_architecture.md].

---

# 2. Arquitetura de Pastas Co-localizada (Por Feature)

Ao criar uma nova ação ou funcionalidade, a IA nunca deve espalhar os arquivos aleatoriamente. O código deve ser isolado dentro da pasta da respectiva feature (`/src/features/[nome-da-feature]`) [cite: visionbiz_frontend_architecture.md].

### Estrutura Obrigatória para Nova Ação:
```
/src/features/rh/components/admitir-funcionario/
├── FormAdmissao.tsx          # O componente visual (UI)
├── FormAdmissao.test.tsx     # Teste Unitário/Integração (Vitest)
├── useAdmissao.ts            # Logica/Regra de negócio isolada (Hook customizado)
└── types.ts                  # Tipagem TypeScript local da ação
```
*Não misture lógicas de features diferentes. Mantenha os componentes desacoplados e altamente reutilizáveis* [cite: visionbiz_component_library.md, visionbiz_frontend_architecture.md].

---

# 3. Regras de Ouro para Automação de Testes (Day 0)

Para **toda e qualquer ação** que envolva interação do usuário, mutação de dados ou cálculos, a IA é **obrigada** a gerar o respectivo arquivo de teste automatizado na mesma pasta.

### Critérios de Aceitação do Teste gerado pela IA:
1. **Ambiente:** Os testes locais/integração devem usar `Vitest` + `@testing-library/react`.
2. **Foco no Usuário:** Os testes devem simular o comportamento do usuário (ex: preencher inputs, clicar em botões) e não a implementação interna do código.
3. **Casos de Sucesso e Falha:** O arquivo de teste deve validar o fluxo feliz (sucesso) e, no mínimo, um cenário de erro comum (ex: campo obrigatório vazio ou formato inválido).
4. **Alinhamento com Público Tradicional:** O teste deve validar se as mensagens de erro na interface são humanas, claras e resolutivas.

---

# 4. Padrões de Escrita de Código e Naming Conventions

* **Pastas e Arquivos de rotas:** `kebab-case` (ex: `fechamento-folha/`) [cite: visionbiz_project_governance_rules.md].
* **Componentes React:** `PascalCase` (ex: `CardKpi.tsx`) [cite: visionbiz_project_governance_rules.md].
* **Hooks customizados:** `camelCase` iniciando com `use` (ex: `useCalculoImposto.ts`) [cite: visionbiz_project_governance_rules.md].
* **Tipagem:** TypeScript estrito. Proibido o uso de `any`. Sempre tipar retornos de funções e payloads de API [cite: visionbiz_developer_experience.md].

---

# 5. Checklist de Autoverificação da IA (Prompt Gate)

Antes de entregar qualquer bloco de código, a IA deve rodar internamente este checklist e garantir que todas as respostas sejam **Sim**:

1. [ ] Eu criei o arquivo `.test.tsx` correspondente para esta nova funcionalidade?
2. [ ] O componente está consumindo as variáveis/tokens do Tailwind em vez de cores hardcoded? [cite: visionbiz_design_tokens.md]
3. [ ] A lógica de negócio (chamadas de API/mutações) foi extraída para um Hook isolado do componente visual?
4. [ ] Se o fluxo for quebrado por um erro de API, a interface exibirá uma mensagem clara para um usuário de setor tradicional?
5. [ ] O código respeita a acessibilidade básica (como `aria-labels` em botões que contêm apenas ícones)? [cite: visionbiz_frontend_architecture.md, visionbiz_project_governance_rules.md]

---

# Diretriz Final

Se o código gerado não possuir testes automatizados equivalentes ou violar a estrutura modular por features, ele será rejeitado pela esteira de CI/CD da VisionBiz [cite: visionbiz_frontend_architecture.md]. Codifique com precisão, robustez e foco em estabilidade enterprise.
