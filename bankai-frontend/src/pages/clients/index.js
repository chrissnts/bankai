import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import DataTable from "../../components/datatable";
import { Client } from "../../api/client";

import { getPermissions } from "../../service/PermissionService";
import { getDataUser } from "../../service/UserService";

export default function Home() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const permissions = getPermissions();
  const dataUser = getDataUser();

  function fetchData() {
    console.log(permissions);

    setLoad(true);
    setTimeout(() => {
      Client.get("clients")
        .then((res) => {
          const clientes = res.data.data.map((cliente) => ({
            ...cliente,
            agency_number: cliente.account?.agency || "N/A",
            account_number: cliente.account?.accountNumber || "N/A",
          }));

          console.log(clientes);
          setData(clientes);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  }

  function verifyPermission() {
    // Não Autenticado
    if (!dataUser) navigate("/login");
    // Não Autorizado (rota anterior)
    else if (permissions.listClients === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      {load ? (
        <Container className="d-flex justify-content-center mt-5">
          <OrbitProgress
            variant="spokes"
            color="#32cd32"
            size="medium"
            text=""
            textColor=""
          />
        </Container>
      ) : (
        <Container className="mt-2">
          <DataTable
            title="Clientes Registrados"
            rows={["Nome", "Email", "CPF", "Agência", "Conta"]}
            hide={[false, true, false, true, true]}
            data={data}
            keys={[
              "fullName",
              "email",
              "cpf",
              "agency_number",
              "account_number",
            ]}
            resource="clients"
            crud={["viewClient", "createClient", "editClient", "deleteClient"]}
          />
        </Container>
      )}
    </>
  );
}
