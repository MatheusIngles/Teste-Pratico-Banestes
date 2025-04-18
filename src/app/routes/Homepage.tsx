import './Homepage.css'
import { useNavigate, useSearchParams } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'


// Componente Homepage renderiza uma página que exibe uma tabela de clientes
// com base em um filtro de pesquisa e paginação. Também permite a adição
// de filtros personalizados para exibição dos dados.

export default function Homepage() {

    // Definição do tipo Cliente, com campos como id, nome, cpfCnpj, etc.
    type Cliente = {
        id: string;
        cpfCnpj: string;
        rg?: string;
        dataNascimento: Date;
        nome: string;
        nomeSocial?: string;
        email: string;
        endereco: string;
        rendaAnual: number;
        patrimonio: number;
        estadoCivil: string;
        codigoAgencia: number;
    }

    // Hooks de estado para navegação, parâmetros de busca, dados e filtros
    const n = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState<number>(1);
    const [dados, setdados] = useState<Array<Cliente>>([]);
    const [filtrador, setfiltrador] = useState<string>('Nome');
    const [dadosFiltrados, setdadosFiltrados] = useState<Array<Cliente>>([]);
    const [ResultadoDoFiltrador, setResultadoDoFiltrador] = useState<string>('');
    const [Filtros, setFiltros] = useState<Array<Filtro>>([ // Filtros disponíveis
        { Categoria: 'Endereço', Ativo: false, referencia: 'endereco' },
        { Categoria: 'Renda Anual', Ativo: false, referencia: 'rendaAnual' },
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
    }

    // useEffect para buscar o arquivo CSV e atualizar os dados a cada 5 segundos
    useEffect(() => {
        const buscarCSV = async () => {
            try {
                const response = await fetch(`./data/Clientes.csv?t=${Date.now()}`);
                if (!response.ok) throw new Error("Erro na requisição");
                const texto = await response.text();
                const parsed = Papa.parse(texto, { header: true, skipEmptyLines: true });
                if (dados !== parsed.data) {
                    setdados(parsed.data as Cliente[]);
                }
            } catch (error) {
                throw Error;
            }
        };
        buscarCSV();
        const interval = setInterval(buscarCSV, 5000);
        return () => clearInterval(interval); // Limpa o intervalo após o componente ser desmontado
    }, []);

    // useEffect para atualizar parâmetros de pesquisa com base na URL
    useEffect(() => {
        const filtrador = searchParams.get('filtrador');
        const ResultadoDoFiltrador = searchParams.get('ResultadoDoFiltrador');
        const paginas = searchParams.get('paginas');
        if (filtrador !== null) setfiltrador(filtrador);
        if (ResultadoDoFiltrador !== null) setResultadoDoFiltrador(ResultadoDoFiltrador);
        if (paginas !== null) setPages(parseInt(paginas));
    }, [searchParams]);

    // useEffect para aplicar os filtros e atualizar os parâmetros de busca na URL
    useEffect(() => {
        const aplicarFiltro = () => {
            setSearchParams({
                filtrador: `${filtrador}`,
                ResultadoDoFiltrador: `${ResultadoDoFiltrador}`,
                paginas: `${pages}`
            });
        };

        aplicarFiltro();
    }, [Filtros, ResultadoDoFiltrador, filtrador, pages]);

    // useEffect para aplicar o filtro de pesquisa baseado no "filtrador" selecionado
    useEffect(() => {
        if (ResultadoDoFiltrador !== '') {
            switch (filtrador) {
                case 'Nome':
                    setdadosFiltrados(dados.filter((item) => item.nome.toLowerCase().includes(ResultadoDoFiltrador.toLowerCase())));
                    setPages(1);
                    break;
                case 'Cpf/Cnpj':
                    setdadosFiltrados(dados.filter((item) => item.cpfCnpj.toLowerCase().includes(ResultadoDoFiltrador.toLowerCase())));
                    setPages(1);
                    break;
            }
        } else {
            setdadosFiltrados(dados); // Sem filtro, exibe todos os dados
        }
    }, [ResultadoDoFiltrador, dados]);

    // Função para renderizar a tabela com dados filtrados e paginados
    const RestornarTabela = () => {
        if (dados == undefined) {
            return null;
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
                    return dadosFiltrados.slice((pages - 1) * 10, ((pages - 1) * 10) + 10).map((dado) => {
                        return (
                            <tr className='tr' onClick={() => n(`./Perfil/${dado.id}`)} key={dado.id}>
                                {TodosOsFiltros.filter((f) => (f.Ativo)).map((f) => {
                                    return <td className='p-3' key={`${dado.id}+${f.referencia}`}>{`${dado[f.referencia as keyof Cliente]}`}</td>;
                                })}
                            </tr>
                        );
                    });
                case 'Cpf/Cnpj':
                    return dadosFiltrados.slice((pages - 1) * 10, ((pages - 1) * 10) + 10).map((dado) => {
                        return (
                            <tr className='tr' onClick={() => n(`./Perfil/${dado.id}`)} key={dado.id}>
                                {TodosOsFiltros.filter((f) => (f.Ativo)).map((f) => {
                                    return <td className='p-3' key={`${dado.id}+${f.referencia}`}>{`${dado[f.referencia as keyof Cliente]}`}</td>;
                                })}
                            </tr>
                        );
                    });
            }
        } else {
            return dadosFiltrados.slice((pages - 1) * 10, ((pages - 1) * 10) + 10).map((dado) => {
                return (
                    <tr className='tr' onClick={() => n(`./Perfil/${dado.id}`)} key={dado.id}>
                        {TodosOsFiltros.filter((f) => (f.Ativo)).map((f) => {
                            return <td className='p-3' key={`${dado.id}+${f.referencia}`}>{`${dado[f.referencia as keyof Cliente]}`}</td>;
                        })}
                    </tr>
                );
            });
        }
    }

    // Retorno da interface de pesquisa e tabela de resultados
    return (
        <>
            {/* Pesquisador */}
            <div id="Pesquisador" className="d-flex justify-content-center align-items-center">
                {/* Campo de pesquisa */}
                <div className='search d-flex justify-content-between h-100'>
                    <div id="boxConteiner" className='d-flex justify-content-center align-items-center'>
                        <InputGroup className="mb-3 p-3">
                            <DropdownButton
                                variant="outline-secondary"
                                title={`${filtrador}`}
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item onClick={() => { setfiltrador('Nome') }}>Nome</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setfiltrador('Cpf/Cnpj') }}>Cpf/Cnpj</Dropdown.Item>
                            </DropdownButton>
                            <Form.Control
                                aria-label="Digite aqui"
                                value={`${ResultadoDoFiltrador}`}
                                onChange={(palavra) => setResultadoDoFiltrador(palavra.target.value)}
                            />
                        </InputGroup>
                    </div>
                    {/* Filtros adicionais */}
                    <div id="dropdown" className='d-flex justify-content-center align-items-center'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Adicionar Mais Coisa
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Form id='filtros' className='w-100 p-t text-center p-3'>
                                    {Filtros.map((Categoria: Filtro, index: number) => (
                                        <Dropdown.Item
                                            onClick={() => {
                                                const novosFiltros = [...Filtros];
                                                novosFiltros[index] = {
                                                    ...novosFiltros[index],
                                                    Ativo: !novosFiltros[index].Ativo,
                                                };
                                                setFiltros(novosFiltros);
                                            }}
                                        >
                                            <Form.Check
                                                type="switch"
                                                id={`custom-switch${index}`}
                                                key={index}
                                                label={`${Categoria.Categoria}`}
                                                checked={Categoria.Ativo}
                                            />
                                        </Dropdown.Item>
                                    ))}
                                </Form>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div id="Organizador" className='d-flex flex-column justify-content-center align-items-center'>
                    {/* Contêiner para a tabela */}
                    <div id="table" className='h-75 m-5'>
                        <Table responsive className='w-100 h-100'>
                        <thead>
                            {/* Cabeçalho da tabela com as colunas fixas */}
                            <tr>
                            <th>Cpf/Cnpj</th>
                            <th>Nome</th>
                            <th>Email</th>
                            {/* Renderiza as colunas adicionais baseadas no estado Filtros */}
                            {Filtros.filter((f) => f.Ativo).map((f) => (
                                <th key={f.Categoria}>{f.Categoria}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody id="corpoTabela">
                            {/* Chama a função para renderizar os dados da tabela */}
                            <RestornarTabela/>
                        </tbody>
                        </Table>
                    </div>

                    {/* Contêiner para a paginação */}
                    <div id="pagination" className='d-flex justify-content-end w-100 h-25'>
                        <Pagination className='p-3'>
                        {/* Botões de navegação para a paginação */}
                        <Pagination.First onClick={() => setPages(1)}/>
                        <Pagination.Prev 
                            onClick={() => {
                            if (dadosFiltrados !== undefined) {
                                if (pages > Math.ceil(dadosFiltrados.length / 10)) {
                                setPages(pages - 1);
                                }
                            }
                            }}
                        />
                        {/* Renderiza as páginas disponíveis */}
                        {dadosFiltrados !== undefined &&
                            Array.from({ length: Math.ceil(dadosFiltrados.length / 10 ) }).map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === pages} onClick={() => setPages(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                            ))
                        }
                        <Pagination.Next 
                            onClick={() => {
                            if (dadosFiltrados !== undefined) {
                                if (pages < Math.ceil(dadosFiltrados.length / 10)) {
                                setPages(pages + 1);
                                }
                            }
                            }}
                        />
                        <Pagination.Last 
                            onClick={() => {
                            if (dadosFiltrados !== undefined) {
                                setPages(Math.ceil(dadosFiltrados.length / 10));
                            }
                            }}
                        />
                        </Pagination>
                    </div>
                </div>
            </>)
}