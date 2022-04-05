import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
              color: 'white'
            }}
          >
            <CardContent style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>

              <div>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </div>
              <div>
                <Button variant='contained' color='inherit' onClick={ () => console.log('EDitando') }>Edit</Button>
                <Button variant='contained' color='warning' onClick={ (e) => handleDelete(e, task.id) }>Delete</Button>
              </div>

            </CardContent>
          </Card>
        ))
      }
    </>
  )
}

export default TaskList;
