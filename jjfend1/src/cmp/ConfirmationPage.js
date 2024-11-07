import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { responseData } = location.state || {};

  // Destructure necessary fields from responseData
  const {
    serviceRequest: {
      request_id,
      user_name,
      user_phone,
      email,
      area,
      work_type,
       time_slot,
      payment_type,
      address,
      city,
    } = {},
  } = responseData || {};

  return (
    <div className="bg-light py-4 min-vh-100 d-flex align-items-center bg-dark text-white">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <Row className="mt-0 justify-content-center">
        <Col className='mt-0' xs={12} md={10} lg={10} xl={12}> {/* Wider on md, lg, and xl screens */}
  {/* Your content here */}
         <div className="text-center">
            <div className="text-center">
  <h2>Booking Request Received</h2>
  <p className="mt-3">Thank you for booking our service!</p>
  <p>Your booking request is in progress.</p>
  <p>You will receive a confirmation email within a few hours.</p>
</div>
<div className="mt-5">
  <h4>Booking Details:</h4>
  {/* Booking details go here */}
</div>       <div className="p-3 bg-secondary rounded">
                <p><strong>Request ID:</strong> {request_id}</p>
                <p><strong>Client Name:</strong> {user_name}</p>
                <p><strong>Phone Number:</strong> {user_phone}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Service Type:</strong> {work_type}</p>
                <p><strong>Service Area:</strong> {area}, {city}</p>
                <p><strong>Address:</strong> {address}</p>
                </div>
            </div>

            <Link to='/Userhome' className='text-decoration-none mt-3 mx-3'>
              <button type="button" className="btn btn-secondary mt-4">Explore Other Services</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConfirmationPage;
