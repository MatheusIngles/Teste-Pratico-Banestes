import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom';

export default function App() {
    // Componente principal que define a estrutura da aplicação.

    return (
        <>
            {/* Cabeçalho da aplicação. Pode conter elementos como logo, barra de navegação, etc. */}
            <Header />

            {/* Corpo principal da aplicação. O componente `Main` envolve a área principal do conteúdo. */}
            <Main>
                {/* O `Outlet` é usado para renderizar os componentes de rota filhos que são definidos no roteamento */}
                <Outlet />
            </Main>

            {/* Rodapé da aplicação. Pode conter informações como direitos autorais, links para políticas, etc. */}
            <Footer />
        </>
    );
}
