import { useState, useEffect } from 'react'; 
import './Header.css'


// Componente Header para exibir o cabeçalho da página
export default function Header() {
  // Hook de estado para armazenar a largura atual da janela
  const [mx, setmx] = useState<number>(window.innerWidth);

  // Hook de efeito para atualizar a largura da janela ao redimensionar
  useEffect(() => {
    // Função que atualiza o estado com a nova largura da janela
    const handleResize = () => {
      setmx(window.innerWidth);
    };

    // Adiciona o listener de redimensionamento
    window.addEventListener('resize', handleResize);

    // Atualiza a largura da janela ao montar o componente
    handleResize();

    // Limpa o listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Dependência vazia indica que o efeito só roda uma vez, ao montar o componente

  return (
    <header className='d-block position-relative w-100'>
      {/* Exibe o logo estendido se a largura da janela for maior que 400px */}
      {mx > 400 && 
        <div className='imagem mx-auto d-block' style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}/assets/Logo_Estendida.jpg)`, 
          backgroundSize: 'contain', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'
        }}>
        </div>
      }

      {/* Exibe o logo pequeno se a largura da janela for 400px ou menor */}
      {mx <= 400 && 
        <div className='imagem mx-auto d-block' style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}/assets/Logo_Pequena.png)`, 
          backgroundSize: 'contain', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'
        }}>
        </div>
      }

      {/* Exibe a frase "Crescemos Juntos" na parte inferior do cabeçalho */}
      <div className='position-absolute w-100 bottom-0 justify-content-center d-flex text-light text'>
        <h3>Crescemos Juntos</h3>
      </div>
    </header>
  );
}

