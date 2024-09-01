import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

const Appbar = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/signin')
    }
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary p-4 shadow-md sticky top-0">
                <Container>
                    <Navbar.Brand href="#home"> <span className='text-black font-bold text-xl'>MCQ</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto" variant='pills' defaultActiveKey={'/'}>
                            <NavLink className="nav-link mx-3" to='/'><span className='text-black text-lg font-semibold'>Home</span></NavLink>
                            <NavLink className="nav-link mx-4 " to='/allquiz'><span className='text-black text-lg font-semibold'>Play The Quiz</span></NavLink>
                            <NavLink className="nav-link mx-4 " to={`/results/${user}`}><span className='text-black text-lg font-semibold'>Results</span></NavLink>

                        </Nav>
                        <Button onClick={logout}>Log Out</Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Appbar