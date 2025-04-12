import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import * as React from 'react'
import { Outlet } from 'react-router-dom';

export const AppContext = React.createContext<any>(null);

export default function App() {

    
    type Parametros = {
        Categoria: string
        Ativo: boolean
    }

    const [filtrador,setfiltrador] = React.useState<string>('Nome')
    const [ResultadoDoFiltrador,setResultadoDoFiltrador] = React.useState<string>('')
    const [Filtros, setFiltros] = React.useState<Array<Parametros>>([
        { Categoria: 'Endereco', Ativo: false },
        { Categoria: 'Renda Anual', Ativo: false },
        { Categoria: 'Patrimonio', Ativo: false },
        { Categoria: 'Estado Civil', Ativo: false },
        { Categoria: 'RG', Ativo: false },
        { Categoria: 'Nome Social', Ativo: false },
        { Categoria: 'Data Nascimento', Ativo: false }
      ]);
      

    return (
        <>
            <AppContext.Provider value={[filtrador,setfiltrador, ResultadoDoFiltrador,setResultadoDoFiltrador, Filtros, setFiltros]}>
                <Header />
                <Main>
                    <Outlet />
                </Main>
                <Footer />
            </AppContext.Provider>
        </>
    );
}