# Integração com ePlataforma (Central de Contas)

Este documento descreve como o projeto **Hub** e outros módulos operacionais devem consumir a **ePlataforma** para autenticação e dados de usuário.

## 1. Arquitetura de Autenticação

A ePlataforma atua como o **Identity Provider (IdP)**. Todos os tokens JWT emitidos pela ePlataforma contêm as informações necessárias para que as outras aplicações identifiquem o usuário e o seu contexto de locatário (tenant).

### Fluxo de Autenticação (SSO)
1. O usuário tenta acessar o **Hub**.
2. Se não estiver autenticado, o Hub redireciona o usuário para a ePlataforma (`https://accounts.eplataforma.com/login`).
3. Após o login bem-sucedido, a ePlataforma redireciona de volta para o Hub com o token de sessão.

## 2. Estrutura do Token JWT (Claims)

Ao consumir o token emitido pela ePlataforma, os outros projetos devem esperar os seguintes campos no payload (através da função `get_auth_context` no Supabase):

```json
{
  "tenant_id": "uuid",
  "tenant_type": "enterprise | accounting",
  "parent_id": "uuid | null",
  "role": "master_admin | accounting_admin | client_admin | analyst | employee",
  "allowed_clients": ["uuid", "..."]
}
```

## 3. Como Consumir no Hub (Next.js)

Se o Hub estiver usando a mesma instância do Supabase:
- Basta utilizar o cliente do Supabase normalmente. As políticas de RLS e o JWT já estarão configurados.

Se o Hub for uma instância separada:
1. **Verificação de Token:** Use a chave pública do Supabase da ePlataforma para validar o JWT.
2. **Contexto:** Extraia o `tenant_id` e o `role` do token para aplicar permissões na interface.

## 4. Endpoints de API (Opcional)

A ePlataforma disponibiliza os seguintes endpoints para integração direta:

- `GET /api/auth/me`: Retorna os dados do usuário autenticado e seu tenant.
- `GET /api/tenants/resolve?domain=...`: Resolve as cores e logos de um tenant baseado no domínio (White-Label).

---
**Nota:** Para o MVP, o Hub deve compartilhar o mesmo projeto Supabase da ePlataforma para facilitar a sincronização de dados e autenticação.
