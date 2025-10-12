import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Submit } from "./style"
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Create() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function sendData() {
    const user = {
        full_name: fullName,
        email: email,
        password: password,     
        cpf: cpf,
        city: city,             
        state: state,
        street: street,
        house_number: houseNumber,
    }

    Client.post('clients', user)
        .then(response => {
            console.log(response.data);
            navigate('/clients')
        })
        .catch(error => {
            console.error(error.response.data) 
        })
}

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createClients === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
    }, []);

    return (
        <>
            <NavigationBar />
            <Container className='mt-2'>
                <Label>Nome Completo</Label>
                <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                <Label>E-mail</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <Label>Senha</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Label>CPF</Label>
                <Input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />

                <Label>Cidade</Label>
                <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

                <Label>Estado</Label>
                <Input type="text" value={state} onChange={(e) => setState(e.target.value)} />

                <Label>Rua</Label>
                <Input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />

                <Label>Número</Label>
                <Input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />

                <br />
                <Submit value="Voltar" onClick={() => navigate('/clients')} />
                <Submit value="Cadastrar" onClick={sendData} />
            </Container>
        </>
    )
}
