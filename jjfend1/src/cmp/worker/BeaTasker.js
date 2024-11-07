import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const BeaTasker = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [popupContent,setPopupContent] = useState('');
  const [showPopup,setShowPopup] = useState(false);
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    area: '',
    worktype: '',
    city: 'Rajkot'
  })
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (e) =>{
    setFormData ({...formData,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
     // Form validation checks
     if (isSignup) {
      if (!formData.name.trim()) {
        alert('Please enter your name.');
        return;
      }
      if (!formData.phone.trim()) {
        alert('Please enter your phone number.');
        return;
      }
      if (!formData.area.trim()) {
        alert('Please select an area.');
        return;
      }
      if (!formData.worktype.trim()) {
        alert('Please select a work type.');
        return;
      }
      if (!formData.city.trim()) {
        alert('Please enter your city.');
        return;
      }
      if (!/^\d{10}$/.test(formData.phone.trim())) {
        alert('Phone number must be exactly 10 digits long.');
        return;
      }
    }
    if (!formData.email.trim()) {
      alert('Please enter your email.');
      return;
    }
    if (!formData.password.trim()) {
      alert('Please enter a password.');
      return;
    }
    if (formData.password.trim().length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      alert('Please enter a valid email.');
      return;
    }

  
    try {
      const response = await fetch(isSignup ? 
        'https://newjobjunction.onrender.com/workers/signup' 
        
        :
        
        'https://newjobjunction.onrender.com/workers/login'
         
         , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 201) {

        // cookies.set('access_token', data.token, { path: '/' });
        // navigate('/Userhome');

        setPopupContent("Signup successful!");
        setShowPopup(true);
        setIsSignup(false);
        navigate('/BeaTasker');
      } else if (response.status === 400) {
        setPopupContent("Tasker Already Exists. Please use a different email.");
        setShowPopup(true);
        setIsSignup(true);
        navigate('/BeaTasker');
      } else if (response.status === 500) {
        setPopupContent("Server Error");
        setShowPopup(true);
        setIsSignup(true);
        navigate('/BeaTasker');
      } else if (response.status === 401) {
        setPopupContent("Invalid Credentials");
        setShowPopup(true);
        setIsSignup(false);
        navigate('/BeaTasker');
      } else if (response.status === 200) {
        cookies.set('access_token_worker', data.token, { path: '/' });
        navigate('/taskerprofile');
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="container-fluid bg-dark text-black" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={toggleForm} className='btn btn-outline-light mb-3'>{isSignup ? 'Switch to Login' : 'Switch to Signup'}</button>
      {isSignup ? (
        <>
          <h1 className="font-weight-bold text-white">Sign Up</h1>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ width: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullName" name='name' placeholder="Full Name" onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input type="email" className="form-control" id="email" placeholder="E-Mail" name='email' onChange={handleChange}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={handleChange}/>
              </div>
              <div className="col-md-12">
                <label htmlFor="Pno" className="form-label">Phone No.</label>
                <input type="text" className="form-control" id="Pno" placeholder="Phone No."  name='phone'onChange={handleChange} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="area" className="form-label">Area</label>
                <select  className="form-control form-select" id="area" placeholder="Area" name='area' onChange={handleChange} value={formData.area}>
                <option value="">Select One</option>
                  <option value="Shyamnagar">Shyamnagar </option>
                  <option value="Railnagar">Railnagar </option>
                  <option value="Bhagvatipara">Bhagvatipara</option>
                  <option value="Morbi Road">Morbi Road </option>
                 </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="task" className="form-label">Select Task</label>
                <select  className="form-control form-select" id="worktype" placeholder="worktype" name='worktype' onChange={handleChange} value={formData.worktype}>
                <option value="">Select One</option>
          
          {/* Assembly */}
          <option value="painting">painting</option>
          {/* Mounting */}
          <option value="carpentry">carpentry</option>
           
          </select>
                
              </div>
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
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ width: '50vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
  </div>
            
  <button type="submit" className="btn btn-primary">Login</button>
  <Link to='/' className='text-decoration-none mt-3 mx-3'>
    <button type="button" className="btn btn-secondary">Back</button>
  </Link>
</form>

        </>
      )}
      {showPopup && (
  <div className="popup-overlay position-fixed  top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 9999 }}>
    <div className="popup bg-secondary text-dark rounded p-4">
      <div className="popup-content">
        <p>{popupContent}</p>
        <button className="btn btn-danger" onClick={() => setShowPopup(false)}>Close</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default BeaTasker;
