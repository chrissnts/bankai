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

export default function Transfer() {
  const [destinationAccount, setDestinationAccount] = useState("");
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
        const cliente = res.data.data;
        setData(cliente);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));

    setLoad(false);
  }, []);

  function handleTransfer() {
    if (!destinationAccount || !amount) {
      setMessage("Todos os campos são obrigatórios!");
      setShowModal(true);
      return;
    }

    if (parseFloat(amount) <= 0) {
      setMessage("O valor da transferência deve ser maior que zero!");
      setShowModal(true);
      return;
    }

    const transferData = {
      fromAccount: data.account.number, // número da conta origem como string
      toAccount: destinationAccount,    // número da conta destino como string
      amount: parseFloat(amount),       // float parseado
    };


    Client.post("transactions/transfer", transferData)
      .then((res) => {
        setMessage("Transferência realizada com sucesso!");
        setShowModal(true);
        setAmount("");
        setDestinationAccount("");
      })
      .catch((err) => {
        console.error(err);
        setMessage(
          "Erro ao realizar transferência. Verifique os dados e tente novamente."
        );
        setShowModal(true);
      });
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
              <Card.Title className="mb-4 fs-3">Transferência (Pix)</Card.Title>

              <Form.Group className="mb-3 text-start">
                <Form.Label>Número da Conta Destino</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: 000123"
                  value={destinationAccount}
                  onChange={(e) => setDestinationAccount(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4 text-start">
                <Form.Label>Valor da Transferência</Form.Label>
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
                <Button variant="primary" onClick={handleTransfer}>
                  Enviar
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
