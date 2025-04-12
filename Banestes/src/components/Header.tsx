import { useState, useEffect } from 'react'; 
import './Header.css'

export default function Header(){
  
  const [mx,setmx] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setmx(window.innerWidth);
    };

    window.addEventListener('resize', handleResize); 
    handleResize(); 
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
       <header className='d-block position-relative w-100'>
        {mx > 500  && <div className='imagem mx-auto d-block' style={{backgroundImage: `url(/assets/Logo_Estendida.jpg)`,  backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        </div>}
        {mx < 500  && <div className='imagem mx-auto d-block' style={{backgroundImage: `url(/assets/Logo_Pequena.png)`,  backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        </div>}
        <div className='position-absolute w-100 bottom-0 justify-content-center d-flex text-light text'>
          <h3>Crescemos Juntos</h3>
        </div>
       </header>
      );
}
