import React from 'react'
import styles from '../styles/Home.module.css'
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'
import { Container, Nav } from 'react-bootstrap'

const NavBar = () => {
  return (<>
    <Navbar fixed='top' collapseOnSelect expand="lg"  className={styles.navbar}>
  <Container fluid className='mx-1'>
  <Navbar.Brand href="/" >Hamara Logo</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <nav className={styles.nav}>
      
      <Link href="/">Home</Link>
      <Link href="/homestayForm" passHref>register your home</Link>
      <Link href="/about">About</Link>
      
      </nav>
    
   
    
      <b><Link href="/login" style={{fontSize:'large'}}>LOGIN</Link></b>
  </Navbar.Collapse>
  </Container>
</Navbar>
</>
  )
}

export default NavBar