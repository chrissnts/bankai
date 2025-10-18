import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Create() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const permissions = getPermissions();
  const dataUser = getDataUser();

  function verifyPermission() {
    if (!dataUser) navigate('/login');
    else if (permissions.createClients === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();
  }, []);

  function sendData() {
    const payload = {
      full_name: fullName,
      email,
      password,
      cpf,
      city,
      state,
      street,
      house_number: houseNumber,
    };

    Client.post('clients', payload)
      .then((response) => {
        console.log(response.data);
        setMessage("Cliente cadastrado com sucesso!");
        setShowModal(true);
      })
      .catch((error) => {
        console.error(error.response?.data || error);


        const errorData = error.response?.data;
        if (errorData?.errors) {

          setMessage(errorData.errors[0].message);
        } else {
          setMessage(errorData?.message || "Erro desconhecido. Tente novamente.");
        }

        setShowModal(true);
      });
  }

  function handleClose() {
    setShowModal(false);
    if (message === "Cliente cadastrado com sucesso!") navigate('/home');
  }

  return (
    <>
      <NavigationBar />
      <Container className="mt-2">
        <Label>Nome Completo</Label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Label>E-mail</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label>Senha</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label>CPF</Label>
        <Input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}  // Remove não-dígitos
          maxLength={11}
        />

        <Label>Cidade</Label>
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Label>Estado</Label>
        <Input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <Label>Rua</Label>
        <Input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <Label>Número</Label>
        <Input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />

        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <Submit type="button" value="Voltar" onClick={() => navigate('/home')} />
          <Submit type="button" value="Cadastrar" onClick={sendData} />
        </div>
      </Container>

      {/* Modal de feedback */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informação</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
