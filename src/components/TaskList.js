import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {

  const [ tasks, setTasks ] = useState([]);

  const loadTasks = async () => {
    const res = await fetch('http://localhost:4000/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect( () => {
    if (tasks.length === 0) {
      loadTasks()
    }
  }, [] );

  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE'
    });

    loadTasks();
  };
  
  return (
    <>
      <h1>Task List</h1>
      {
        tasks.map(task => (
          <Card 
            key={task.title} 
            style={{
              marginBottom: '0.5rem',
              backgroundColor: '#1e272e',
            }}
          >
            <CardContent style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>

              <div>
                <Typography color='white'>{task.title}</Typography>
                <Typography color='white'>{task.description}</Typography>
              </div>
              <div>
                <Button 
                  variant='contained' 
                  color='inherit' 
                  onClick={ () => navigate(`/tasks/new/${task.id}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant='contained' 
                  color='warning' 
                  onClick={ (e) => handleDelete(e, task.id) } 
                  style={{ marginLeft: '.5rem' }}
                >
                  Delete
                </Button>
              </div>

            </CardContent>
          </Card>
        ))
      }
    </>
  )
}

export default TaskList;
