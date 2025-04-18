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
    path: "/Teste-Pratico-Banestes/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "Perfil/:id", element: <Perfil />},
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
