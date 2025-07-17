# PostUp – Clone do Trello em Desenvolvimento

📌 **Projeto**: PostUp (clone do Trello)  
🛠️ **Stack**: React + Clerk (autenticação), estado global, API própria/API-as-a-Service

---

## Sobre o Projeto

**PostUp** é inspirado no Trello, voltado para gerenciamento de tarefas por meio de quadros, listas e cartões.  
O projeto busca fornecer uma alternativa leve para organização pessoal e colaborativa.

Destaques:

- Autenticação segura via **Clerk** (login, registro, recuperação)
// > Exemplo: "Sign in with Clerk to start managing your boards"

---

## Funcionalidades Atuais

- ✅ Registro e login via Clerk  
- ✅ Criação e visualização de quadros (*boards*)  
- ✅ Dentro dos quadros: criação de listas e cartões  
- ✅ Drag & drop entre listas (implementação inicial)  
- ✅ Estado global para sync entre componentes  
- 🔄 Layout responsivo e boa experiência de uso

---

## Roadmap / Em Desenvolvimento

- 🔜 Funcionalidade completa de drag & drop refinada  
- 🔜 Edição, exclusão e reordenação de cartões e listas  
- 🔜 Colaboração em tempo real
- 🔜 Comentários e anexos em cartões  
- 🔜 Busca, filtros e notificações  
- 🔜 Integração com back-end persistente (Postgres, Supabase, etc.)

---

## Como Usar / Rodar Localmente

# Clone o repositório
git clone https://github.com/KevoGabriel/postup.git
cd postup

# Instale as dependências
yarn install
# ou
npm install


# Rode em modo de desenvolvimento
yarn dev

<h1>Importante</h1>
# Configure variáveis de ambiente (ex: CLERK_FRONTEND_API, CLERK_PUBLISHABLE_KEY)
# Crie um .env com as chaves da sua conta Clerk
