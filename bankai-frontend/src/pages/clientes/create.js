import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { 
    Label,
    Input,
    Submit,
} from "./style"
import { Client } from '../../api/client';
// import UserContext from '../../contexts/UserContext'
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Create() {

    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('') 
    const [endereco, setEndereco] = useState('')

    const navigate = useNavigate();
    // const { user } = useContext(UserContext);
    const permissions = getPermissions()
    const dataUser  = getDataUser()
    
    function sendData() {

        const user = { nome: name, duracao: duration }
        // console.log(user)

        Client.post('cursos', user).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        navigate('/cursos')
    }

    function verifyPermission() {
       // Não Autenticado   
        if(!dataUser) navigate('/login')
        // Não Autorizado (rota anterior)
        else if(permissions.createCurso === 0) navigate(-1)
    }
    
    useEffect(() => {
        verifyPermission()
    }, []);

    return (
        <>
            <NavigationBar />
             <Container className='mt-2'>
                <Label>Nome</Label>
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
                    id="endereco"
                    name="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
                <br/>
                <Submit value="Voltar" onClick={() => navigate('/cursos')  }/>
                <Submit value="Cadastrar" onClick={() => sendData() }/>
             </Container>
        </>
    )
    
}