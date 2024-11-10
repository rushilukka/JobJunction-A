import React, { useState, useEffect } from 'react';
import { Col, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwtDecode';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const IncomingRequest = () => {
  const token = cookies.get('access_token_worker');
  const token_decode = jwtDecode(token);
  const taskerId = token_decode.taskerId;
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://newjobjunction.onrender.com/workers/requests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.serviceRequests || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    const intervalId = setInterval(fetchTasks, 60000);
    return () => clearInterval(intervalId);
  }, [taskerId]);

  const handleAccept = async (taskId) => {
    try {
      const response = await fetch(' https://newjobjunction.onrender.com/service-requests/accept', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          
        },
        body: JSON.stringify({ workerId:taskerId,requestId: taskId }),
      });
      if (!response.ok) {
        throw new Error('Failed to confirm task');
      }
      navigate('/taskerprofile');
    } catch (error) {
      console.error('Error confirming task:', error);
    }
  };

  

  return (
    <div className="container-fluid text-white justify-content-md-center my-sm-5 py-4">
      <Button className="btn btn-info border-rounded mb-3" onClick={() => { navigate('/taskerprofile') }}>
        Back
      </Button>
      <h2 className="mb-4 text-center">New Requests</h2>
      {tasks.length === 0 ? (
        <Alert variant="info" className="text-center">
          No incoming requests at the moment.
        </Alert>
      ) : (
        tasks.map((task) => (
          <Col key={task.request_id}>
            <div className="card p-4 mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h2 className="mb-4 text-center">Incoming Request</h2>
              <p><strong>Task Type:</strong> {task.work_type}</p>
              <p><strong>Request Date:</strong> {new Date(task.request_date).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {task.time_slot}</p>
              <p><strong>Area:</strong> {task.area}</p>
              <p><strong>City:</strong> {task.city}</p>
              <p><strong>User Name:</strong> {task.user_name}</p>
              <p><strong>Phone:</strong> {task.user_phone}</p>
              <p><strong>Payment Type:</strong> {task.payment_type}</p>
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success me-2" onClick={() => handleAccept(task.request_id)}>Accept</button>
                
                
              </div>
            </div>
          </Col>
        ))
      )}
    </div>
  );
};

export default IncomingRequest;
