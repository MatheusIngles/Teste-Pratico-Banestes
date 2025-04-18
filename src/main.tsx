import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Homepage from './app/routes/Homepage'
import Perfil from './app/routes/PerfilCliente'
import ErrorPage from './app/routes/ErrorPage';
import App from './app/App'

// Criação do roteador da aplicação utilizando `createBrowserRouter`.
// Define as rotas e seus respectivos componentes.

const router = createBrowserRouter([
  {
    // Rota raiz da aplicação
    path: "/",
    element: <App />, // Componente que será renderizado na rota raiz
    errorElement: <ErrorPage />, // Componente a ser renderizado em caso de erro de rota
    children: [
      {
        // Rota principal para a homepage
        index: true, // Define que esta é a rota inicial dentro do componente pai ("/")
        element: <Homepage /> // Componente Homepage será renderizado na rota "/"
      },
      {
        // Rota dinâmica para o Perfil do cliente, usando um parâmetro "id" na URL
        path: "Perfil/:id", // A URL será algo como "/Perfil/123"
        element: <Perfil /> // Componente Perfil será renderizado, e o parâmetro "id" estará disponível
      },
    ],
  },
], {
  // Configuração do `basename`, que define a base da URL da aplicação
  // Isso é útil para aplicações que não estão na raiz do domínio (por exemplo, em subpastas)
  basename: '/Teste-Pratico-Banestes/'
});

// Criação e renderização da aplicação no DOM usando `createRoot`.
// A aplicação será renderizada no elemento com o id 'root' da página HTML.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* O `RouterProvider` conecta o roteador à aplicação, permitindo navegação entre as rotas definidas */}
    <RouterProvider router={router} />
  </StrictMode>,
);

