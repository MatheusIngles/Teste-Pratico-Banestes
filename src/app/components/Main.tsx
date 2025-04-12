import { ReactNode } from 'react'
import './Main.css'

export default function Main({children}: {children: ReactNode}){
    return(
        <main className='w-100 vh' id="Main" style={{backgroundColor: '#014689'}}>
            <div className='subMain w-100 h-100'>
                {children}
            </div>
        </main>
    )
}