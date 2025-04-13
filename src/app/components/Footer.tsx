import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Footer.css'

export default function Footer() {
    const[maxw,setmaxw] = useState<number>(window.innerWidth)

    type ObjectLink = {
        link: string
        Nome: string
    }

    const Tecnologias: Array<ObjectLink> = [{link:"https://getbootstrap.com/",Nome:"Bootstrap"},{link:"https://react.dev/", Nome:"React"},{link:"https://www.typescriptlang.org/",Nome:"TypeScript"}]
    const SobreOBanestes: Array<ObjectLink> = [{link:"https://www.banestes.com.br/institucional/index_companhia.html",Nome:"A Companhia"},
                                                {link:"https://www.banestes.com.br/publicacoes_legais/index.html", Nome:"Editais"},
                                                {link:"https://www.banestes.com.br/seguranca/index_seguranca.htm",Nome:"Sua Segurança"},
                                                {link:"https://www.banestes.com.br/institucional/responsabilidade.html",Nome:"Responsabilidade Social"}]
    const Atendimento: Array<ObjectLink> = [{link:"https://www.banestes.com.br/#:~:text=Atendimento-,Rede%20de%20Ag%C3%AAncias,-SAC%20e%20Telefones",Nome:"Rede de Agências"},
                                                    {link:"https://www.banestes.com.br/atendimento/index_telefones.htm", Nome:"SAC e Telefones"},
                                                    {link:"https://wwws.banestes.com.br/formularios_consultas/atendimento/index_faleconosco.htm",Nome:"Fale Conosco"}]
    

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


      const ListaDeCoisas = ({ lista }: {lista: Array<ObjectLink>}) => {
        try {
            return (
                <>
                    {lista.map((link, index) => (
                        <li key={index} className="nav-item mb-2">
                            <a href={link.link}  className="nav-link p-0 text-body-secondary">
                                {link.Nome}
                            </a>
                        </li>
                    ))}
                </>
            );
        } catch (error) {
            console.error(error);
            return null;
        }
       };
    

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
            <div className="container">
                <div className="py-5">
                    <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Sobre</h5>
                        <ul className="nav flex-column">
                        <ListaDeCoisas lista={SobreOBanestes}/>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Tecnologias</h5>
                        <ul className="nav flex-column">
                        <ListaDeCoisas lista={Tecnologias}/>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Contato</h5>
                        <ul className="nav flex-column">
                        <ListaDeCoisas lista={Atendimento}/>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                        <h5>Nos mande sua opinião!</h5>
                        <p>Sua opinião tambem é relevante!</p>
                        <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label htmlFor="newsletter1" className="visually-hidden">Digite Aqui!</label>
                            <input id="newsletter1" type="text" className="form-control" placeholder="Digite Aqui!"/>
                            <button className="btn btn-primary" type="button">Enviar</button>
                        </div>
                        </form>
                    </div>
                    </div>

                    <div className="d-flex d flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; Banestes 2019 e Matheus Endlich Silveira . Todos os direitos reservados.</p>
                    <ul className="list-unstyled d-flex">
                    <li className="ms-3"><a className="link-body-emphasis" href="https://www.youtube.com/BanestesTV"><i className="bi bi-youtube"/></a></li>
                    <li className="ms-3"><a className="link-body-emphasis" href="https://www.instagram.com/banestes_sa/"><i className="bi bi-instagram"/></a></li>
                    <li className="ms-3"><a className="link-body-emphasis" href="https://www.linkedin.com/company/banestesoficial/"><i className="bi bi-linkedin"/></a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}