# VisionBiz — traditional-audience-alignment.md

# Objetivo

Este documento define as diretrizes oficiais de design, experiência (UX) e comunicação (Copywriting) para garantir o perfeito equilíbrio entre a sofisticação visual da VisionBiz e a usabilidade prática necessária para atender **setores tradicionais** (RH, Contabilidade, Financeiro, Compliance e Operações Empresariais).

O objetivo é garantir que a interface seja premium e minimalista, mas **nunca enigmática, intimidadora ou confusa** para o usuário real.

---

# A Grande Tensão: Premium vs. Tradicional

A VisionBiz adota uma estética inspirada em plataformas de alta engenharia (Stripe, Linear, Supabase). No entanto, nosso usuário final muitas vezes vem de legados burocráticos, planilhas complexas e softwares legados (SAP, Protheus, sistemas governamentais).

### O Erro Fatal
Remover elementos visuais importantes (como textos de apoio, rótulos e bordas) apenas para manter a interface "limpa", deixando o usuário tradicional sem saber onde clicar ou o que aquele dado significa.

### O Alinhamento VisionBiz
A interface deve ser um **Cockpit Inteligente**: visualmente limpo, escuro, sofisticado, mas com **total clareza, previsibilidade e amparo operacional**.

---

# Diretrizes de UX/UI para o Público Tradicional

## 1. Iconografia com Significado (Anti-Mistério)
* **Regra:** Nunca utilize ícones isolados para ações críticas sem um rótulo de texto (label) claro ao lado ou abaixo, a menos que o ícone seja universalmente óbvio (ex: Lixeira para deletar, Lupa para buscar).
* **Evitar:** Botões flutuantes ou ações em tabelas que dependem exclusivamente de ícones abstratos. Se o usuário precisar adivinhar o que o ícone faz (Hover-to-Discover), a interface falhou.

## 2. Textos de Apoio e Microcopy (Contexto Sempre)
* **Regra:** Seções complexas (como parametrização tributária, fechamento de folha de pagamento ou envio de obrigações acessórias) devem possuir um pequeno texto explicativo discreto (subtítulo em `color.slate.500`) resumindo o que aquela ação faz.
* **Uso de Tooltips:** Sempre que um termo técnico ou métrica complexa for exibida, inclua um ícone discreto de informação (`HelpCircle` do Lucide) com um Tooltip detalhado explicando o cálculo ou a origem do dado.

## 3. Estados de Confirmação (Paz de Espírito Operacional)
* **Regra:** O usuário tradicional tem medo de "errar e apagar tudo". Toda ação destrutiva, envio de lote ou alteração de status crítico deve:
  1. Exigir uma confirmação explícita em um Modal claro.
  2. Exibir um Toast ou alerta de sucesso inequívoco após a conclusão.
  3. Sempre que possível, oferecer a ação de "Desfazer" (Undo).

## 4. Tabelas Robustas e Familiares
* **Regra:** Setores tradicionais vivem no Excel. Nossas tabelas, embora sigam o padrão dark-mode premium, devem permitir:
  1. Paginação clara ou scroll infinito com contador visível ("Exibindo 1-20 de 1.450 registros").
  2. Filtros avançados que pareçam óbvios e fáceis de limpar (botão "Limpar Filtros" visível).
  3. Exportação rápida para CSV/Excel em um clique.

---

# Diretrizes de Copywriting (Tom de Voz Dedicado)

## 1. Elimine o Jargão Tecnológico Desnecessário
* **Não use:** "Dê um deploy na sua folha", "Pipeline de admissão", "Refatore seus custos".
* **Use:** "Publicar folha", "Etapas de admissão", "Otimizar custos".
* **Nota:** O jargão do cliente (ex: *ISS, eSocial, DAE, SLA*) deve ser respeitado e usado corretamente, mas o jargão do desenvolvedor/startup deve ser banido da interface.

## 2. Mensagens de Erro Humanizadas e Resolutivas
* **Evitar:** "Error 422: Unprocessable Entity" ou "Falha na validação do schema".
* **Substituir por:** "Não foi possível emitir a guia. O CNPJ da empresa está com o formato inválido. Por favor, verifique o campo e tente novamente."
* **Regra de Ouro:** Uma mensagem de erro para o público tradicional deve explicar **o que aconteceu** e **como resolver**.

---

# O Checklist do "Mundo Real" (QA de Usabilidade)

Antes de homologar qualquer feature ou tela, a equipe (ou a IA de geração) deve responder:

1. [ ] Uma pessoa de 50 anos que trabalhou os últimos 20 anos usando Excel saberia usar essa tela sem treinamento?
2. [ ] Existe algum botão cujo comportamento é um "mistério" até você clicar nele?
3. [ ] Se a internet do usuário cair no meio do processo, o sistema deixa claro que os dados estão salvos ou o que ele deve fazer?
4. [ ] O contraste das fontes (especialmente em textos menores ou desabilitados) respeita as regras de acessibilidade para evitar fadiga visual?

---

# Diretriz Final

A sofisticação da VisionBiz está na **capacidade de tornar o complexo simples**, e não em mascarar o complexo com minimalismo estéril. Trate o usuário tradicional com o respeito técnico que a profissão dele exige, oferecendo a ele a ferramenta mais bonita e poderosa que ele já viu na vida.
