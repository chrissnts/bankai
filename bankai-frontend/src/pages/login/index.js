
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from './style';
import FormLogin from '../../components/formlogin';
import ImageLogin from '../../components/imagelogin';
import { Client } from '../../api/client'
import { OrbitProgress } from "react-loading-indicators";

export default function Login() {

    const navigate = useNavigate();
    const [load, setLoad] = useState(true)

   function fetchData() {
    setLoad(true)
    setTimeout(() => {
        Client.get('/auth/me')
            .then(res => {
                const user = res.data

                if (user.paper_id === 1) {
                    navigate('/clients')  
                } else {
                    navigate('/home') 
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoad(false))
    }, 1000)
}

    useEffect(() => {
        fetchData()
    }, []);

    return (
        load 
        ?
            <Container className="d-flex justify-content-center mt-5">
                <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
            </Container>
        :
            <Container>
                <FormLogin />
                <ImageLogin />
            </Container>
    )
}
