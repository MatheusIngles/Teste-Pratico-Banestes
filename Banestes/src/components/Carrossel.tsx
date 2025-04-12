import Carousel from 'react-bootstrap/Carousel';
import BanestesLogo from '../assets/Logo_Estendida.jpg'
import './Carrossel.css'

export default function Carrossel(){
  const listaDeImagens: Array<string> = [BanestesLogo]  
  
  return (
        <Carousel className='Carrosel'>
          <Carousel.Item style={{ backgroundImage: `url(${listaDeImagens[0]})`}}>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ backgroundImage: `url(${listaDeImagens[0]})`}}>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ backgroundImage: `url(${listaDeImagens[0]})`}}>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

function ImagemDoCarrossel({imagem}: {imagem: string}){
    return(
        <img
        className="imagem"
        src={`${imagem}`}
        alt="Imagem do carrosel"
      />
    )
}