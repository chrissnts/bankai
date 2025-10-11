import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Image } from "./style"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import DropTitle from "../droptitle";
import logo_depen from '../../images/image.png';

import UserContext from '../../contexts/UserContext'
import { Client, removeToken }  from '../../api/client';
import { removePermissions } from '../../service/PermissionService'
import { getDataUser, removeDataUser } from '../../service/UserService'

function NavigationBar() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const dataUser = getDataUser()
  
  function logout() {
  
    setTimeout(() => {
      Client.post('auth/logout').then(res => {
        removeToken()
        removePermissions()
        removeDataUser()
        navigate('/login')
      })
      .catch(function(error) {
          console.log(error)
      })
      .finally( () => {
      })

    }, 1000)
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image src={logo_depen} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate('/clients')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#555" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
              </svg>
              <span className="ms-1 fw-bolder">Clientes</span>
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/accounts')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#555" className="bi bi-clipboard-data" viewBox="0 0 16 16">
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z"/>
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
              </svg>
              <span className="ms-1 fw-bolder">Contas</span>
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/transactions')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#555" className="bi bi-person-badge" viewBox="0 0 16 16">
                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
              </svg>
              <span className="ms-1 fw-bolder">Transações</span>
            </Nav.Link>
          </Nav>
          <NavDropdown title={<DropTitle text={ dataUser ? dataUser.fullName : 'Visitante' } />} id="navbarScrollingDropdown" className="m-5">
              <NavDropdown.Item href="#" className="m-0">{ dataUser ? dataUser.email : 'visitante@gmail.com'}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => logout() } className="m-0">Sair</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;