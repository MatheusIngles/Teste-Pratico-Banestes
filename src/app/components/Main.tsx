import { ReactNode } from 'react'
import './Main.css'

// Componente Main é um layout wrapper que define a área principal da página.
// Ele recebe qualquer conteúdo via "children" e aplica estilos para ocupar 
// toda a largura e altura da tela, com fundo azul (#014689).
// A div interna "subMain" também ocupa toda a área disponível e serve para 
// conter o conteúdo renderizado dinamicamente.
export default function Main({children}: {children: ReactNode}){
    return(
        <main className='w-100 vh' id="Main" style={{backgroundColor: '#014689'}}>
            <div className='subMain w-100 h-100'>
                {children}
            </div>
        </main>
    )
}