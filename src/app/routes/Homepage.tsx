import './Homepage.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import { AppContext } from '../App';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Homepage(){

    type Parametros = {
        Categoria: string
        Ativo: boolean
    }

    const Filtros: Array<Parametros> = [{Categoria:'Nome', Ativo:true},]
    const [filtrador, setfiltrador, ResultadoDoFiltrador,setResultadoDoFiltrador] = React.useContext(AppContext);

    return(<>
            <div id="Pesquisador" className="d-flex justify-content-end align-items-center">
                <div id="boxConteiner" className='d-flex justify-content-end  align-items-center'>
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
                </div>
            </div>
            <div id="Organizador">

            </div>
            </>)
}