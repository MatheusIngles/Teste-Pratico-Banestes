import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Homepage from './app/routes/Homepage'
import Perfil from './app/routes/PerfilCliente'
import ErrorPage from './app/routes/ErrorPage';
import App from './app/App'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "Perfil/:id", element: <Perfil />},
    ],
  },
],{
  basename: '/Teste-Pratico-Banestes/'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
