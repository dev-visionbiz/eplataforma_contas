Este documento foi estruturado para servir como o **contexto definitivo de escopo** para o desenvolvimento da **ePlataforma**. Ele define os limites técnicos e funcionais para garantir que a IA foque exclusivamente na camada de identidade e administração, ignorando as regras de negócio dos módulos operacionais.

---

# Prompt de Contexto: Desenvolvimento da ePlataforma (Fase 0)

Este projeto refere-se estritamente à **ePlataforma**, que atua como o **Identity Provider (IdP)** e **SSO Hub** centralizado do ecossistema. O objetivo é implementar a infraestrutura de autenticação, o gerenciamento de múltiplos _tenants_ e o roteamento dinâmico para suporte a **White-Label**.

### 1. Escopo Exclusivo (O que DESENVOLVER)

O foco deve ser limitado às seguintes responsabilidades da Central:

- **Gestão de Identidade e SSO:** Autenticação única para acesso a todo o ecossistema.
- **Resolução de Tenant (White-Label):** Identificação do parceiro através do domínio de acesso para injeção dinâmica de marca (logos e cores).
- **Emissão e Gestão de Tokens:** Geração de **JSON Web Tokens (JWT)** com as alegações (_claims_) necessárias para autorização _stateless_ em outros aplicativos.
- **Controle de Acesso (RBAC):** Implementação dos papéis de usuário (Master Admin, Accounting Admin, Client Admin, etc.).
- **Segurança de Sessão:** Implementação de **Refresh Token Rotation** para invalidar sessões e mitigar ataques.

### 2. Fora de Escopo (O que NÃO desenvolver)

Embora compartilhem o mesmo banco de dados, os seguintes itens pertencem a **outros projetos** e não devem ser abordados agora:

- **VisionBiz Hub (Launchpad):** A interface de "sala de estar", mensageria, cards de módulos e o Tracker de processos são responsabilidades do Hub e não da Central.
- **Módulos Operacionais:** Toda a lógica de folha de pagamento (DP), apuração fiscal ou clube de benefícios está isolada em subdomínios próprios e não faz parte deste escopo.
- **Billing Engine:** O processamento de pagamentos e webhooks de gateway são funções do motor de faturamento, não da central de logins.

### 3. Stack Técnica e Tabelas Base

O desenvolvimento deve se basear no **Supabase (PostgreSQL/Auth)** e **Next.js com Edge Middleware**. As tabelas fundamentais para este projeto são:

- `tenants`: Armazena metadados de marca, subdomínios e hierarquia.
- `users`: Gerencia credenciais e papéis (RBAC).
- `user_refresh_tokens`: Controla a validade e revogação das sessões.

### 4. Requisito Crítico: O JWT

A Central deve ser capaz de gerar um token que "carregue" o contexto para os outros aplicativos. O payload deve conter obrigatoriamente:

- `tenant_id` e `tenant_type` (Empresa ou Escritório).
- `parent_id` (vínculo entre cliente e contador).
- `allowed_clients` (lista de UUIDs para analistas contábeis).

**Instrução para a IA:** Ao realizar qualquer implementação, atenha-se aos endpoints de **resolução de tenant, login, logout e refresh de token**. Não crie interfaces ou lógicas relacionadas a processos de folha de pagamento, calculadoras tributárias ou sistemas de chat.
