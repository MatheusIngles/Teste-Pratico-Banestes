import './Homepage.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import { AppContext } from '../App';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Homepage(){
    const [filtrador, setfiltrador, ResultadoDoFiltrador,setResultadoDoFiltrador, Filtros, setFiltros] = React.useContext(AppContext);
    type Filtro = {
        Categoria: string;
        Ativo: boolean;
    };

    React.useEffect(()=>{
        // window.location.reload();
    }, [Filtros])

    return(<>
            <div id="Pesquisador" className="d-flex justify-content-end align-items-center">
                <div id="boxConteiner" className='d-flex justify-content-center  align-items-center'>
                    <InputGroup className="mb-3">
                        <DropdownButton
                        variant="outline-secondary"
                        title={`${filtrador}`}
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item onClick={()=>{setfiltrador('Nome')}}>Nome</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setfiltrador('Cpf')}}>Cpf</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setfiltrador('Cnpj')}}>Cnpj</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control aria-label="Digite aqui" value={`${ResultadoDoFiltrador}`} onChange={(palavra) => setResultadoDoFiltrador(palavra.target.value)}/>
                    </InputGroup>
                    <Form className='w-100 p-t text-center p-3'>
                        {Filtros.map((Categoria: Filtro, index: number)=> (
                           <Form.Check 
                           type="switch"
                           id="custom-switch"
                           label= {`${Categoria.Categoria}`}
                           checked={Categoria.Ativo}
                           onChange={()=>{
                                    const novosFiltros = [...Filtros];
                                    novosFiltros[index] = {
                                    ...novosFiltros[index],
                                    Ativo: !novosFiltros[index].Ativo,
                                    };
                                    setFiltros(novosFiltros);
                                }}
                         /> 
                        ))}
                    </Form>
                </div>
            </div>
            <div id="Organizador">

            </div>
            </>)
}