# 💻 Portfólio Web - Giovanna Santos

<p align="center">
  <img src="src/assets/img/developer.svg" alt="Ilustração Desenvolvedora" width="300"/>
</p>

<p align="center">
  <b>Aplicação web responsiva desenvolvida para apresentar minha trajetória, habilidades e projetos como Desenvolvedora Front-end.</b>
</p>


<p align="center">
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-como-executar-o-projeto">Como Executar</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 🚀 Sobre o Projeto

Este projeto é meu portfólio pessoal, construído do zero focado em performance, acessibilidade e boa experiência do usuário (UX). Conta com um design moderno em **Dark/Light Mode**, animações em Canvas, navegação fluida com scroll suave e envio de mensagens via integração direta com serviço de e-mail.

---

## 🌐 Demonstração Online

O site está publicado e pode ser acessado em produção no seguinte endereço:

👉 **[https://giovanna-santos.vercel.app/](https://giovanna-santos.vercel.app/)**

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e ferramentas:

- **Framework Front-end:** [Vue.js 3](https://vuejs.org/) (Composition API com TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Roteamento:** [Vue Router 4](https://router.vuejs.org/)
- **Estilização:** Sass / CSS Scoped com Variáveis CSS
- **Envio de E-mail:** [EmailJS](https://www.emailjs.com/)
- **Ícones & UI:** Font Awesome & Componentes Customizados

---

## ✨ Funcionalidades

- 🌓 **Tema Claro/Escuro (Dark/Light Mode):** Alternância de tema com persistência no `localStorage`.
- 🎨 **Efeitos Visuais Dinâmicos:** Background animado com efeito Matrix/Circuito em `<canvas>`.
- 🧭 **Navegação Inteligente:**
  - Scroll suave ao clicar nos itens do menu.
  - Destaque automático da aba do menu conforme a rolagem (*IntersectionObserver*).
  - Botão de navegação "Voltar ao topo".
- 📱 **Totalmente Responsivo:** Adaptação completa para dispositivos móveis (Mobile Drawer) e desktops.
- ✉️ **Formulário de Contato:** Validação de campos e envio de mensagens com feedback visual via *Toast Notification*.

---

## 📁 Estrutura do Projeto

```text
src/
├── assets/          # Imagens, vetores e estilos globais (Sass)
├── components/      # Componentes reutilizáveis (Header, Toast, Botões)
├── composables/     # Lógicas compartilhadas (useNavigation, etc.)
├── router/          # Configuração de rotas (Vue Router)
├── utils/           # Funções utilitárias e composables auxiliares
├── views/           # Páginas principais da aplicação (Home, NotFound, etc.)
├── App.vue          # Componente raiz
└── main.ts          # Arquivo de inicialização da aplicação
```

---

## 🔧 Como Executar o Projeto

**Pré-requisitos**
Antes de começar, você precisará ter instalado em sua máquina:
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes npm ou pnpm

**Passo a passo**

1. Clone este repositório
```text
git clone https://github.com/giosantos99/portfolio.git
```

2. Acesse a pasta do projeto:

cd portfolio

3. Instale as dependências:

npm install

4. Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto baseado no .env.example:

```text
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

5. Inicie o servidor de desenvolvimento:

npm run dev

Acesse a aplicação no seu navegador através do endereço exibido no terminal (geralmente http://localhost:5173).


---

## 📬 Contato

Gostou do projeto ou quer trocar uma ideia? Entre em contato comigo:

* LinkedIn: https://www.linkedin.com/in/giovanna-santos-90a6381a4/
* E-mail: giovanna.santos.souza99@gmail.com
