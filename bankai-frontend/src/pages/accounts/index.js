import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Button, Table } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client'
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function ContaCorrente() {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();


    function fetchAccounts() {
        setLoad(true);
        setTimeout(() => {
            Client.get('accounts')
                .then(res => {
                    const accounts = res.data.data.map(acc => ({
                        ...acc,
                        clientName: acc.user?.fullName || 'N/A',
                        agency: acc.agency,
                        accountNumber: acc.id
                            ? String(acc.id).padStart(6, "0")
                            : "N/A",
                        balance: acc.balance
                    }));

                    setData(accounts);
                })
                .catch(err => console.log(err))
                .finally(() => setLoad(false));
        }, 1000);
    }


    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.listAccounts === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchAccounts();
    }, []);


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
                        rows={['Cliente', 'Agência', 'Conta', 'Saldo',]}
                        hide={[false, false, false, false]}
                        data={data}
                        keys={['clientName', 'agency', 'accountNumber', 'balance']}
                        resource='accounts'
                        crud={['viewAccount', 'createAccount', 'editAccount', 'deleteAccount']}
                    />
                </Container>
            }


        </>
    )
}
