# 🚀 CRUD Agenus - Desafio Técnico Front-End

Uma aplicação Next.js completa para gerenciamento de produtos com interface moderna, dark mode e componentes Hero UI.

## 📋 Funcionalidades

### ✅ **CRUD de Produtos**
- **Criar** produtos com título, descrição, thumbnail e status
- **Listar** produtos com paginação, filtros e ordenação
- **Editar** produtos existentes
- **Deletar** produtos com confirmação
- **Upload** de thumbnails com validação
- **Filtros** por status (ativo/inativo) e busca por título/descrição
- **Ordenação** por nome, status, data de criação e atualização

### 📊 **Dashboard com Métricas**
- Gráficos interativos com Recharts
- Métricas de produtos (total, ativos, inativos)
- Produtos recentes
- Visualização de dados em tempo real

### 🎨 **Interface Moderna**
- **Dark Mode** funcional com persistência
- **Design Responsivo** para desktop e mobile
- **Componentes Hero UI** (Headless UI) para acessibilidade
- **Animações** e transições suaves
- **Validação** completa com Zod

## 🛠️ Stack Tecnológica

### **Frontend**
- **Next.js 15** - Framework React com SSR
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Zustand** - Gerenciamento de estado
- **Hero UI (Headless UI)** - Componentes acessíveis
- **Heroicons** - Ícones SVG
- **Recharts** - Gráficos e métricas
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### **Backend/API**
- **API Externa** - [api-teste-front-production.up.railway.app](https://api-teste-front-production.up.railway.app)
- **Autenticação** - Token-based
- **Upload** - Multipart/form-data para imagens

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/juliomonteiiro/crud-agenus.git

# Entre no diretório
cd crud-agenus

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### **Variáveis de Ambiente**
```env
NEXT_PUBLIC_API_URL=https://api-teste-front-production.up.railway.app
```

### **Executar em Desenvolvimento**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### **Build para Produção**
```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── auth/            # Autenticação
│   ├── dashboard/       # Dashboard e métricas
│   ├── layout/          # Layout (Header, Sidebar)
│   ├── products/        # Componentes de produtos
│   └── ui/              # Componentes base (Hero UI)
├── pages/               # Páginas da aplicação
├── stores/              # Zustand stores
├── services/            # Serviços de API
├── styles/              # Estilos globais
└── utils/               # Utilitários
```

## 🎯 Funcionalidades Implementadas

### **✅ Requisitos Obrigatórios**
- [x] CRUD completo de produtos
- [x] Autenticação com token
- [x] Validação com Zod
- [x] Interface responsiva
- [x] Dark mode funcional
- [x] Deploy na Vercel

### **✅ Stack Diferencial**
- [x] **Zustand** para gerenciamento de estado
- [x] **Hero UI (Headless UI)** para componentes
- [x] **Animações** e transições elegantes
- [x] **Validação avançada** com Zod
- [x] **Upload de arquivos** com validação
- [x] **Filtros e ordenação** avançados

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
npm run type-check   # Verificação de tipos
```

## 📱 Responsividade

- **Desktop** - Layout completo com sidebar
- **Mobile** - Interface otimizada para touch

## 🎨 Tema

- **Sistema** - Segue preferência do SO
- **Claro** - Tema light
- **Escuro** - Tema dark
- **Persistência** - Salva preferência no localStorage

## 🔐 Autenticação

- **Login** com email e senha
- **Token** armazenado no localStorage
- **Proteção** de rotas com AuthGuard
- **Logout** remove token localmente

## 📊 Métricas do Dashboard

- **Total de Produtos** - Contagem geral
- **Produtos Ativos** - Produtos habilitados
- **Produtos Inativos** - Produtos desabilitados
- **Produtos Recentes** - Últimos 3 produtos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para o desafio técnico Front-End da Agenus.

## 👨‍💻 Desenvolvedor

**Julio Monteiro**
- GitHub: [@juliomonteiiro](https://github.com/juliomonteiiro)
- LinkedIn: [Julio Monteiro](https://www.linkedin.com/in/julio-alexsandro-monteiro-da-silva-294b25248/)

---

## 🎯 Diferenciais Implementados

### **UX/UI**
- Interface moderna e intuitiva
- Animações suaves e transições
- Feedback visual em todas as ações
- Loading states e skeletons
- Modais de confirmação elegantes

### **Performance**
- Lazy loading de componentes
- Otimização de imagens com Next.js
- Bundle splitting automático
- Cache inteligente

### **Acessibilidade**
- Componentes Headless UI
- Navegação por teclado
- Screen reader friendly
- Contraste adequado
- Foco visível

### **Desenvolvimento**
- TypeScript em 100% do código
- ESLint e Prettier configurados
- Estrutura modular e escalável
- Documentação completa
- Código limpo e legível

---

**Desenvolvido por [Julio Monteiro](https://github.com/juliomonteiiro)**