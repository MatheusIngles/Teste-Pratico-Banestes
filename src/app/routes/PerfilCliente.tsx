import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Card, Tab, Nav, Table } from 'react-bootstrap';
import Papa from 'papaparse'
import './PerfilCliente.css'

export default function Perfil() {

    type Conta = {
        id: string
        cpfCnpjCliente: string
        tipo: string
        saldo: number
        limiteCredito: number
        creditoDisponivel: number
    }

    type Agencia = {
        id: string
        codigo: number
        nome: string
        endereco: string
    }

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

    const { id } = useParams<{ id: string}>()
    const n = useNavigate()
    const [dados, setdados] = useState<Array<Cliente>>([])
    const [cliente, setcliente] = useState<Cliente>()
    const [agencias, setAgencias] = useState<Array<Agencia>>([])
    const [AgenciaCliente, setAgenciaCliente] = useState<Agencia>();
    const [contas, setContas] = useState<Array<Conta>>([])
    const [contasCliente, setContasCliente] = useState<Array<Conta>>([]);

    useEffect(() => {
        const buscarCSV = async () => {
            try {
                const response = await fetch(`/data/Clientes.csv?t=${Date.now()}`)
                if (!response.ok) 
                    throw new Error("Erro na requisição")
                const texto = await response.text()
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true,
                })
                    setdados(parsed.data as Cliente[])
            } catch (error) {
                throw Error
            }
        }
        buscarCSV()
        //const inter = setInterval(buscarCSV, 5000)
        //return () => clearInterval(inter)
    }, [])

    useEffect(() => {
        const buscarAgencias = async () => {
            try {
                const response = await fetch(`/data/Agencias.csv?t=${Date.now()}`)
                if (!response.ok) 
                    throw new Error("Erro na requisição")
                const texto = await response.text()
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true,
                })
                    setAgencias(parsed.data as Agencia[])
            } catch (error) {
                throw Error
            }
        }
    
        buscarAgencias()
    }, [dados])

    useEffect(() => {
        const buscarContas = async () => {
            try {
                const response = await fetch(`/data/Contas.csv?t=${Date.now()}`)
                if (!response.ok) 
                    throw new Error("Erro na requisição")
                const texto = await response.text()
                const parsed = Papa.parse(texto, {
                    header: true,
                    skipEmptyLines: true,
                })
                if( contas !== parsed.data as Conta[] ){
                    setContas(parsed.data as Conta[])
                }
            } catch (error) {
                throw Error
            }
        }
    
        buscarContas()
    }, [dados])

    useEffect(() => {
        if (!dados || !agencias || !contas || !id) return;
        const cli = dados.find(c => c.id === id);
        setcliente(cli);
        if (cli) {
            const ag = agencias.find(a => a.codigo === cli.codigoAgencia);
            setAgenciaCliente(ag);
            const contasCliente = contas.filter(c => c.cpfCnpjCliente === cli.cpfCnpj);
            setContasCliente(contasCliente);
        }
    }, [dados, agencias, contas])

    const Tela = () =>{
        if(cliente == undefined){
            return null
        }
        return (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <div id='Cliente' className='d-flex align-items-center justify-content-center w-100 h-75'>
            <Container className="my-2 text-white p-1 rounded">
                <h2 className="mb-4 text-black">Detalhes do Cliente</h2>

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

                <Tab.Container defaultActiveKey="contas">
                    <Nav variant="tabs" className="mb-3 rounded">
                    <Nav.Item>
                        <Nav.Link eventKey="contas">Contas Bancárias</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="agencia">Agência</Nav.Link>
                    </Nav.Item>
                    </Nav>

                    <Tab.Content>
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
                                    <td className='th'>R$ {conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
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

                    <Tab.Pane eventKey="agencia">
                        <Card bg="white" text="black">
                        <Card.Body>
                            <p>Informações da agência vão aqui...</p>
                        </Card.Body>
                        </Card>
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