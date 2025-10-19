import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { Container } from "./style";
import FormLogin from "../../components/formlogin";
import ImageLogin from "../../components/imagelogin";
import { Client, getToken } from "../../api/client";
import { OrbitProgress } from "react-loading-indicators";
import UserContext from "../../contexts/UserContext.js";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // Não existe token, mostra formulário
      setLoading(false);
      return;
    }

    // Token existe, tenta validar com /auth/me
    Client.get("/auth/me")
      .then((res) => {
        const user = res.data.user;
        setUser(user);
        navigate("/home");

      })
      .catch((err) => {
        console.log("Token inválido ou expirado:", err.message);
        setLoading(false);
      });
  }, [navigate, setUser]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <OrbitProgress
          variant="spokes"
          color="#32cd32"
          size="medium"
          text=""
          textColor=""
        />
      </Container>
    );
  }

  return (
    <Container>
      <FormLogin />
      <ImageLogin />
    </Container>
  );
}
