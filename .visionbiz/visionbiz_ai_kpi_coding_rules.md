# VisionBiz — ai-kpi-coding-rules.md

# Objetivo

Este documento define as diretrizes obrigatórias para a IA ao ler arquivos de especificação de KPIs (Key Performance Indicators) e transformá-los em componentes de frontend, dashboards, tabelas ou gráficos no ecossistema VisionBiz.

O objetivo é garantir que a inteligência de dados seja traduzida em código performático, visualmente deslumbrante e perfeitamente compreensível para o usuário final.

---

# 1. Como a IA deve interpretar os Arquivos de KPIs

Ao receber uma lista de KPIs do projeto (ex: métricas de RH, Financeiro ou Compliance), a IA deve processar cada indicador sob 4 dimensões obrigatórias antes de gerar o código:

1. **A Identidade do Dado:** O nome técnico, a fórmula de cálculo e a fonte de origem do dado.
2. **A Periodicidade:** Se o dado é em tempo real, diário, mensal ou anual (isso define a estratégia de cache/re-render).
3. **A Audiência:** Quem vai ler esse KPI? (Um tom de visualização focado na diretriz de setores tradicionais).
4. **A Ação Vinculada:** O que o usuário deve fazer se este KPI estiver "vermelho" ou crítico?

---

# 2. Padrão de Componentização de KPIs (UI/UX)

Para cada KPI especificado nos arquivos de negócio, a IA deve gerar um componente estruturado seguindo o design dark-mode premium (`color.graphite.900`) composto por:

### A. O Card Base (`CardKpi`)
* **Título:** Curto e objetivo (ex: "Rotatividade de Pessoal", "Inadimplência Mensal").
* **Valor Principal:** Em destaque, utilizando a tipografia oficial, com formatação regionalizada correta (ex: `R$ 45.230,00` ou `14,8%`).
* **Indicador de Tendência (Trend):** Um badge discreto indicando se o número subiu, desceu ou estabilizou em relação ao período anterior (ex: `+2.4%` em verde se positivo para o negócio, ou vermelho se prejudicial).

### B. O Amparo ao Usuário Tradicional (Obrigatório)
* **Tooltip Explicativo:** Todo `CardKpi` deve obrigatoriamente renderizar um ícone discreto de informação (`HelpCircle` do Lucide). Ao passar o mouse (hover), deve exibir em linguagem simples:
  1. O que significa aquela métrica.
  2. Como ela é calculada (a fórmula traduzida para o português corporativo).

---

# 3. Regras Técnicas de Codificação para KPIs

Ao gerar o código do dashboard ou componente de métrica, a IA deve implementar as seguintes otimizações:

## 1. Abstração de State com TanStack Query
As consultas que buscam os valores dos KPIs devem ser isoladas em hooks customizados (ex: `useKpiFaturamento()`). O código deve prever:
* `staleTime` adequado para evitar requisições redundantes ao banco de dados.
* Estado de `isLoading` acoplado a um componente de **Skeleton Screen** refinado (respeitando as regras de *motion-guidelines*).

## 2. Escolha do Gráfico Correto (Data Vis)
Se o KPI exigir uma visualização gráfica (usando as ferramentas homologadas: Recharts, Tremor ou ECharts), a IA deve seguir a regra lógica:
* **Evolução Temporal/Tendência:** Gráficos de Linha (`LineChart`) ou Área (`AreaChart`) com curvas suaves (`type="monotone"`).
* **Comparação de Categorias:** Gráficos de Barras (`BarChart`).
* **Distribuição/Composição:** Gráficos de Pizza/Donut (`DonutChart`) apenas para até 5 categorias. Acima disso, use barras horizontais.

---

# 4. Exemplo de Input de KPI vs. Output de Código Esperado

### Exemplo de Entrada (O que você extrai do seu arquivo de KPI):
> "KPI: Turnover Mensal. Cálculo: (Demitidos / Total Funcionários) * 100. Meta: Abaixo de 3%. Público: Gestor de RH."

### Exemplo de Saída que a IA deve Gerar (Código em React):
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KpiCardProps {
  valor: number;
  perfilAnterior: number;
}

export function KpiTurnover({ valor, perfilAnterior }: KpiCardProps) {
  const metaAtingida = valor <= 3;
  const mudanca = valor - perfilAnterior;

  return (
    <Card className="bg-[#0D1117] border-[#22272E] text-[#F8FAFC]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#64748B] flex items-center gap-1">
          Turnover Mensal
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-3.5 w-3.5 text-[#64748B] hover:text-[#2563EB]" />
              </TooltipTrigger>
              <TooltipContent className="bg-[#161B22] border-[#30363D] text-xs max-w-xs">
                <p>Mede o índice de rotatividade de funcionários na empresa. Calculado pela divisão do total de demissões pelo número médio de colaboradores no mês.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valor.toFixed(2)}%</div>
        <div className="flex items-center gap-1 text-xs mt-1">
          {mudanca > 0 ? (
            <span className="text-red-500 flex items-center"><ArrowUpRight className="h-3 w-3" /> +{mudanca}%</span>
          ) : (
            <span className="text-green-500 flex items-center"><ArrowDownRight className="h-3 w-3" /> {mudanca}%</span>
          )}
          <span className="text-[#64748B]">vs. mês anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

# Checklist de Entrega de KPI para a IA

Antes de considerar o componente pronto, a IA deve validar:
1. [ ] O valor exibe a formatação correta de acordo com a moeda/unidade do KPI?
2. [ ] O Tooltip descreve o cálculo sem usar jargões excessivamente matemáticos ou herméticos?
3. [ ] O componente trata o estado de erro ou dado ausente (ex: exibir `--` em vez de quebrar a tela)?
