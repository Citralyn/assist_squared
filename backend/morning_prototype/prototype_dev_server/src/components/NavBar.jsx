import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../../styles/NavBar.module.css';

import { Outlet } from "react-router";

export default function NavBar() {
  return (
    <>
    <Navbar expand='false' fixed="top" variant="dark" className={styles.nav}>
       <div className={styles.logoContain}>
        <img className={styles.logo} src="logo.svg" alt="anteater with roman numeral two logo"></img>
        <Navbar.Brand href="/">ASSIST²</Navbar.Brand>
        </div>
        <Navbar.Toggle className={styles.navItem} aria-controls="offcanvasNavbar-expand-${expand}"/>
        <Navbar.Collapse id="offcanvasNavbar-expand-${expand}">
          <Nav style={{float: "right", padding: 12, }}>
            <Nav.Link className='text-light' href="/assist">Assist</Nav.Link>
            <Nav.Link className='text-light' href="/peter">Resources</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Outlet />
    </>
  );
}
