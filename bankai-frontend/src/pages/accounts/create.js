import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { Input, Label, Submit } from './style';

export default function CreateAccount() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [balance, setBalance] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const permissions = getPermissions();
    const dataUser = getDataUser();


    function fetchUsers() {
        Client.get('clients')
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => console.log(err));
    }

    // Verifica permissão
    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createAccount === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchUsers();
    }, []);

    
    function createAccount() {
        if (!selectedUser || !balance) {
            setMessage("Todos os campos são obrigatórios!");
            setShowModal(true);
            return;
        }

        const newAccount = {
            user_id: selectedUser,
            balance: parseFloat(balance)
        };

        Client.post('accounts', newAccount)
            .then(response => {
                console.log(response.data);
                setMessage("Conta criada com sucesso!");
                setShowModal(true);
            })
            .catch(err => {
                setMessage("Erro ao criar a conta.");
                setShowModal(true);
                console.error(err);
            });
    }

    const handleClose = () => {
        setShowModal(false);
        if (message === "Conta criada com sucesso!") navigate('/accounts');
    }

    return (
        <>
            <NavigationBar />
            <Container className='mt-2'>
                <Label>Cliente</Label>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Selecione um cliente</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.fullName}</option>
                    ))}
                </select>

                <Label>Saldo Inicial</Label>
                <Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />

                <br />
                <Submit value="Voltar" onClick={() => navigate('/accounts')} />
                <Submit value="Criar Conta" onClick={createAccount} />
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
