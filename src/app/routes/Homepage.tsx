import './Homepage.css'
import { useSearchParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

export default function Homepage(){
    const [searchParams, setSearchParams] = useSearchParams();

    type Filtro = {
        Categoria: string;
        Ativo: boolean;
    };

    const [filtrador,setfiltrador] = React.useState<string>('Nome')
    const [ResultadoDoFiltrador,setResultadoDoFiltrador] = React.useState<string>('')
    const [Filtros, setFiltros] = React.useState<Array<Filtro>>([
        { Categoria: 'Endereco', Ativo: false},
        { Categoria: 'Renda Anual', Ativo: false},
        { Categoria: 'Patrimonio', Ativo: false },
        { Categoria: 'Estado Civil', Ativo: false},
        { Categoria: 'RG', Ativo: false },
        { Categoria: 'Nome Social', Ativo: false },
        { Categoria: 'Data Nascimento', Ativo: false }
      ]);

    React.useEffect(()=>{

        const aplicarFiltro = () => {
            setSearchParams({
              filtrador: `${filtrador}`,
              ResultadoDoFiltrador: `${ResultadoDoFiltrador}`,
            });
          };

        aplicarFiltro()
    }, [Filtros, ResultadoDoFiltrador, filtrador])

    return(<>
            <div id="Pesquisador" className="d-flex justify-content-end align-items-center">
                <div id="boxConteiner" className='d-flex justify-content-center  align-items-center'>
                    <InputGroup className="mb-3 p-3">
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
            <div id="Organizador" className='d-flex justify-content-center align-items-center'>
                <div id="table" className='w-100 h-75'>
                    <Table responsive className='w-100 h-100'>
                        <thead>
                            <th>Cpf/Cnpj</th>
                            <th>Nome</th>
                            <th>email</th>
                            {Filtros.filter((f) => (f.Ativo)).map((f)=>{return <th>{`${f.Categoria}`}</th>})}
                        </thead>
                        
                    </Table>
                </div>
            </div>
            </>)
}