import React, { useState, useEffect } from 'react';
import {  Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img1 from '../../images/img1.jpeg';
import img1_QR from '../../images/img1_QR.jpg'
import logo from '../../logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies  = new Cookies();

const taskerId = 1;
  
const TaskerProfile = () => {
  // const [cookies] = useCookies(['taskertoken']);
  // const [taskername, setTaskerName] = useState('');
  // const [taskerphone, setTaskerPhone] = useState('');
  // const [taskeremail, setTaskerEmail] = useState('');
  const [taskerarea, setTaskerArea] = useState('');
  const [taskertask, setTaskerTask] = useState('');
  // const [taskerpassword, setTaskerPassword] = useState('');
  // const taskerId = cookies.taskertoken.taskerId;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    area: '',
    phone: '',
    password: '', 
    task: ''
  });
  let token;
  const Navigate = useNavigate()

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
  token = jwtDecode(cookies.get('access_token_worker')); // Get the token from 
  useEffect(() => {
    token = cookies.get('access_token_worker'); // Get the token from cookies
  if (cookies.get('access_token_worker')) {
      // const taskerData = jwtDecode(cookies.get('access_token_worker'));

      // setTaskerName(taskerData.name);
      // setTaskerPhone(taskerData.phone);
      // setTaskerEmail(taskerData.email);
      // setTaskerPassword(taskerData.password);
      // Set profileData after updating state variables
      
      
      // setTaskerArea(taskerData.area);
      // setTaskerTask(taskerData.task);
      
      // setProfileData({
      //   name: taskerData.name || '',
      //   email: taskerData.email || '',
      //   area: taskerData.area || '',
      //   phone: taskerData.phone || '',
      //   password: taskerData.password || '',
      //   task: taskerData.task || ''
      // });
    }
   
    // deleteYesterdayEntries();
  
  }, []);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Form validation
    if (!profileData.name.trim() || !profileData.email.trim() || !profileData.area.trim() || !profileData.phone.trim() || !profileData.password.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    if (profileData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (profileData.phone.length !== 10) {
      alert('Phone number must be 10 digits.');
      return;
    }

    // Save changes
    if(isEditing){
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/updatetasker',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching tasks', error);
        }
      };
      fetchData();
    }
    
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset form fields to original values
    setIsEditing(false);
  };

  return (
    <>
    <Navbar expand="lg" bg="secondary" variant="dark">
      <Container fluid>
      <Navbar.Brand>
        <Link to="/taskerprofile" className='text-decoration-none text-white'>
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
          <Link to='/' className='text-decoration-none'>
            <button type="submit" className="btn btn-danger btn-lg">LogOut</button></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <div className="container-fluid bg-dark text-black" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div  className="user-profile-form bg-dark text-light rounded text-center col-7 ">
     
     <div className="row mb-3">
     <div className="col-md-6 p-5">
     
          <h2>Tasker Id
            <div className="mx-5 mt-3">
              {token.workerId}       
             </div>
             </h2>
        </div>   

        {/* _________________________________________________ */}
        <div className="col-md-6 p-5">
         <h2 >Pay Here</h2>
      <img className="m-3  img-fluid img-thumbnail " //className='d-flex justify-content-end'
          src={img1_QR} // Replace with actual image URL
          alt="Profile" 
          style={{ height: '300px',width:"300px" }}
          />
    </div> 
      </div>
     
    </div>
    <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/incomingrequest',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">Check Incoming Booking Requests</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskerpending',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">See Pending Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskercompleted',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">See Completed Work</h1>
      </Button>
      <div className="w-100 border-top my-3"></div>
      <Button className='btn btn-dark border-rounded' onClick={()=>{ Navigate('/taskerincompleted',{ state:taskerId})}}>
      <h1 className="display-3 text-white py-4">Check Incompleted Work</h1>
      </Button>   
    </div>
    <footer className="bg-secondary border-top  text-center text-lg-start">
  <div className="text-center p-3 bg-dark">
    © 2024 Copyright:
    <a className="text-body" href="/"><span className='text-white'> JobJunction.com  Contact Us: 8320265766</span></a>
  </div>
</footer>
    </>
  );
};

export default TaskerProfile;
