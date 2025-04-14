import './Homepage.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import * as React from 'react';
import Papa from 'papaparse';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

export default function Homepage(){
    const n = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = React.useState<number>(1);
    const [dados, setdados] = React.useState<Array<Record<string, string>>| undefined>(undefined)    
    const [filtrador,setfiltrador] = React.useState<string>('Nome')
    const [ResultadoDoFiltrador,setResultadoDoFiltrador] = React.useState<string>('')
    const [Filtros, setFiltros] = React.useState<Array<Filtro>>([
        { Categoria: 'Endereço', Ativo: false, referencia: 'endereco'},
        { Categoria: 'Renda Anual', Ativo: false, referencia: 'rendaAnual'},
        { Categoria: 'Patrimonio', Ativo: false, referencia: 'patrimonio' },
        { Categoria: 'Estado Civil', Ativo: false, referencia: 'estadoCivil' },
        { Categoria: 'RG', Ativo: false, referencia: 'rg' },
        { Categoria: 'Nome Social', Ativo: false, referencia: 'nomeSocial' },
        { Categoria: 'Data Nascimento', Ativo: false, referencia: 'dataNascimento' },
        { Categoria: 'Codigo da Agencia', Ativo: false, referencia: 'codigoAgencia' },
      ]);

    type Filtro = {
        Categoria: string;
        Ativo: boolean;
        referencia: string;
    };

    React.useEffect(() => {
        const buscarCSV = async () => {
            try{
                const response = await fetch(`/data/Clientes.csv?t=${Date.now()}`);
                if (!response.ok) throw new Error("Erro na requisição");
                const texto = await response.text();
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true,
                });
                setdados(parsed.data as Record<string, string>[]);
            } catch(error){
                throw Error
            }
        };
        buscarCSV();
     //   const intervalo = setInterval(buscarCSV, 5000); 
     //   return () => clearInterval(intervalo);
    }, []);
    
    React.useEffect(()=>{

        const aplicarFiltro = () => {
            setSearchParams({
              filtrador: `${filtrador}`,
              ResultadoDoFiltrador: `${ResultadoDoFiltrador}`,
              paginas: `${pages}`
            });
          };

        aplicarFiltro()
    }, [Filtros, ResultadoDoFiltrador, filtrador, pages])

    React.useEffect(() => {
        console.log(dados); // Agora será chamado quando `dados` for atualizado
    }, [dados]);

    const RestornarTabela = () => {
        if(dados == undefined){
            return null
        }
        const TodosOsFiltros: Array<Filtro> = [
            { Categoria: 'Cpf/Cnpj', Ativo: true, referencia: 'cpfCnpj' },
            { Categoria: 'Nome', Ativo: true, referencia: 'nome' },
            { Categoria: 'email', Ativo: true, referencia: 'email' },
            ...Filtros
          ];
        if (ResultadoDoFiltrador !== '') {
            switch (filtrador) {
                case 'Nome':
                    return(
                    dados.filter((item) => item.nome.toLowerCase().includes(ResultadoDoFiltrador.toLowerCase()))).slice((pages -1) * 10,((pages -1) * 10) + 10).map((dado) => {
                        return(
                        <tr onClick={() => n(`/Perfil/${dado.id}`)} key={dado.id}>
                            {TodosOsFiltros.filter((f) => (f.Ativo)).map((f)=>{return <td className='p-3' key={`${dado.id}+${f.referencia}`}>{`${dado[f.referencia]}`}</td>})}
                        </tr>
                    )})
                case 'Cpf/Cnpj':
                    return(
                        dados.filter((item) => item.cpfCnpj.toLowerCase().includes(ResultadoDoFiltrador.toLowerCase()))).slice((pages -1) * 10,((pages -1) * 10) + 10).map((dado) => {
                            return(
                            <tr onClick={() => n(`/Perfil/${dado.id}`)} key={dado.id}>
                                {TodosOsFiltros.filter((f) => (f.Ativo)).map((f)=>{return <td className='p-3' key={`${dado.id}+${f.referencia}`}>{`${dado[f.referencia]}`}</td>})}
                            </tr>
                        )})
            }
        } else {
            return(
                dados.slice((pages -1) * 10,((pages -1) * 10) + 10).map((dado) => {return(
                    <tr onClick={() => n(`/Perfil/${dado.id}`)} key={dado.id}>
                        {TodosOsFiltros.filter((f) => (f.Ativo)).map((f)=>{return <td className='p-3' key={`${dado.id}+${f.referencia}`}>{`${dado[f.referencia]}`}</td>})}
                    </tr>
                )})
        )}
    }

    return(<>
            <div id="Pesquisador" className="d-flex justify-content-between align-items-center">
                <div id="boxConteiner" className='d-flex justify-content-center  align-items-center'>
                    <InputGroup className="mb-3 p-3">
                        <DropdownButton
                        variant="outline-secondary"
                        title={`${filtrador}`}
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item onClick={()=>{setfiltrador('Nome')}}>Nome</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setfiltrador('Cpf/Cnpj')}}>Cpf/Cnpj</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control aria-label="Digite aqui" value={`${ResultadoDoFiltrador}`} onChange={(palavra) => setResultadoDoFiltrador(palavra.target.value)}/>
                    </InputGroup>
                </div>
                <div id="dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Adicionar Mais Coisa
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Form id='filtros' className='w-100 p-t text-center p-3'>
                            {Filtros.map((Categoria: Filtro, index: number)=> (
                            <Dropdown.Item onClick={()=>{
                                const novosFiltros = [...Filtros];
                                novosFiltros[index] = {
                                    ...novosFiltros[index],
                                    Ativo: !novosFiltros[index].Ativo,
                                };
                                setFiltros(novosFiltros);
                            }}>
                                <Form.Check 
                                type="switch"
                                id={`custom-switch${index}`}
                                key={index}
                                label= {`${Categoria.Categoria}`}
                                checked={Categoria.Ativo}
                                /> 
                            </Dropdown.Item>
                            ))}
                        </Form>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div id="Organizador" className='d-flex flex-column justify-content-center align-items-center'>
                <div id="table" className='h-75 m-5'>
                    <Table responsive className='w-100 h-100'>
                        <thead>
                            <tr>
                                <th>Cpf/Cnpj</th>
                                <th>Nome</th>
                                <th>Email</th>
                                {Filtros.filter((f) => (f.Ativo)).map((f)=>{return <th key={f.Categoria}>{`${f.Categoria}`}</th>})}
                            </tr>
                        </thead>
                        <tbody>
                            <RestornarTabela/>
                        </tbody>
                    </Table>
                </div>
                <div id="pagination" className='d-flex justify-content-end w-100 h-25'>
                    <Pagination className='p-3'>
                    <Pagination.First onClick={() => setPages(1)}/>
                    <Pagination.Prev onClick={() => {if (dados !== undefined){if(pages > Math.ceil(dados.length / 10)){setPages(pages - 1)}}}}/>
                        { dados !== undefined &&
                        Array.from({ length: Math.ceil(dados.length / 10 ) }).map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === pages} onClick={() => setPages(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))
                        }
                    <Pagination.Next onClick={() => {if (dados !== undefined){if(pages < Math.ceil(dados.length / 10)){setPages(pages + 1)}}} }/>
                    <Pagination.Last onClick={() => {if (dados !== undefined) {setPages(Math.ceil(dados.length / 10))}}}/>
                    </Pagination>
                </div>
            </div>
            </>)
}