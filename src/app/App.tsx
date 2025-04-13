import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import * as React from 'react'
import { Outlet } from 'react-router-dom';


export default function App() {
    
    return (
        <>
                <Header />
                <Main>
                    <Outlet />
                </Main>
                <Footer />
        </>
    );
}