import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import NavigationBar from "../../components/navigationbar";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";

export default function Balance() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); // não precisa de loading se usa localStorage
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

  useEffect(() => {
    if (!dataUser) {
      navigate("/login");
      return;
    }
    if (permissions.listClients === 0) {
      navigate(-1);
      return;
    }

    async function fetchUserData() {
      try {
        const response = await axios.get("/auth/me"); 
        setUserData(response.data.data);
      } catch (error) {
        setErrorMsg("Erro ao buscar dados do usuário");
      } finally {
        setLoading(false);
      }
    }

    
    fetchUserData();

  }, [dataUser, permissions, navigate]);

  if (!dataUser) {
    
    return null;
  }

  return (
    <>
      <NavigationBar />
      <Container className="mt-5 d-flex justify-content-center">
        {loading ? (
          <Spinner animation="border" variant="success" />
        ) : errorMsg ? (
          <Alert variant="danger">{errorMsg}</Alert>
        ) : (
          <Card style={{ width: "28rem" }} className="shadow text-center">
            <Card.Body>
              <Card.Title className="mb-4 fs-3">Saldo da Conta</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {dataUser.fullName}
              </Card.Text>
              <Card.Text>
                <strong>Agência:</strong> {dataUser.agency || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Conta:</strong>{" "}
                {dataUser.account_number
                  ? String(dataUser.account_number).padStart(6, "0")
                  : "N/A"}
              </Card.Text>
              <Card.Text className="fs-4 mt-4">
                <strong>Saldo Atual:</strong>{" "}
                {dataUser.balance !== undefined
                  ? `R$ ${Number(dataUser.balance).toFixed(2)}`
                  : "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
