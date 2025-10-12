import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Button, Table } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client'
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { Input, Label, Submit } from './style';

export default function ContaCorrente() {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showStatementModal, setShowStatementModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transferValue, setTransferValue] = useState('');
    const [transferTarget, setTransferTarget] = useState('');

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser  = getDataUser();

    // Busca contas
    function fetchAccounts() {
        setLoad(true);
        setTimeout(() => {
            Client.get('accounts')
                .then(res => {
                    const accounts = res.data.data.map(acc => ({
                        ...acc,
                        clientName: acc.user?.fullName || 'N/A',
                        agency: acc.agency,
                        accountNumber: acc.accountNumber,
                        balance: acc.balance
                    }));

                    setData(accounts);
                })
                .catch(err => console.log(err))
                .finally(() => setLoad(false));
        }, 1000);
    }

    // Verifica permissão e autenticação
    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.listAccounts === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchAccounts();
    }, []);

    // Funções de modal
    const openBalance = (account) => { setSelectedAccount(account); setShowBalanceModal(true); }
    const openTransfer = (account) => { setSelectedAccount(account); setShowTransferModal(true); }
    const openStatement = (account) => { setSelectedAccount(account); setShowStatementModal(true); }

    const handleTransfer = () => {
        // Placeholder para enviar transferência
        console.log("Transferindo", transferValue, "para", transferTarget);
        setShowTransferModal(false);
        setTransferValue('');
        setTransferTarget('');
    }

    return (
        <>
            <NavigationBar />
            {load ? 
                <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
                </Container>
            :
                <Container className='mt-2'>
                    <DataTable 
                        title="Contas Correntes" 
                        rows={['Cliente', 'Agência', 'Conta', 'Saldo', ]}
                        hide={[false, false, false, false]}
                        data={data}
                        keys={['clientName', 'agency', 'accountNumber', 'balance']}
                        resource='accounts'
                        crud={['viewAccount', 'createAccount', 'editAccount', 'deleteAccount']}
                        actions={[
                            { label: 'Saldo', action: openBalance },
                            { label: 'Transferir', action: openTransfer },
                            { label: 'Extrato', action: openStatement }
                        ]}
                    />
                </Container>
            }

            {/* Modal Saldo */}
            <Modal show={showBalanceModal} onHide={() => setShowBalanceModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Saldo da Conta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Cliente: {selectedAccount?.clientName}</p>
                    <p>Agência: {selectedAccount?.agency} - Conta: {selectedAccount?.accountNumber}</p>
                    <h4>Saldo: R$ {selectedAccount?.balance?.toFixed(2)}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBalanceModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Transferência */}
            <Modal show={showTransferModal} onHide={() => setShowTransferModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Transferência (Pix)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Label>Conta Destino</Label>
                    <Input value={transferTarget} onChange={(e) => setTransferTarget(e.target.value)} />
                    <Label>Valor</Label>
                    <Input value={transferValue} onChange={(e) => setTransferValue(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Submit onClick={handleTransfer} value="Enviar" />
                    <Button variant="secondary" onClick={() => setShowTransferModal(false)}>Cancelar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Extrato */}
            <Modal size="lg" show={showStatementModal} onHide={() => setShowStatementModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Extrato de Movimentações</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aqui você mapeia as movimentações do backend */}
                            {selectedAccount?.transactions?.map((t, i) => (
                                <tr key={i}>
                                    <td>{t.date}</td>
                                    <td>{t.type}</td>
                                    <td>{t.type === 'saída' ? `- R$ ${t.amount.toFixed(2)}` : `+ R$ ${t.amount.toFixed(2)}`}</td>
                                </tr>
                            )) || <tr><td colSpan={3}>Sem movimentações</td></tr>}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowStatementModal(false)}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
