import React,{useEffect,useState} from 'react';
// import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 
import logo from './logo.jpeg';
import project1 from './images/project1.jpeg'
import project2 from './images/project2.jpg'
import project3 from './images/project3.jpg'
import project4 from './images/project4.jpg'
import project5 from './images/project5.jpg'
import project6 from './images/project6.webp'
import project7 from './images/project7.jpg'
import project8 from './images/project8.jpeg'
import {Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
const cookies = new Cookies();

async function handleLogin(email, password) {
  try {
      const response = await fetch('https://newjobjunction.onrender.com/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              password: password
          }),
      });

      if (!response.ok) {
          throw new Error('Login failed');
      }

      const data = await response.json();

      if (data.token) {
          cookies.set('access_token', data.token, {
              path: '/',
              secure: true,
              sameSite: 'strict'
          });
          return data.token;
      } else {
          throw new Error('Token not received');
      }
  } catch (error) {
      console.error('Error during login:', error);
      throw error;
  }
}



function Userhome() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const login = async () => {
          try {
              setLoading(true);
              const token = await handleLogin("harshsoni9684@gmail.com", "password");
              setToken(token);
              const decoded = jwtDecode(token);
              setDecodedToken(decoded); // Store decoded token data in state
          } catch (error) {
              setError(error);
          } finally {
              setLoading(false);
          }
      };

      login();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // const [key, setKey] = useState('');
  // const [tasks, setTasks] = useState([]);
  // const [filteredTasks, setFilteredTasks] = useState([]);

  return (
    <>
     <div className="bg-dark text-white">
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/" className='text-decoration-none text-white'>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            JobJunction
            </Link>
          </Navbar.Brand>
   
     
          <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
         
           <Link to='/Userhome' className='text-decoration-none'>
         
               <Button variant="btn btn-info btn-lg" className="mx-4">SignUp/Login</Button>
            </Link>

           <Link to='/BeaTasker' className='text-decoration-none'>
             
               <Button variant="btn btn-primary btn-lg" className="ms-2">Be a Tasker</Button> 
            </Link>
          
          
        </Navbar.Collapse>
       </Container>
    </Navbar>
    <div className="container-fluid bg-dark text-white">
      <div className="container">
         
        <div className="container-fluid bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-12">

          <div className="row m-5">
            <div className="col-12">
              <h1 className="display-3 my-4" style={{  textAlign: 'center', }}>Services</h1>
            </div>
          </div>
        <div className="container-fluid">
    
      <div style={{display:"flex",justifyContent:'center'}} className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {/* Card 1 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project1} className="card-img-top" alt="Card 1" />
            <div className="card-body">
              <h5 className="card-title">Furniture Assembly</h5>
              <p className="card-text">Prices starting at RS. 250</p>
              <Link to="/Entry" className="btn btn-primary">Book Now</Link>
            </div>
          </div>
        </div>
        {/* Repeat the above code for remaining cards */}
        {/* Card 2 */}
        <div className="col">
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <img src={project2} className="card-img-top" alt="Card 2" />
            <div className="card-body">
              <h5 className="card-title">Mount Art or Shelves</h5>
              <p className="card-text">Prices starting at RS. 700</p>
              <Link to="/Entry" className="btn btn-primary">Book Now</Link>
            </div>
          </div>
        </div>
       </div>



      <br></br>
      <div className="row">
          <div className="col-12">
            <h1 className="display-5 my-4 text-info" style={{ textAlign: 'center', }}>See what happy customers are saying about <span className='text-white'>JobJunction</span></h1>
          </div>
        </div>
        <div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {/* First Row */}
        <div className="col mb-4">
          <div className="card bg-dark text-white" >
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Elizabeth A.</h5>
              <p className="card-text">Vitalii assembled the Norli drawer chest for me in less than 30 minutes, and he assembled a metal wire shelving unit as well in about 10
minutes.Great Work!!</p>
              <div className="btn btn-primary">4.9/5</div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card bg-dark text-white" >
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Sabrina J.</h5>
              <p className="card-text">Michael did a great job helping us
install frameless glass hinged shower
doors with an unusual set up. He was
patient and willing to help figure it out
with us. Thank you Michael!</p>
              <div className="btn btn-primary">4.4/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white" >
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Jana R.</h5>
              <p className="card-text">I hired Joe to patch 2 holes on my
wall and 1 hole on my ceiling. Joe was
great with communication, was fast,
professional and did a fantastic job.</p>
              <div className="btn btn-primary">4.5/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Tiffany A.</h5>
              <p className="card-text">David did an awesome job
              assembling crib and dresser for
              nursery.</p>
              <div className="btn btn-primary">4.2/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">L.Amanda</h5>
              <p className="card-text">Aleksandr was fantastic! He came
              with all the equipment to do the job,
              even the hardware I didn't know I
              would need. He hung a heavy
              chandelier perfectly and fixed a
              cabinet to our wall.</p>
              <div className="btn btn-primary">4.7/5</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-dark text-white">
            <div className="card-body" style={{ width: '100%', height: '100%' }}>
              <h5 className="card-title">Elisa P.</h5>
              <p className="card-text">Jose fixed my AC drain line which
                                was clogging my master bathroom
                                sink. He was prompt, communicative,
                                and efficient. Highly recommend!</p>
              <div className="btn btn-primary">4.5/5</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-body-tertiary text-center text-lg-start">
  <div className="text-center p-3 bg-dark">
    © 2024 Copyright:
    <a className="text-body" href="/"><span className='text-white'> JobJunction.com <br></br>  Contact Us: 8320265766</span></a>
  </div>
</footer>
    </div>
    </div>
          </div>
        </div>
      </div> 
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Userhome;
