import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from './Loader'; // Import the Loader component
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
const cookies = new Cookies();


function BookingForm() {
  const token  = cookies.get('access_token_worker');
  const token_decode = jwtDecode(token);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    area: '',
    work_type: '',
    slot: '',
    date: '',
    price: '',
    userId: '',
    user_name: '',
    email: '',
    user_phone: '',
    city: '',
    payment_type: ''
  });


  const location = useLocation();
  const { taskName, taskPrice } = location.state;
  const [userId, setUserId] = useState(null);
  const [username, setUserName] = useState(null);
  const [userphone, setUserPhone] = useState(null);
  const [loading, setLoading] = useState(false); // State variable for loading status
  const [showAlert, setShowAlert] = useState(false); // State variable to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State variable for alert message

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

     // Form validation checks
     if (!formData.area || !formData.slot || !formData.date || !formData.address || !formData.user_name || !formData.email || !formData.user_phone) {
      setAlertMessage("Please fill in all fields.");
      setShowAlert(true); // Show the alert
      setLoading(false); // Stop loading
      return;
    }

    const requestBody = {
      address: formData.address,
      area: formData.area,
      work_type: taskName,
      slot: formData.slot,
      date: formData.date,
      price: taskPrice,
      userId: token_decode.userId,
      user_name: formData.user_name,
      email: formData.email,
      user_phone: formData.user_phone,
      city:'rajkot',
      payment_type:'online'
      };

    try {
      const response = await fetch('https://newjobjunction.onrender.com/services/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data); // Log the response to the console
        navigate('/Confirmation', { state: { responseData: data } });
      } else if (response.status === 405) {
        setAlertMessage(data.message);
        setShowAlert(true); // Show the alert
      } else if (response.status === 404) {
        setAlertMessage(data.message);
        setShowAlert(true); // Show the alert
      } else {
        setAlertMessage("Server error. Please try again later.");
        setShowAlert(true); // Show the alert
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage("An error occurred. Please try again later.");
      setShowAlert(true); // Show the alert
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date();
  const maxDate = new Date(today);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);
  maxDate.setDate(today.getDate() + 4);

  const formattedToday = minDate.toISOString().split('T')[0];
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

  return (
    <div className="container-fluid bg-dark text-black" style={{ height: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <h1 className="font-weight-bold text-white">Booking</h1>
      {loading && <Loader />} {/* Render the loader if loading */}
      
      
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ width: '100vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        
        {/* User Name Field */}
        <div className="mb-3">
          <label htmlFor="user_name" className="form-label">User Name</label>
          <input type="text" className="form-control" name="user_name" placeholder="User Name" onChange={handleChange} value={formData.user_name} required />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        </div>

        {/* User Phone Field */}
        <div className="mb-3">
          <label htmlFor="user_phone" className="form-label">User Phone</label>
          <input type="tel" className="form-control" name="user_phone" placeholder="User Phone" onChange={handleChange} value={formData.user_phone} required />
        </div>

        {/* Area Field */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">Area</label>
          <select className="form-control form-select" id="area" name="area" placeholder="Area" onChange={handleChange} value={formData.area} required>
            <option value="">Select One</option>
            <option value="Shyamnagar">Shyamnagar </option>
                  <option value="Railnagar">Railnagar </option>
                  <option value="Bhagvatipara">Bhagvatipara</option>
                  <option value="Morbi Road">Morbi Road </option>
                {/* Add other area options */}
          </select>
        </div>

        {/* Slot Field */}
        <div className="mb-3">
          <label htmlFor="slot" className="form-label">Slot</label>
          <select className="form-select" name="slot" onChange={handleChange} value={formData.slot} required>
            <option value=''>Select One</option>
            <option value="Morning (9 - 12 AM)">Morning (9 - 12 AM) </option>
            <option value="Afternoon (2 - 5 PM)">Afternoon (2 - 5 PM) </option>
            <option value="Evening (5 - 8 PM)">Evening (5 - 8 PM)</option>
          </select>
        </div>

        {/* Date Field */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" className="form-control" name="date" onChange={handleChange} value={formData.date} required min={formattedToday} max={formattedMaxDate} />
        </div>

        {/* Address Field */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea type="text" className="form-control" name="address" placeholder="Address" onChange={handleChange} value={formData.address} rows="3" required />
        </div>

        <button type="submit" className="btn btn-primary mx-1">Confirm</button>
        <Link to='/Userhome' className="btn btn-secondary">Back</Link>
      </form>
      
      {/* Show the alert box if showAlert is true */}
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
