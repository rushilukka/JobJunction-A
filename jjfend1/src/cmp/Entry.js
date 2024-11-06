import React,{useEffect,useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
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

const Entry = () => {
     

  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  cookies.remove('access_token');
  const tokenx = cookies.get('access_token'); // Get the token from cookies
  if(tokenx)  navigate('/Userhome');
  


  useEffect(() => {
    const login = async () => {
      try {
          // Perform login and store token in both state and cookies
          const token = await handleLogin("harshsoni9684@gmail.com", "password");
          setToken(token);
          cookies.set('access_token', token); // Store token in cookies
          const decoded = jwtDecode(token);
          setDecodedToken(decoded);
     
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    login();
  }, []);
  if (error) return <div>Error: {error.message}</div>;

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
                      <option value="IMA">IMA </option>
                      <option value="Kabirvan">Kabirvan </option>
                      <option value="Ram Park">Ram Park </option>
                      <option value="Redcross Sadar">Redcross Sadar </option>
                      <option value="Redcross Ramnathpara">Redcross Ramnathpara</option>
                      <option value="Nana Mauva">Nana Mauva</option>
                      <option value="Aambedkarnagar">Aambedkarnagar </option>
                      <option value="Vijayplot">Vijayplot </option>
                      <option value="Nandanvan">Nandanvan </option>
                      <option value="Mavdi">Mavdi </option>
                      <option value="Narayannagar">Narayannagar </option>
                      <option value="AHMP">AHMP </option>
                      <option value="Champaknagar">Champaknagar </option>
                      <option value="Hudko">Hudko </option>
                      <option value="Pranami Chowk">Pranami Chowk </option>
                      <option value="New Raghuvir">New Raghuvir </option>
                      <option value="Kothariya">Kothariya </option>
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
