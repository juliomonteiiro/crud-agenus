# 🚀 CRUD Agenus - Desafio Técnico Front-End

Uma aplicação Next.js completa para gerenciamento de produtos com dashboard de métricas, desenvolvida para o desafio técnico da vaga Front-End.

## 🎯 Funcionalidades Implementadas

### ✅ CRUD de Produtos
- **Criar** produtos com título, descrição, thumbnail e status
- **Editar** produtos existentes com dados pré-preenchidos
- **Deletar** produtos com confirmação
- **Listar** produtos com paginação, filtros e busca
- **Upload** de imagens com validação de tipo e tamanho
- **Filtros avançados** por status, busca por texto e ordenação

### 📊 Dashboard com Métricas
- **Gráficos interativos** usando Recharts
- **Métricas em tempo real** baseadas nos dados da API
- **Visualizações**: Pizza, Linha, Barras
- **Dados mockados** para demonstração
- **Produtos recentes** com navegação

### 🔐 Autenticação
- **Login** com token da API
- **Rotas protegidas** com AuthGuard
- **Validação de sessão** automática
- **Logout** seguro
- **Validação robusta** com Zod

### 🎨 UI/UX
- **Design responsivo** - Funciona perfeitamente em desktop e mobile
- **Dark Mode** - Toggle na sidebar com persistência
- **Interface moderna** - Componentes customizados
- **Animações suaves** - Transições elegantes
- **Loading states** - Skeletons e spinners

## 🛠️ Stack Tecnológica

- **Next.js 15.5.3** - Framework React com SSR
- **React 19.1.0** - Biblioteca de interface
- **Zustand 5.0.8** - Gerenciamento de estado (diferencial!)
- **Tailwind CSS 3.4.17** - Estilização e responsividade
- **Zod 4.1.8** - Validação de formulários

- **Heroicons** - Ícones da interface
- **Componentes customizados** - Button, Modal, Card, Input, Switch
- **Recharts** - Gráficos e visualizações
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP com interceptors
- **Next.js Image** - Otimização de imagens

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/juliomonteiiro/crud-agenus.git
cd crud-agenus
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env.local na raiz do projeto
NEXT_PUBLIC_API_URL=https://api-teste-front-production.up.railway.app
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:3000
```

## 🔑 Credenciais de Teste

Use as credenciais fornecidas pela API:
- Acesse: `https://api-teste-front-production.up.railway.app/docs/`
- Faça login para obter seu token
- Use o token na aplicação

## 📱 Funcionalidades Detalhadas

### 🔍 Filtros e Busca
- **Busca por texto** - Título e descrição
- **Filtro por status** - Ativos, Inativos, Todos
- **Ordenação** - Por nome, data, status
- **Paginação** - Navegação intuitiva
- **Limpar filtros** - Reset rápido

### 📊 Dashboard
- **Métricas em tempo real** - Total, ativos, inativos
- **Gráfico de status** - Pizza chart
- **Tendência mensal** - Line chart
- **Distribuição** - Bar chart
- **Produtos recentes** - Lista atualizada

### ✅ Validações
- **Zod schemas** - Validação robusta
- **Mensagens em português** - Feedback claro
- **Validação de arquivos** - Tipo e tamanho
- **Regex patterns** - Caracteres válidos
- **Validação client-side** - Instantânea

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Autenticação
│   ├── dashboard/      # Gráficos e métricas
│   ├── layout/         # Layout e navegação
│   ├── products/       # CRUD de produtos
│   └── ui/             # Componentes base
├── hooks/              # Custom hooks
├── pages/              # Páginas Next.js
├── services/           # Serviços de API
├── stores/             # Zustand stores
├── styles/             # Estilos globais
├── types/              # Tipos TypeScript
└── utils/              # Utilitários
```

## 🎯 Diferenciais Implementados

- ✅ **Zustand** como gerenciador de estado
- ✅ **Dark Mode** funcional e persistente
- ✅ **Animações** e transições elegantes
- ✅ **Validação robusta** com Zod
- ✅ **Interface responsiva** mobile-first
- ✅ **Gráficos interativos** com Recharts
- ✅ **Filtros avançados** e busca
- ✅ **Loading states** e skeletons
- ✅ **TypeScript** completo
- ✅ **Código limpo** e organizado
- ✅ **Next.js Image** otimizado
- ✅ **Interceptors Axios** automáticos

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint
```

## 🌐 Deploy Online

**Link da aplicação:** [https://crud-agenus.vercel.app](https://crud-agenus.vercel.app)

## 📊 API Utilizada

- **Base URL:** `https://api-teste-front-production.up.railway.app`
- **Documentação:** `https://api-teste-front-production.up.railway.app/docs/`
- **Autenticação:** Token Bearer
- **Endpoints:** Produtos, Autenticação

## 🤝 Contribuição

Este é um projeto de desafio técnico. Para dúvidas ou sugestões, entre em contato.

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.

---

**Desenvolvido por [Julio Monteiro](https://github.com/juliomonteiiro)**
