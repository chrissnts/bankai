import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client'

import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Home() {

    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const navigate = useNavigate();
    const permissions = getPermissions()
    const dataUser  = getDataUser()

    function fetchData() {

        console.log(permissions)

        setLoad(true) 
        setTimeout(() => {
    
            Client.get('clientes').then(res => {
                const clientes = res.data
                console.log(clientes)
                setData(clientes.data)
            })
            .catch(function(error) {
                console.log(error)
                // alert('ERROR')
            })
            .finally( () => {
                setLoad(false)
            })

        }, 1000)
    }

    function verifyPermission() {
        // Não Autenticado   
        if(!dataUser) navigate('/login')
        // Não Autorizado (rota anterior)
        else if(permissions.listCliente === 0) navigate(-1)
    }

    useEffect(() => {
        verifyPermission()
        fetchData()
    }, []);

    

    return (
        <>
            <NavigationBar />
            {
                load 
                ?
                    <Container className="d-flex justify-content-center mt-5">
                        <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
                    </Container>
                :
            
                <Container className='mt-2'>
                    <DataTable 
                        title="Clientes Registrados" 
                        rows={['Nome', 'Email', 'Ações']}
                        hide={[false, true, false]}
                        data={data}
                        keys={['Nome', 'Email']}
                        resource='clientes'
                        crud={['viewCliente', 'createCliente', 'editCliente', 'deleteCliente']}
                    />
                </Container>
            }
        </>
    )
}