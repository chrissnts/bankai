import { useEffect, useState } from "react";
import { Container, Card, Table, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/navigationbar";
import { Client } from "../../api/client";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

  function verifyPermission() {
    if (!dataUser) navigate("/login");
    else if (permissions.listClients === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();

    if (!dataUser) {
      navigate("/login");
      return;
    }

    Client.get("transactions")
      .then((res) => {
        const allTransactions = res.data.data;
        const userTransactions = allTransactions.filter(
          (t) => t.account_id === dataUser.account?.id
        );
        setTransactions(userTransactions);
      })
      .catch((error) => {
        console.error(error);
        // Mensagem de erro do backend, se existir, senão genérica
        const backendMsg = error.response?.data?.message;
        setErrorMsg(backendMsg || "Erro ao carregar extrato.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="mt-5">
        <h2 className="mb-4 text-center">Extrato da Conta</h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="success" />
          </div>
        ) : errorMsg ? (
          <Alert variant="danger">{errorMsg}</Alert>
        ) : transactions.length === 0 ? (
          <Alert variant="info">Nenhuma transação encontrada.</Alert>
        ) : (
          <Card className="shadow">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Valor (R$)</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
                      <td
                        style={{
                          color:
                            (tx.type === "deposit" || tx.type === "pix") && tx.amount > 0
                              ? "green"
                              : "red",
                        }}
                      >
                        {Number(tx.amount).toFixed(2)}
                      </td>
                      <td>{tx.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
