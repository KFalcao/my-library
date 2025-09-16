# 📚 My Library 
Crie, organize e gerencie seu universo literário em um só lugar. My Library é a sua porta de entrada para uma experiência de leitura mais conectada e organizada.

## 📖 Visão Geral
Este projeto consiste em uma plataforma web moderna e intuitiva, projetada para que os amantes de livros possam catalogar sua coleção, acompanhar seu progresso de leitura e visualizar suas estatísticas em tempo real, tudo com um design elegante e totalmente responsivo.

## ⚙️ Tecnologias Utilizadas
O projeto foi construído com as seguintes tecnologias:
-   **Frontend:** `Next.js 15` com App Router, `React 19`, `TypeScript`
-   **Estilização:** `Tailwind CSS` para um design ágil e customizável
-   **Componentes:** `shadcn/ui` para uma interface de usuário consistente e profissional

## ✨ Funcionalidades

Explore tudo o que você pode fazer com o My Library:
-   📊 **Dashboard de Análise:** Visualize estatísticas da sua biblioteca, incluindo o total de livros, o que você está lendo no momento e o volume de páginas já lidas.
-   📖 **Gerenciamento de Coleção:** Navegue por todos os seus livros em cards elegantes. Use a **busca instantânea** por título/autor e **filtros inteligentes** por gênero.
-   ➕ **Cadastro Rápido:** Adicione novos livros de forma simples com um formulário completo, validação em tempo real e preview da capa.
-   ✏️ **Controle de Livros:** Edite qualquer informação de um livro ou o exclua com segurança, usando um pop-up de confirmação para evitar acidentes.
-   📱 **Design Adaptativo:** A experiência é fluida e perfeita em qualquer dispositivo, do celular ao desktop.
    

## 📂 Estrutura do Projeto
Nossa arquitetura modular foi pensada para escalabilidade e fácil manutenção:
```
my-library/
├── app/                  # Rotas, layouts e páginas da aplicação
│   ├── (dashboard)/      # Agrupa rotas relacionadas ao dashboard
│   ├── (library)/        # Agrupa rotas relacionadas à biblioteca de livros
│   ├── api/              # Rotas de API (ex: para dados, autenticação)
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal da aplicação
│   └── page.tsx          # Página inicial/dashboard
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Componentes da shadcn/ui
│   ├── books/            # Componentes específicos para livros
│   └── common/           # Componentes genéricos (Header, Footer, etc.)
├── lib/                  # Lógicas e utilitários da aplicação
├── public/               # Assets estáticos (imagens, fontes)
├── .gitignore            # Arquivos ignorados pelo Git
├── components.json       # Configuração da shadcn/ui
├── next.config.mjs       # Configuração do Next.js
├── package.json          # Metadados e dependências do projeto
├── postcss.config.mjs    # Configuração do PostCSS
├── README.md             # Este arquivo
└── tsconfig.json         # Configuração do TypeScript
```

## 🚀 Instalação e Uso
Pronto para começar? Siga estes simples passos:
1.  **Clone o repositório:**
    ```
    git clone https://github.com/KFalcao/my-library.git
    ```
2.  **Entre na pasta do projeto:**
    ```
    cd my-library
    ```
3.  **Instale as dependências:**
    ```
    npm install
    ```
4. **Configure a `shadcn/ui`:** Após a instalação das dependências, execute o comando abaixo e siga as instruções do terminal para configurar a biblioteca de componentes.
    ```
    npx shadcn-ui@latest init
    ```
5.  **Execute o projeto:**
    ```
    npm run dev
    ```
    
Acesse **`http://localhost:3000`** e comece a catalogar seus livros!
