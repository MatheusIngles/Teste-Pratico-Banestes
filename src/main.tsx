import * as React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import Homepage from './app/routes/Homepage'
import Papa from 'papaparse';
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
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
