import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Modal,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/navigationbar";
import { Client } from "../../api/client";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";

export default function Savings() {
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
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

    Client.get("clients/me")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        const backendMsg = error.response?.data?.message;
        setErrorMsg(backendMsg || "Erro ao carregar dados do cliente.");
      })
      .finally(() => setLoad(false));
  }, []);

  function handleDeposit() {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage("Digite um valor válido para depositar.");
      setShowModal(true);
      return;
    }

    Client.post("transactions/deposit", { amount: parseFloat(amount) })
      .then(() => {
        setMessage("Depósito realizado com sucesso!");
        setAmount("");
      })
      .catch((err) => {
        console.error(err);
        const backendMsg = err.response?.data?.message;
        setMessage(backendMsg || "Erro ao realizar o depósito. Tente novamente.");
      })
      .finally(() => setShowModal(true));
  }

  const handleClose = () => setShowModal(false);

  return (
    <>
      <NavigationBar />
      <Container className="mt-5 d-flex justify-content-center">
        {load ? (
          <Spinner animation="border" variant="success" />
        ) : errorMsg ? (
          <Alert variant="danger">{errorMsg}</Alert>
        ) : (
          <Card style={{ width: "30rem" }} className="shadow text-center">
            <Card.Body>
              <Card.Title className="mb-4 fs-3">Depósito em Poupança</Card.Title>

              <Form.Group className="mb-4 text-start">
                <Form.Label>Valor do Depósito</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Ex: 100.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center gap-3">
                <Button variant="secondary" onClick={() => navigate("/home")}>
                  Voltar
                </Button>
                <Button variant="success" onClick={handleDeposit}>
                  Depositar
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Modal de feedback */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informação</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
