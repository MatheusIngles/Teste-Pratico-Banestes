import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import * as React from 'react'
import { Outlet } from 'react-router-dom';

export const AppContext = React.createContext<any>(null);

export default function App() {
    const [filtrador,setfiltrador] = React.useState<string>('Nome')
    const [ResultadoDoFiltrador,setResultadoDoFiltrador] = React.useState<string>('')


    return (
        <>
            <AppContext.Provider value={[filtrador,setfiltrador, ResultadoDoFiltrador,setResultadoDoFiltrador]}>
                <Header />
                <Main>
                    <Outlet />
                </Main>
                <Footer />
            </AppContext.Provider>
        </>
    );
}