import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Footer.css'

export default function Footer() {
    const[maxw,setmaxw] = useState(window.innerWidth)

    type ObjectLink = {
        link: string
        Nome: string
    }

    const Links: Array<ObjectLink> = [{link:"https://getbootstrap.com/",Nome:"Bootstrap"},{link:"https://react.dev/", Nome:"React"},{link:"https://www.typescriptlang.org/",Nome:"TypeScript"}]

    useEffect(() => {
        const handleResize = () => {
            setmaxw(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize); 
        handleResize(); 
        return () => {
          window.removeEventListener('resize', handleResize); 
        };
      }, []);

    return (
    <footer className='w-100'>
        <div id='divlist'>
        { maxw <= 550 &&
        <ListGroup>
            <ListGroup.Item>
                <p>
                    Central De Atendimento
                </p>
                <p className="blockquote-footer">0800 645 2030</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <p>
                    Ouvidoria
                </p>
                <p className="blockquote-footer">0800 727 0030</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <p>
                Sac Banestes
                </p>
                <p className="blockquote-footer">0800 727 0474</p>
            </ListGroup.Item>
            <ListGroup.Item id='UltimoItem'>
                <p>
                Acessibilidade
                </p>
                <p className="blockquote-footer">0800 282 3030</p>
            </ListGroup.Item>
        </ListGroup>}
        { maxw > 550 &&
        <ListGroup className='ListGrop' horizontal>
             <ListGroup.Item id='PrimeiroItem'>
                <p>
                    Central De Atendimento
                </p>
                <p className="blockquote-footer">0800 645 2030</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <p>
                    Ouvidoria
                </p>
                <p className="blockquote-footer">0800 727 0030</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <p>
                Sac Banestes
                </p>
                <p className="blockquote-footer">0800 727 0474</p>
            </ListGroup.Item>
            <ListGroup.Item id='UltimoItem'>
                <p>
                Acessibilidade
                </p>
                <p className="blockquote-footer">0800 282 3030</p>
            </ListGroup.Item>
        </ListGroup>
        }
        </div>
        <div id='Fim' className='w-100'>
            <div id='Sobre' className='d-flex justify-content-center align-items-center flex-column text-center'>
                <h5 className='d-flex '>Sobre o Banestes:</h5>
                <p> O banco capixaba que cresce com você. Seguro, moderno e feito pra quem confia!</p>
            </div>
            <div id='Tecnologias' className=''>
                <a href="http://"></a>
                <a href="http://"></a>
                <a href="http://"></a>
                <a href="http://"></a>
            </div>
            <div id='Links Uteis' className=''>
                <a href="http://"></a>
                <a href="http://"></a>
                <a href="http://"></a>
                <a href="http://"></a>
            </div>
            <div id='Links Uteis' className=''>
                <a href="http://"></a>
                <a href="http://"></a>
                <a href="http://"></a>
                <a href="http://"></a>
            </div>
        </div>
        <div id="Copyright" className='w-100 text-center d-flex justify-content-center align-items-center'>
            <p className='text-white font-weight-bold'>@ Banestes 2025 e Matheus Endlich Silveira. Todos os direitos reservados. </p>
        </div>
    </footer>
  );
}