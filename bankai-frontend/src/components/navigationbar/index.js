import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropTitle from "../droptitle";
import { Client, removeToken } from '../../api/client';
import { removePermissions } from '../../service/PermissionService';
import { getDataUser, removeDataUser } from '../../service/UserService';

function NavigationBar() {
  const navigate = useNavigate();
  const dataUser = getDataUser();

  function logout() {
    setTimeout(() => {
      Client.post('auth/logout')
        .then(res => {
          removeToken();
          removePermissions();
          removeDataUser();
          navigate('/login');
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 1000);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {dataUser && dataUser.paper_id === 1 && (
              <>
                <Nav.Link onClick={() => navigate('/home')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#555"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <span className="ms-1 fw-bolder">Clientes</span>
                </Nav.Link>

                <Nav.Link onClick={() => navigate('/accounts')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#555"
                    className="bi bi-credit-card-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3h16v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7zm3 3.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H3z" />
                  </svg>
                  <span className="ms-1 fw-bolder">Contas</span>
                </Nav.Link>
              </>
            )}
          </Nav>

          <NavDropdown
            title={<DropTitle text={dataUser ? dataUser.fullName : 'Visitante'} />}
            id="navbarScrollingDropdown"
            className="m-5"
          >
            <NavDropdown.Item href="#" className="m-0">
              {dataUser ? dataUser.email : 'visitante@gmail.com'}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout} className="m-0">
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
