import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();

  const [ task, setTask ] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => setTask({...task, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    navigate('/')
  };

  return (
    <Grid container direction='column' alignItems="center" justifyContent='center'>
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ 
            backgroundColor: '#1e272e',
            padding: '1rem'
          }}
        >

          <Typography variant='5' textAlign='center' color='white'>Create Task</Typography>
          <CardContent>
            <form onSubmit={handleSubmit} >

              <TextField
                variant='filled'
                label='Write your title'
                sx={{
                  display: 'block',
                  margin: '0.5rem 0'
                }}
                name='title'
                inputProps={{ style: {color: "white"} }}
                InputLabelProps={{ style: {color: "white"} }}
                onChange={handleChange}
              />
              <TextField
                variant='filled'
                label='Write your description'
                multiline
                rows={4}
                sx={{
                  display: 'block',
                  margin: '0.5rem 0'
                }}
                name='description'
                inputProps={{ style: {color: "white"} }}
                InputLabelProps={{ style: {color: "white"} }}
                onChange={handleChange}
              />
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>

            </form>
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm;
