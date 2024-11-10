import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const TaskerCompletedWork = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const location = useLocation();
    const taskerId = location.state;
    const navigate = useNavigate();
    const token = cookies.get('access_token_worker');
    const token_decode = jwtDecode(token);
    const taskerId1 = token_decode.taskerId;
  
    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const response = await fetch(' https://newjobjunction.onrender.com/workers/compeleted-requests', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
               
                    },
                    // body: JSON.stringify({ taskerId }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCompletedTasks(data.taskerCompletedTasks || []);
            } catch (error) {
                console.error('Error fetching pending tasks:', error);
                // setError('Failed to fetch pending tasks. Please try again.');
            }

            
            // setCompletedTasks(data.taskerCompletedTasks || []);
        };

        fetchCompletedTasks();
    }, [taskerId]);

    return (
        <Container>
            <h1 className="display-3 text-white py-4">Completed Work</h1>
            <Button className="btn btn-dark border-rounded my-2" onClick={() => { navigate('/taskerprofile') }}>
                Back
            </Button>
            {completedTasks.length === 0 && (
                <Alert variant="info" className="my-4">
                    No completed tasks found.
                </Alert>
            )}
            {completedTasks.map((task, index) => (
                index % 4 === 0 && (
                    <Row key={index} className="mb-4">
                        {completedTasks.slice(index, index + 4).map((task, subIndex) => (
                            <Col lg={3} md={6} sm={12} key={subIndex} className="mb-4">
                                <div className="card" style={{ width: '100%', height: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{task.taskname}</h5>
                                        <p className="card-text">Task Date: {task.taskdate.substring(0, 10)}</p>
                                        <p className="card-text">Task Slot: {task.taskslot}</p>
                                        <p className="card-text">User Name: {task.username}</p>
                                        <p className="card-text">User Phone: {task.userphone}</p>
                                        <p className="card-text">Task Price: {task.taskprice}</p>
                                        <p className="card-text">User Address: {task.useraddress}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )
            ))}
        </Container>
    );
};

export default TaskerCompletedWork;
