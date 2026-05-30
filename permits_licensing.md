ARQUITETURA DE PERMISSÕES, LICENÇAS E CONTROLE DE ACESSO (RBAC)

Especificação Técnica – Arquitetura de Permissões, Licenciamento e Controle de Acesso (RBAC)

Versão: 1.0

Status: Pronto para Desenvolvimento

Objetivo: Definir como a ePlataforma (Central de Contas) gerencia e propaga as permissões de acesso e licenças de módulos adquiridos para as aplicações satélites (como o Módulo de DP).

1. O Conceito: Separação de Responsabilidades (Decoupled Auth)

Para manter os módulos (DP, Fiscal, Tracker) leves e independentes, adotamos a regra de Centralização de Identidade e Federação de Autorização:

A ePlataforma (Central de Contas) é a Fonte Única da Verdade: Ela sabe quem o usuário é, qual empresa ele representa, qual papel ele desempenha (user_role) e quais módulos a empresa dele pagou para ter acesso.

Os Módulos apenas Consomem e Obedecem: Quando o usuário clica para entrar no módulo de DP, o módulo não faz consultas pesadas de permissão no banco de dados da Central de Contas. Ele simplesmente lê o token JWT criptografado que o usuário apresenta.

       [ ePlataforma (SSO) ] ── (Gera JWT assinado com Licenças e Roles)
                 │
                 ▼
       [ Navegador do Usuário ] ── (Envia o JWT no Header de cada requisição)
                 │
        ┌────────┴────────┐
        ▼                 ▼

[ Módulo DP ] [ Módulo Fiscal ]
(Lê o JWT e (Lê o JWT e
libera a tela) bloqueia/libera)

2. Modelagem de Dados Estendida na ePlataforma

Para gerenciar o licenciamento de módulos comercializados separadamente, adicionamos as entidades de controle de Módulos e Licenças de Tenants na Central de Contas:

-- 1. Tabela de Cadastro de Módulos Disponíveis no Ecossistema
CREATE TABLE platform_modules (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
code VARCHAR(50) UNIQUE NOT NULL, -- ex: "DP", "FISCAL", "TRACKER", "BENEFITS"
name VARCHAR(100) NOT NULL,
description TEXT,
base_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Licenciamento de Tenants (Associação Empresa -> Módulos Contratados)
CREATE TYPE license_status AS ENUM ('ACTIVE', 'SUSPENDED', 'TRIAL');

CREATE TABLE tenant_module_licenses (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
module_id UUID NOT NULL REFERENCES platform_modules(id) ON DELETE CASCADE,
status license_status NOT NULL DEFAULT 'ACTIVE',
expires_at TIMESTAMP WITH TIME ZONE, -- Nulo para recorrência ativa sem data de fim
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
UNIQUE (tenant_id, module_id)
);

3. O Fluxo de Dados: Estrutura do Token JWT

Quando o usuário faz login ou troca de empresa ativa no Hub, a ePlataforma assina digitalmente um Token JWT. É este token que garante o acesso silencioso dele nos módulos.

Exemplo de Payload JWT Gerado:

{
"iss": "auth.eplataforma.com.br",
"sub": "user_id_uuid",
"exp": 1716386400,
"user": {
"name": "Carlos Silva",
"role": "CLIENT_ADMIN"
},
"tenant": {
"id": "tenant_id_uuid",
"name": "Minha Empresa LTDA"
},
"entitlements": {
"active_modules": ["DP", "BENEFITS"],
"limits": {
"max_employees": 15
}
}
}

Como os módulos processam essa informação:

O Portal Hub (Launchpad) consome o JWT: Ele renderiza os cards de "DP" e "Clube de Benefícios" com botões de acesso, pois eles constam em active_modules. O card do "Fiscal" será exibido com um cadeado (tela de venda/upsell).

O Módulo de DP consome o JWT: Quando o usuário clica no módulo de DP, a aplicação lê o token e valida: A lista de active_modules contém "DP"? Sim. O usuário tem a role "CLIENT_ADMIN"? Sim, então ele pode cadastrar colaboradores.

4. Middleware de Segurança nos Módulos (Exemplo em Node.js/Express)

Os desenvolvedores devem criar um validador padrão (Middleware) para colocar na entrada de cada rota ou serviço dos módulos:

// middleware/auth_guard.js
const jwt = require('jsonwebtoken');

// Chave pública compartilhada (ou secret robusto) configurada nas variáveis de ambiente dos módulos
const JWT_SECRET = process.env.JWT_SECRET;

function checkModuleLicense(requiredModule) {
return (req, res, next) => {
const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Acesso negado. Token de autenticação ausente.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            // Decodifica e valida a assinatura do token gerado pela ePlataforma
            const decoded = jwt.verify(token, JWT_SECRET);

            // Injeta os dados do usuário decodificado na requisição para uso do banco de dados local
            req.user = decoded.user;
            req.tenant = decoded.tenant;
            req.entitlements = decoded.entitlements;

            // Validação de Licenciamento: O tenant possui a licença ativa para este módulo?
            const hasLicense = decoded.entitlements.active_modules.includes(requiredModule);

            if (!hasLicense) {
                return res.status(403).json({
                    error: `Sua empresa não possui contratação ativa para o módulo: ${requiredModule}.`
                });
            }

            next(); // Permissão concedida. Continua para a regra de negócio.

        } catch (error) {
            return res.status(401).json({ error: 'Token de autenticação inválido ou expirado.' });
        }
    };

}

module.exports = { checkModuleLicense };

5. Vantagens Comerciais e de Manutenção desta Escolha

Facilidade Absoluta para Cobrança e Upsell: Se o cliente está usando o DP e resolve assinar o Fiscal, você não precisa mexer em nada no módulo Fiscal ou no de DP. O seu gateway de faturamento aprova o pagamento, adiciona uma linha na tabela tenant_module_licenses na ePlataforma e pronto. No próximo clique, o token JWT do usuário já trará "FISCAL" na lista, destravando o módulo no ato.

Desempenho de Rede (Sem overhead de banco de dados): Seus módulos podem rodar em servidores diferentes ou linguagens diferentes. Eles não precisam se comunicar com o banco de dados principal de login para validar o acesso a cada requisição, poupando rede e infraestrutura.

Consistência de Dados para o White-Label: Como tudo passa pelo mesmo token emitido pela central, o controle de personalização e marcas se propaga por todos os sistemas instantaneamente.
