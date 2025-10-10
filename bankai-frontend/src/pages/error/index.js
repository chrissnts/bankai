import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function Error() {

     const navigate = useNavigate();

    return (
        <Container className='mt-2'>
            <h1>Permissão Negada!!</h1>    
            <button onClick={ () => navigate('/login')}>Login</button>
        </Container>
    )
}