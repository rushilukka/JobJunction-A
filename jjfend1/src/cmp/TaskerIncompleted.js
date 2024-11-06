import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskerInCompletedWork = () => {
    const [incompletedTasks, setInCompletedTasks] = useState([]);
    const location = useLocation();
    const taskerId = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInCompletedTasks = async () => {
            try {
                const response = await fetch('http://localhost:4000/taskerincompleted', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ taskerId })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInCompletedTasks(data.taskerInCompletedTasks || []);
            } catch (error) {
                console.error('Error fetching completed tasks:', error);
            }
        };

        fetchInCompletedTasks();
    }, [taskerId]);

    return (
        <Container>
            <h1 className="display-3 text-white py-4">Incompleted Work</h1>
            <Button className="btn btn-dark border-rounded my-2" onClick={() => { navigate('/taskerprofile') }}>
                Back
            </Button>
            {incompletedTasks.length === 0 && (
                <Alert variant="info" className="my-4">
                    No incompleted tasks found.
                </Alert>
            )}
            {incompletedTasks.map((task, index) => (
                index % 4 === 0 && (
                    <Row key={index} className="mb-4">
                        {incompletedTasks.slice(index, index + 4).map((task, subIndex) => (
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
                                        <button
                                            className={`btn ${task.review === 'YES' ? 'btn-secondary' : 'btn-primary'}`}
                                            onClick={() => {
                                                if (task.review === 'NO') {
                                                    console.log(task.review)
                                                    navigate("/taskerincompreviewform", { state: task });
                                                }
                                            }}
                                            disabled={task.review === 'YES'}
                                        >
                                            {task.review === 'NO' ? 'Give Reason' : 'Already Reviewed'}
                                        </button>
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

export default TaskerInCompletedWork;
