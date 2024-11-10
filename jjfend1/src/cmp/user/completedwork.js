import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
const cookies = new Cookies();

const UserCompletedwork = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = cookies.get('access_token');
  const token_decode = jwtDecode(token);
  const userId = token_decode.userId;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch('https://newjobjunction.onrender.com/services/compeleted-requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.status === 404) {
          setErrorMessage('Sorry, there are no completed tasks available.');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data && data.userCompletedTasks) {
          const transformedTasks = data.userCompletedTasks.map(request => ({
            taskname: request.work_type,
            taskdate: request.request_date,
            taskslot: request.time_slot,
            taskername: request.user_name,
            taskerphone: request.user_phone,
            taskprice: request.payment_type,
            review: request.review, // Assuming 'review' holds if task is reviewed
            taskerId: request.user_id,
          }));

          setCompletedTasks(transformedTasks);
        } else {
          setCompletedTasks([]);
        }
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
        setErrorMessage('An error occurred while fetching completed tasks.');
      }
    };

    fetchCompletedTasks();
  }, [userId]);

  return (
    <Container fluid style={{ width: '100%', height: '100vh', padding: '5rem' }} className='bg-secondary'>
      <h1 className="display-3 font-bold py-4 text-dark">Completed Work</h1>
      <Button className='btn btn-dark border-rounded mb-3' onClick={() => navigate('/userprofile')}>
        Back
      </Button>

      {errorMessage && (
        <Alert variant="info" className="text-center text-dark mt-3">
          <h3>{errorMessage}</h3>
        </Alert>
      )}

      {completedTasks.length > 0 && completedTasks.map((task, index) => (
        index % 4 === 0 && (
          <Row key={index} className='mb-3'>
            {completedTasks.slice(index, index + 4).map((task, subIndex) => (
              <Col md={3} key={subIndex}>
                <Card className="mb-3" style={{ width: '100%', height: '100%', backgroundColor: '#f8f9fa' }}>
                  <div className="card-body">
                    <h5 className="card-title">{task.taskname}</h5>
                    <p className="card-text">Task Date: {task.taskdate.substring(0, 10)}</p>
                    <p className="card-text">Task Slot: {task.taskslot}</p>
                    <p className="card-text">Tasker Name: {task.taskername}</p>
                    <p className="card-text">Tasker Phone: {task.taskerphone}</p>
                    <p className="card-text">Task Price: {task.taskprice}</p>
                    <Button
                      className={`btn ${task.review === 'YES' ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => {
                        if (task.review === 'NO') {
                          navigate("/userreviewform", { state: task });
                        }
                      }}
                      disabled={task.review === 'YES'}
                    >
                      {task.review === 'NO' ? 'Give Review' : 'Already Reviewed'}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      ))}
    </Container>
  );
};

export default UserCompletedwork;
