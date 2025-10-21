import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
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

    function verifyPermission() {
    // Não Autenticado
    if (!dataUser) navigate("/login");
    // Não Autorizado (rota anterior)
    else if (permissions.listClients === 0) navigate(-1);
  }

  useEffect(() => {

    verifyPermission();
    if (!dataUser) {
      navigate("/login");
      return;
    }
    console.log(dataUser)
    if (dataUser.paper_id === 1) {
      fetchClients();
    } else setLoad(false); 
  }, []);

  function fetchClients() {
    setLoad(true);
    Client.get("clients")
      .then((res) => {
        const clientes = res.data.data.map((cliente) => ({
          ...cliente,
          agency_number: cliente.account?.agency || "N/A",
          account_number: cliente.account?.id
            ? String(cliente.account.id).padStart(6, "0")
            : "N/A",
        }));
        setData(clientes);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoad(false));
  }

  function renderAdmin() {
    return (
      <Container className="mt-2">
        <DataTable
          title="Clientes Registrados"
          rows={["Nome", "Email", "CPF", "Agência", "Conta"]}
          hide={[false, true, false, true, true]}
          data={data}
          keys={["fullName", "email", "cpf", "agency_number", "account_number"]}
          resource="clients"
          crud={["viewClient", "createClient", "editClient", "deleteClient"]}
        />
      </Container>
    );
  }
  function renderClient() {
    return (
      <Container className="mt-4">
        <Row className="g-3">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Ver Saldo</Card.Title>
                <Button
                  variant="success"
                  onClick={() => navigate("/client/balance")}
                >
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Transferência (Pix)</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => navigate("/client/transfer")}
                >
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Extrato</Card.Title>
                <Button
                  variant="info"
                  onClick={() => navigate("/client/statement")}
                >
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Poupança</Card.Title>
                <Button
                  variant="warning"
                  onClick={() => navigate("/client/savings")}
                >
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
  <>
    <NavigationBar />
    {(!dataUser || load) ? (
      <Container className="d-flex justify-content-center mt-5">
        <OrbitProgress
          variant="spokes"
          color="#32cd32"
          size="medium"
          text=""
          textColor=""
        />
      </Container>
    ) : dataUser.paper_id === 1 ? (
      renderAdmin()
    ) : (
      renderClient()
    )}
  </>
);
}
