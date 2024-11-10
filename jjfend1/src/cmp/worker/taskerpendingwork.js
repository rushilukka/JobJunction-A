import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const TaskerPendingWork = () => {
    const token = cookies.get('access_token_worker');
    const token_decode = jwtDecode(token);
    const workerId = token_decode.taskerId;
  
    const [pendingTasks, setPendingTasks] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchPendingTasks = async () => {
        try {
            const response = await fetch('https://newjobjunction.onrender.com/workers/pending-requests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPendingTasks(data.taskerPendingTasks || []);
        } catch (error) {
            console.error('Error fetching pending tasks:', error);
            setError('Failed to fetch pending tasks. Please try again.');
        }
    };

    const markTaskCompleted = async (requestId) => {
        try {
            const response = await fetch('https://newjobjunction.onrender.com/workers/mark-completed', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ workerId, requestId })
            });
            if (!response.ok) {
                throw new Error('Failed to mark task as completed');
            }
            fetchPendingTasks(); // Refresh pending tasks after marking as completed
        } catch (error) {
            console.error('Error completing task:', error);
            setError('Failed to complete the task. Please try again.');
        }
    };

    const completeTask = (task) => {
        // Get the requestId for the task and call markTaskCompleted
        const requestId = task.requestId;
        markTaskCompleted(requestId);
    };

    useEffect(() => {
        fetchPendingTasks();
        const intervalId = setInterval(fetchPendingTasks, 10000); // Reload every 10 seconds
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container style={{ padding: '2rem' }}>
          <h1 className="display-3 text-white py-4">Pending Work</h1>
            <Button className="btn btn-dark border-rounded mb-3" onClick={() => { navigate('/taskerprofile') }}>
                Back
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {pendingTasks.length === 0 && !error && <Alert variant="info">No pending tasks found.</Alert>}
            {pendingTasks.map((task, index) => (
                index % 4 === 0 && (
                    <Row key={index} className="mb-4">
                        {pendingTasks.slice(index, index + 4).map((task, subIndex) => (
                            <Col lg={3} md={6} sm={12} key={subIndex} className="mb-4">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{task.taskname}</h5>
                                        <p className="card-text">Task Date: {task.taskdate.substring(0, 10)}</p>
                                        <p className="card-text">Task Slot: {task.taskslot}</p>
                                        <p className="card-text">User Name: {task.username}</p>
                                        <p className="card-text">User Phone: {task.userphone}</p>
                                        <p className="card-text">Task Price: {task.taskprice}</p>
                                        <p className="card-text">User Address: {task.useraddress}</p>
                                        <Button className="btn btn-primary mr-2" onClick={() => completeTask(task)}>Complete</Button>
                                        <Button className="btn btn-danger" onClick={() => navigate("/taskercancel", { state: { taskname: task.taskname, taskdate: task.taskdate, taskslot: task.taskslot, userId: task.userId, taskerId: task.taskerId, taskprice: task.taskprice, username: task.username, userphone: task.userphone, useraddress: task.useraddress } })}>
                                            Cancel
                                        </Button>
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

export default TaskerPendingWork;
