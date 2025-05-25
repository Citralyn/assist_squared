import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Outlet } from "react-router";

export default function NavBar() {
  return (
    <>
    <Navbar expand='false' className='bg-dark nav_bar'>
      <Container>
        <Navbar.Brand className='text-light' href="/">prototype navbar</Navbar.Brand>
        <Navbar.Toggle className='bg-light' aria-controls="collapser"/>
        <Navbar.Collapse id="collapser">
          <Nav style={{float: "right"}}>
            <Nav.Link className='text-light ' href="/assist">ASSIST</Nav.Link>
            <Nav.Link className='text-light' href="/peter">PETER</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
}
