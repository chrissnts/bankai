import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { 
    Label,
    Input,
    Submit,
} from "./style"
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Create() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('') 
    const [address, setAddress] = useState('')

    const navigate = useNavigate();
    const permissions = getPermissions()
    const dataUser  = getDataUser()
    
    function sendData() {

        const user = { nome: name, email: email, cpf: cpf, address: address }
        console.log(user)

        Client.post('clients', user).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        navigate('/clients')
    }

    function verifyPermission() {
       // Não Autenticado   
        if(!dataUser) navigate('/login')
        // Não Autorizado (rota anterior)
        else if(permissions.createClients === 0) navigate(-1)
    }
    
    useEffect(() => {
        verifyPermission()
    }, []);

    return (
        <>
            <NavigationBar />
             <Container className='mt-2'>
                <Label>Name</Label>
                 <Input
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label>E-mail </Label>
                <Input
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label>CPF (11 digitos)</Label>
                <Input
                    type="number" 
                    id="cpf" 
                    name="cpf" 
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                />
                <Label>Endereço</Label>
                <Input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <br/>
                <Submit value="Voltar" onClick={() => navigate('/clients')  }/>
                <Submit value="Cadastrar" onClick={() => sendData() }/>
             </Container>
        </>
    )
    
}