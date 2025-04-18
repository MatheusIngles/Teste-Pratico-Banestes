# Teste Prático - Banestes

Este projeto foi desenvolvido como parte de um desafio técnico para o processo seletivo do Banestes. A proposta envolve o desenvolvimento de uma aplicação web utilizando **Vite**, **React** e **TypeScript** com foco em boas práticas de desenvolvimento, desempenho e usabilidade.

---

## 🛠️ Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap](https://getbootstrap.com/)
- Fetch API para leitura de dados via HTTP
- (Opcional) Bibliotecas auxiliares como `papaparse`, entre outras

---

## 🧱 Requisitos do Projeto

A aplicação deve consumir dados de uma planilha e permitir:

- Listar todos os clientes com filtros por nome e CPF/CNPJ
- Paginar a lista (máximo de 10 clientes por página)
- Visualizar detalhes de um cliente, incluindo:
  - Contas bancárias
  - Informações da agência correspondente

---

## 📄 Github Pages
Caso queira testar apenas acesse o github pages do projeto:
[Aqui]()

## 🔧 Preparação do Ambiente (Caso queira rodar)

1. **Pré-requisitos**:  
   - Node.js instalado
   - Git instalado

2. **Criação do Projeto**:  
   Utilize o Vite para criar o projeto com o template **React + TypeScript**:
   ```bash
   npm create vite@latest
   ```

3. **Clonagem e Execução**:
   ```bash
   git clone https://github.com/MatheusIngles/Teste-Pratico-Banestes.git
   cd Teste-Pratico-Banestes
   npm install
   npm run dev
   ```

---

## 🗂️ Estrutura do Projeto

Abaixo está a explicação da função de cada pasta e arquivo relevante no projeto:

### 📁 `dist/`
Para poder renderizar de forma rapida no github pages

### 📁 `public/`
Arquivos públicos que podem ser acessados diretamente pelo navegador. Inclui:

- `assets/`: Imagens da logo da aplicação.
- `data/`: Arquivos CSV com os dados das agências, clientes e contas.

### 📁 `src/`
Código-fonte principal da aplicação.

#### 📁 `app/`
Organização do código em duas subpastas:

- **`components/`**: Componentes reutilizáveis da interface, como cabeçalho (`Header`), rodapé (`Footer`) e o conteúdo principal (`Main`).

- **`routes/`**: Páginas da aplicação:
  - `Homepage.tsx`: Tela inicial com listagem de clientes.
  - `PerfilCliente.tsx`: Página com os detalhes de um cliente.
  - `ErrorPage.tsx`: Página de erro para rotas inválidas.

#### 📄 `App.tsx`
Componente raiz da aplicação, layout global é definido.

#### 📄 `index.tsx`
Ponto de entrada da aplicação. Renderiza o `App.tsx` dentro da `div#root` do `index.html`.

#### 📄 `main.tsx`
Inicialização da aplicação e define as rotas do projeto.

## ✅ Requisitos Funcionais

- [x] Listagem de clientes com filtros e paginação
- [x] Visualização detalhada de um cliente
- [x] Visualização das contas e agência do cliente
- [x] Layout limpo, responsivo e acessível
- [x] Código limpo e bem comentado
- [x] Uso eficaz do TypeScript
- [x] Boa performance e usabilidade geral

---
