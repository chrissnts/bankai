import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { Input, Label, Submit } from './style';

export default function EditAccount() {
    const [balance, setBalance] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(true);

    const location = useLocation();
    const cliente = location.state?.item;
    const navigate = useNavigate();

    const permissions = getPermissions();
    const dataUser = getDataUser();

    const [fullName, setFullName] = useState(cliente?.full_name || cliente?.name || '');

    // Verifica permissões
    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.editAccount === 0) navigate(-1);
    }

    function fetchAccount() {
        if (!cliente || !cliente.id) {
            setMessage("Cliente inválido.");
            setShowModal(true);
            return;
        }

        setLoad(true);
        Client.get(`accounts/${cliente.id}`)
            .then(res => {
                const account = res.data.data;
                setBalance(account.balance || '');
            })
            .catch(err => {
                console.error(err);
                setMessage('Erro ao carregar conta.');
                setShowModal(true);
            })
            .finally(() => setLoad(false));
    }

    useEffect(() => {
        verifyPermission();
        fetchAccount();
    }, []);

    function updateAccount() {
        if (balance === '') {
            setMessage("O saldo é obrigatório!");
            setShowModal(true);
            return;
        }

        const updatedAccount = {
            user_id: cliente.id,
            balance: parseFloat(balance)
        };

        Client.put(`accounts/${cliente.id}`, updatedAccount)
            .then(response => {
                console.log(response.data);
                setMessage("Conta atualizada com sucesso!");
                setShowModal(true);
            })
            .catch(err => {
                console.error(err);
                setMessage("Erro ao atualizar a conta.");
                setShowModal(true);
            });
    }

    const handleClose = () => {
        setShowModal(false);
        if (message === "Conta atualizada com sucesso!") navigate('/accounts');
    }

    return (
        <>
            <NavigationBar />
            <Container className='mt-3'>

                <Label>Cliente</Label>
                <Input
                    type="text"
                    value={fullName || "Nome não disponível"}
                    disabled
                />

                <Label>Saldo</Label>
                <Input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    disabled={load}
                />

                <br />
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Submit value="Voltar" onClick={() => navigate('/accounts')} />
                    <Submit value="Salvar Alterações" onClick={updateAccount} />
                </div>
            </Container>

            {/* Modal de feedback */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Informação</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
