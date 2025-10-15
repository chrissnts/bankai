import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
import UserContext from "../../contexts/UserContext.js";
import { Client, setToken } from "../../api/client";
import { setPermissions } from "../../service/PermissionService";
import { setDataUser } from "../../service/UserService";
import {
  Container,
  BoxIcon,
  BoxItem,
  Icon,
  Title,
  SubTitle,
  Label,
  InputPassword,
  InputEmail,
  MsgBox,
  SendBox,
  Submit,
  LinkForgot,
} from "./style";

import logo_depen from "../../images/image.png";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function Authenticate() {
    const user = { email, password };

    setView(false);
    setLoad(true);

    setTimeout(() => {
      Client.post("auth/login", user)
        .then((res) => {
          const data = res.data;
          console.log(data);

          // Salva no contexto e localStorage
          setUser(data.user);
          setDataUser(data.user);
          setToken(data.token.value);
          setPermissions(data.permissions);

          // Redirecionamento baseado no papel do usuário
          if (data.user.paper_id === 1) {
            navigate("/clients"); // Admin
          } else {
            navigate("/home"); // Usuário comum
          }
        })
        .catch((error) => {
          setView(true);
          console.log(error);
        })
        .finally(() => setLoad(false));
    }, 1000);
  }

  return (
    <Container>
      <BoxIcon>
        <div></div>
        <BoxItem>
          <Icon src={logo_depen} />
        </BoxItem>
        <div></div>
      </BoxIcon>
      <Title>Autenticação</Title>
      <SubTitle>Informe suas Credenciais</SubTitle>
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
        <>
          <Label>E-mail</Label>
          <InputEmail
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label>Senha</Label>
          <InputPassword
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {view ? (
            <MsgBox>
              <p>Usuário e Senha Inválidos!</p>
            </MsgBox>
          ) : (
            ""
          )}

          <SendBox>
            <Submit value="Autenticar" onClick={() => Authenticate()} />
            <LinkForgot onClick={() => navigate("/login")}>
              {" "}
              Esqueceu sua senha?
            </LinkForgot>
          </SendBox>
        </>
      )}
    </Container>
  );
}
