import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Card, Tab, Nav, Table, Button } from 'react-bootstrap';
import Papa from 'papaparse'
import './PerfilCliente.css'

export default function Perfil() {

    // Definição do tipo Conta, que representa informações bancárias do cliente
    type Conta = {
        id: string
        cpfCnpjCliente: string
        tipo: string
        saldo: number
        limiteCredito: number
        creditoDisponivel: number
    }

    // Definição do tipo Agencia, que representa uma agência bancária
    type Agencia = {
        id: string
        codigo: number
        nome: string
        endereco: string
    }

    // Definição do tipo Cliente, que representa os dados pessoais de um cliente
    type Cliente = {
        id: string
        cpfCnpj: string
        rg?: string
        dataNascimento: Date
        nome: string
        nomeSocial?: string
        email: string
        endereco: string
        rendaAnual: number
        patrimonio: number
        estadoCivil: string
        codigoAgencia: number
    }

    // Obtém o id do cliente da URL
    const { id } = useParams<{ id: string}>()
    // Função para navegação entre páginas
    const n = useNavigate()
    // Estado que mantém os dados dos clientes
    const [dados, setdados] = useState<Array<Cliente>>([])
    // Estado que mantém o cliente atual
    const [cliente, setcliente] = useState<Cliente>()
    // Estado que controla a aba ativa na interface (contas ou agência)
    const [abaAtiva, setAbaAtiva] = useState("contas")
    // Estado que mantém as agências
    const [agencias, setAgencias] = useState<Array<Agencia>>([])
    // Estado que mantém a agência vinculada ao cliente
    const [AgenciaCliente, setAgenciaCliente] = useState<Agencia>();
    // Estado que mantém as contas bancárias
    const [contas, setContas] = useState<Array<Conta>>([])
    // Estado que indica se o CSV foi carregado
    const [leu, setleu] = useState<boolean>(false)
    // Estado que mantém as contas vinculadas ao cliente
    const [contasCliente, setContasCliente] = useState<Array<Conta>>([]);

    // Efeito colateral para buscar os dados do arquivo CSV de Clientes
    useEffect(() => {
        const buscarCSV = async () => {
            try {
                // Requisição para buscar os dados do CSV de clientes
                const response = await fetch(`${import.meta.env.BASE_URL}/data/Clientes.csv?t=${Date.now()}`)
                if (!response.ok) 
                    throw new Error("Erro na requisição")
                // Parse do CSV
                const texto = await response.text()
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true,
                })
                    setdados(parsed.data as Cliente[])  // Armazena os dados no estado
                    setleu(true)  // Marca que os dados foram carregados
            } catch (error) {
                throw Error  // Lida com erro de requisição
            }
        }
        buscarCSV()
        // Recarrega os dados a cada 5 segundos
        const interval = setInterval(buscarCSV, 5000)
        return () => clearInterval(interval)  // Limpa o intervalo ao desmontar o componente
    }, [])

    // Efeito colateral para buscar os dados do arquivo CSV de Agências
    useEffect(() => {
        const buscarAgencias = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}/data/Agencias.csv?t=${Date.now()}`)
                if (!response.ok) 
                    throw new Error("Erro na requisição")
                const texto = await response.text()
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true,
                })
                    setAgencias(parsed.data as Agencia[])  // Armazena os dados das agências
            } catch (error) {
                throw Error  // Lida com erro de requisição
            }
        }
        buscarAgencias()
    }, [dados])  // Depende dos dados dos clientes, para garantir que as agências sejam carregadas após

    // Efeito colateral para buscar os dados do arquivo CSV de Contas
    useEffect(() => {
        const buscarContas = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}/data/Contas.csv?t=${Date.now()}`)
                if (!response.ok) 
                    throw new Error("Erro na requisição")
                const texto = await response.text()
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true
                })  
                    setContas(parsed.data as Conta[])  // Armazena os dados das contas
            } catch (error) {
                throw Error  // Lida com erro de requisição
            }
        }
        buscarContas()
    }, [dados])  // Depende dos dados dos clientes, para garantir que as contas sejam carregadas após

    // Efeito que ajustaria o CPF/CNPJ do cliente, caso seja maior que 11 caracteres
    // Está comentado por enquanto, mas pode ser usado para corrigir a formatação do CPF/CNPJ
    // useEffect(() => {
    //     contas.forEach(c => {
    //         if (c.cpfCnpjCliente.length> 11) {
    //             c.cpfCnpjCliente = c.cpfCnpjCliente.slice(0, 11)
    //         }
    //     })
    // }, [contas])

    // Efeito que busca o cliente, a agência e as contas vinculadas ao cliente com base no id da URL
    useEffect(() => {
        if (!dados || !agencias || !contas || !id) return;
        const cli = dados.find(c => c.id === id);  // Encontra o cliente pelo id
        setcliente(cli);  // Atualiza o estado do cliente
        if (cli) {
            const ag = agencias.find(a => a.codigo === cli.codigoAgencia);  // Encontra a agência do cliente
            setAgenciaCliente(ag);  // Atualiza o estado da agência do cliente
            const contasCliente = contas.filter(c => c.cpfCnpjCliente === cli.cpfCnpj);  // Filtra as contas do cliente
            setContasCliente(contasCliente);  // Atualiza o estado das contas do cliente
        }
        if(leu && dados.find(c => c.id === id) === undefined){
            //n('404')  // Caso não encontre o cliente, poderia redirecionar para uma página 404
        }
    }, [dados, agencias, contas])  // Depende de dados, agências e contas

    // Função para renderizar os dados do cliente
    const Tela = () =>{
        if(cliente == undefined){
            return null  // Caso o cliente não seja encontrado, não renderiza nada
        }
        return (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <div id='Cliente' className='d-flex align-items-center justify-content-center w-100 h-75'>
            <Container className="my-2 text-black p-1 rounded">
            <Row className="justify-content-start mb-2">
            <Col xs="auto">
                <Button variant="outline-primary" onClick={() => n(-1)}>
                ← Voltar
                </Button>
            </Col>
            </Row>

            <Row className="mb-4">
            <Col>
                <h2 className="m-0">Detalhes do Cliente</h2>
            </Col>
            </Row>

                {/* Exibe um card com as informações do cliente */}
                <Card  text="black" className="mb-2">
                    <Card.Header>Informações Pessoais</Card.Header>
                    <Card.Body>
                    <Row>
                        <Col md={6}>
                        <p><strong>Nome:</strong> {cliente.nome}</p>
                        <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                        <p><strong>Email:</strong> {cliente.email}</p>
                        <p><strong>Endereço:</strong> {cliente.endereco}</p>
                        <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
                        </Col>
                        <Col md={6}>
                        <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
                        <p><strong>Rg:</strong> {cliente.rg}</p>
                        <p><strong>Data Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}</p>
                        <p><strong>Renda Anual:</strong> {cliente.rendaAnual}</p>
                        <p><strong>Patrimonio:</strong> {cliente.patrimonio}</p>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>

                {/* Contêiner de abas para alternar entre informações de contas e agência */}
                <Tab.Container activeKey={abaAtiva} onSelect={(k) => setAbaAtiva(k || "contas")}>
                    <Nav variant="tabs" className="mb-3 rounded">
                    <Nav.Item>
                        <Nav.Link eventKey="contas">Contas Bancárias</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="agencia">Agência</Nav.Link>
                    </Nav.Item>
                    </Nav>

                    <Tab.Content>
                    {/* Aba de contas bancárias */}
                    <Tab.Pane eventKey="contas">
                        { contasCliente.length !== 0 && <Card bg="white" text="black">
                        <Card.Body>
                            <Table variant="white" striped bordered responsive>
                            <thead className='thead'>
                                <tr className='tr'>
                                    <th className='th'>Tipo</th>
                                    <th className='th'>Saldo</th>
                                    <th className='th'>Limite De Cretido</th>
                                    <th className='th'>Credito Disponivel</th>
                                </tr>
                            </thead>
                            <tbody className='tbody'>
                                {contasCliente.map((conta, index) => (
                                <tr key={index}>
                                    <td className='th'>{conta.tipo}</td>
                                    <td className='th'>{!conta.saldo.toString().includes("R$") && "R$ "}{conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td className='th'>{conta.limiteCredito}</td>
                                    <td className='th'>{conta.creditoDisponivel} </td>
                                </tr>
                                ))}
                            </tbody>
                            </Table>
                        </Card.Body>
                        </Card>}
                        { contasCliente.length === 0 && 
                        <Card bg="white" text="black">
                            <Card.Body>
                                <p>Este cliente ainda nao possui contas bancarias</p>
                            </Card.Body>
                            </Card>}
                    </Tab.Pane>

                    {/* Aba da agência vinculada ao cliente */}
                    <Tab.Pane eventKey="agencia">
                        {AgenciaCliente !== undefined && <Card bg="white" text="black">
                        <Card.Body>
                        <p className="text-muted mb-4">Detalhes da agência vinculada ao cliente</p>
                        <Row>
                            <Col md={6}>
                            <p><strong>Nome da Agência:</strong> {AgenciaCliente.nome}</p>
                            <p><strong>Codigo:</strong> {AgenciaCliente.codigo}</p>
                            <p><strong>Endereço:</strong> {AgenciaCliente.endereco}</p>
                            </Col>
                        </Row>
                        </Card.Body>
                        </Card>}
                        {AgenciaCliente === undefined && 
                        <Card bg="white" text="black">
                            <Card.Body>
                                <p>Este cliente ainda nao possui uma agencia vinculada</p>
                            </Card.Body>
                            </Card>}
                    </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
                </Container>
            </div>
        </div>
        )
    }

    return (
        <>  
            <Tela />
        </>
    )
}
