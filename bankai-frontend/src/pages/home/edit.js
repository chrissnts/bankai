import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Edit() {
    const location = useLocation();
    const cliente = location.state?.item; 

    const [fullName, setFullName] = useState(cliente?.full_name || '');
    const [email, setEmail] = useState(cliente?.email || '');
    const [cpf, setCpf] = useState(cliente?.cpf || '');
    const [city, setCity] = useState(cliente?.address?.city || '');
    const [state, setState] = useState(cliente?.address?.state || '');
    const [street, setStreet] = useState(cliente?.address?.street || '');
    const [houseNumber, setHouseNumber] = useState(cliente?.address?.house_number || '');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function updateClient() {
        const user = {
            full_name: fullName,
            email,
            cpf,
            city,
            state,
            street,
            house_number: houseNumber,
        };

        Client.put(`clients/${cliente.id}`, user)
            .then(response => {
                setShowModal(true);
            })
            .catch(error => {
                console.error(error.response?.data || error);
            });
    }

    function handleCloseModal() {
        setShowModal(false);
        navigate('/home');
    }

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.editClients === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
    }, []);

    return (
        <>
            <NavigationBar />
            <Container className='mt-2'>
                <Label>Nome Completo</Label>
                <Input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />

                <Label>E-mail</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <Label>CPF</Label>
                <Input type="text" value={cpf} onChange={e => setCpf(e.target.value)} />

                <Label>Cidade</Label>
                <Input type="text" value={city} onChange={e => setCity(e.target.value)} />

                <Label>Estado</Label>
                <Input type="text" value={state} onChange={e => setState(e.target.value)} />

                <Label>Rua</Label>
                <Input type="text" value={street} onChange={e => setStreet(e.target.value)} />

                <Label>Número</Label>
                <Input type="text" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} />

                <br />
                <Submit value="Voltar" onClick={() => navigate('/home')} />
                <Submit value="Alterar" onClick={updateClient} />
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação realizada com sucesso!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
