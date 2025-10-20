import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { Client } from "../../api/client";
import NavigationBar from "../../components/navigationbar";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";

export default function Balance() {
  const [errorMsg, setErrorMsg] = useState("");
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

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

    Client.get("clients/me")
      .then((res) => {
        const cliente = res.data.data;
        setData(cliente);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));

    setLoad(false);
  }, []);



  return (
    <>
      <NavigationBar />
      <Container className="mt-5 d-flex justify-content-center">
        {load ? (
          <Spinner animation="border" variant="success" />
        ) : errorMsg ? (
          <Alert variant="danger">{errorMsg}</Alert>
        ) : (
          <Card style={{ width: "28rem" }} className="shadow text-center">
            <Card.Body>
              <Card.Title className="mb-4 fs-3">Saldo da Conta</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {data.fullName}
              </Card.Text>
              <Card.Text>
                <strong>Agência:</strong> {data.account?.agency || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Conta:</strong>{" "}
                {data.account?.number
                  ? String(data.account.number).padStart(6, "0")
                  : "N/A"}
              </Card.Text>
              <Card.Text className="fs-4 mt-4">
                <strong>Saldo Atual:</strong>{" "}
                {data.account?.balance !== undefined
                  ? `R$ ${Number(data.account.balance).toFixed(2)}`
                  : "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
