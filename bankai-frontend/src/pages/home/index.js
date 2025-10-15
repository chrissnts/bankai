import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import { Client } from "../../api/client";
import { getDataUser } from "../../service/UserService";

import { Label, Input, Submit } from "./style";

export default function UserHome() {
  const [user, setUser] = useState(getDataUser());
  const [saldo, setSaldo] = useState(0);
  const [extrato, setExtrato] = useState([]);
  const [destino, setDestino] = useState("");
  const [valor, setValor] = useState("");
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Carrega saldo e extrato do usuário
  function fetchData() {
    setLoad(true);
    Client.get(`users/${user.id}/account`)
      .then((res) => {
        setSaldo(res.data.saldo);
        setExtrato(res.data.extrato);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoad(false));
  }

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchData();
  }, []);

  // Função de Transferência (Pix)
  function handlePix() {
    if (Number(valor) <= 0) {
      setMsg("Valor inválido!");
      return;
    }
    if (Number(valor) > saldo) {
      setMsg("Saldo insuficiente!");
      return;
    }

    Client.post(`transactions/pix`, { destino, valor })
      .then((res) => {
        setMsg("Transferência realizada!");
        fetchData();
        setDestino("");
        setValor("");
      })
      .catch((err) => setMsg("Erro na transferência."));
  }

  // Função de Aplicação financeira
  function handleAplicacao() {
    if (Number(valor) <= 0 || Number(valor) > saldo) {
      setMsg("Valor inválido ou saldo insuficiente!");
      return;
    }

    Client.post(`transactions/aplicacao`, { valor })
      .then((res) => {
        setMsg("Aplicação realizada!");
        fetchData();
        setValor("");
      })
      .catch((err) => setMsg("Erro na aplicação."));
  }

  return (
    <>
      <NavigationBar />
      <Container className="mt-3">
        {load ? (
          <Container className="d-flex justify-content-center mt-5">
            <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
          </Container>
        ) : (
          <>
            <h3>Bem-vindo, {user.fullName}</h3>
            <p>Saldo Atual: R$ {saldo.toFixed(2)}</p>

            <hr />

            <h5>Efetuar Transferência (Pix)</h5>
            <Label>Conta de Destino:</Label>
            <Input
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
            <Label>Valor:</Label>
            <Input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <Submit value="Enviar Pix" onClick={handlePix} />

            <hr />

            <h5>Efetuar Aplicação Financeira</h5>
            <Label>Valor:</Label>
            <Input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            <Submit value="Aplicar" onClick={handleAplicacao} />

            <hr />

            <h5>Extrato de Movimentações</h5>
            <Container>
              {extrato.map((item, index) => (
                <Row key={index}>
                  <Col>{item.tipo}</Col>
                  <Col>
                    {item.tipo === "retirada" ? "-" : "+"} R$ {item.valor.toFixed(2)}
                  </Col>
                  <Col>{new Date(item.data).toLocaleString()}</Col>
                </Row>
              ))}
            </Container>

            {msg && <p>{msg}</p>}
          </>
        )}
      </Container>
    </>
  );
}