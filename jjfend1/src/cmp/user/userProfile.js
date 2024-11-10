import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import logo from '../../logo.jpeg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';

import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
const cookies = new Cookies();



const UserProfile = () => {

  const token  = cookies.get('access_token');
  const token_decode = jwtDecode(token);
  const userId = token_decode.userId;
  // const jwtToken = localStorage.getItem("jwtToken");


  const Navigate = useNavigate();
  // const [cookies] = useCookies(['token']);
  const [username, setUserName] = useState('');
  const [userphone, setUserPhone] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userarea, setUserArea] = useState('');
  const [userpassword, setUserPassword] = useState('');
  // const userId = cookies.token.userId;

  

  // const deleteYesterdayEntries = async () => {
  //   try {
  //     await fetch('http://localhost:4000/deleteYesterdayEntries', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ currentDate: new Date() })
  //     });
  //   } catch (error) {
  //     console.error('Error deleting yesterday entries:', error);
  //   }
  // };
  // useEffect(() => {
  //   if (cookies.token) {
  //     const userData = cookies.token;
  //     setUserName(userData.name);
  //     setUserPhone(userData.phone);
  //     setUserEmail(userData.email);
  //     setUserArea(userData.area);
  //     setUserPassword(userData.password);
      
  //     // Set profileData after updating state variables
  //     setProfileData({
  //       name: userData.name,
  //       email: userData.email,
  //       area: userData.area,
  //       phone: userData.phone,
  //       password: userData.password
  //     });
  //   }
    
  //   deleteYesterdayEntries();
  // }, [cookies.token]);

  // const [profileData, setProfileData] = useState({
  //   name: username,
  //   email: useremail,
  //   area: userarea,
  //   phone: userphone,
  //   password: userpassword, 
  // });

  


  // const [isEditing, setIsEditing] = useState(false);

   

  

   

  
 

  

  return (
    <>
    
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/UserHome" className='text-decoration-none text-white'>
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
        <Navbar.Toggle aria-controls="navbarScroll"  />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Link to="/Userhome" className="btn btn-secondary">
            Back
          </Link>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <div className="container-fluid bg-dark text-black" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
     
 
<h2 className='text-white'>User Id : 
            <div className="px-5">
            {token_decode.userId}  
            </div>
             </h2>

      
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/userpending',{ state:userId})}}>
      <h1 className="display-3 text-white py-4">Pending Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/usercompleted',{ state:userId})}}>
      <h1 className="display-3 text-white py-4">Completed Work</h1>
      </Button>
      
      </div>

    </>

  );
};

export default UserProfile;
