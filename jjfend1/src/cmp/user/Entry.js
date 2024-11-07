import React,{useEffect,useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import Cookies from 'universal-cookie';
 const cookies = new Cookies();

 

const Entry = () => {
   const navigate = useNavigate();
  const [popupContent, setPopupContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    password: '',
    phone: '',
    area: ''
  });
   const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSignup) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.phone.trim() || !formData.area.trim()) {
        setPopupContent('Please fill in all fields.');
        setShowPopup(true);
        return;
      }
      if (formData.password.length < 8) {
        setPopupContent('Password should be at least 8 characters long.');
        setShowPopup(true);
        return;
      }
      if (formData.phone.length !== 10) {
        setPopupContent('Phone number should be exactly 10 digits long.');
        setShowPopup(true);
        return;
      }
      if (!validateEmail(formData.email)) {
        setPopupContent('Please enter a valid email address.');
        setShowPopup(true);
        return;
      }
    }
     
    try {
      const response = await fetch(isSignup ? 'https://newjobjunction.onrender.com/auth/signup' : 'https://newjobjunction.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      let data = await response.json();
      
        if (response.status === 201) {
          setPopupContent("Sign up successful!");
          setShowPopup(true);
          setIsSignup(false);
          navigate('/Entry');
        } else if(response.status === 200){
          localStorage.setItem("jwtToken", data.token);
          cookies.set('access_token', data.token, { path: '/' });
          navigate('/Userhome');
        }   
      
        if (response.status === 400) {
          setPopupContent("User already exists. Please use a different email.");
          setShowPopup(true);
          setIsSignup(true);
          navigate('/Entry');
        } else if (response.status === 500) {
          setPopupContent("Server error");
          setShowPopup(true);
          setIsSignup(true);
          navigate('/Entry');
        } else if (response.status === 401) {
          setPopupContent("Invalid credentials");
          setShowPopup(true);
          navigate('/Entry');
        } else if (response.status === 210) {
          navigate('/adminpanel');
        }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validateEmail = email => {
    // Email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <>
      <div className='bg-dark text-white'>
        <Navbar bg="secondary" expand="lg" className="mb-4 text-white">
          <Container fluid>
            <Navbar.Brand className='text-white'><Link to='/' className='text-decoration-none text-white'>
              <img
                alt=''
                src="../logo.jpeg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              JobJunction
            </Link>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="container-fluid bg-dark text-black" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={toggleForm} className='btn btn-outline-light mb-3'>{isSignup ? 'Switch to Login' : 'Switch to Signup'}</button>
          {isSignup ? (
            <>
              <h1 className="font-weight-bold text-white">Sign Up</h1>
              <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="firstName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-Mail</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="E-Mail" onChange={handleChange} value={formData.email} />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="Pno" className="form-label">Phone No.</label>
                    <input type="text" className="form-control" id="Pno" name="phone" placeholder="Phone No." onChange={handleChange} value={formData.phone} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">Area</label>
                    <select className="form-control form-select" id="area" name="area" placeholder="Area" onChange={handleChange} value={formData.area} >
                      <option value="">Select One</option>
                      <option value="Shyamnagar">Shyamnagar </option>
                      <option value="Railnagar">Railnagar </option>
                      <option value="Bhagvatipara">Bhagvatipara</option>
                      <option value="Morbi Road">Morbi Road </option>
                       </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/' className='text-decoration-none mt-3 mx-3'>
                  <button type="button" className="btn btn-secondary">Back</button>
                </Link>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-weight-bold text-white">Login</h1>
              <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to='/' className='text-decoration-none mt-3 mx-3'>
                  <button type="button" className="btn btn-secondary">Back</button>
                </Link>
              </form>
            </>
          )}
          {showPopup && (
            <div className="popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
              <div className="popup bg-secondary text-dark rounded p-4">
                <div className="popup-content ">
                  <p>{popupContent}</p>
                  <button className="btn btn-danger" onClick={() => setShowPopup(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Entry;
