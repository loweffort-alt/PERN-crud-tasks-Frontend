import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../db";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await fetch(`${backend_url}/tasks`);
      const data = await res.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      //console.log(error);
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(tasks);
    if (tasks.length === 0) {
      loadTasks();
    }
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await fetch(`${backend_url}/tasks/${id}`, {
      method: "DELETE",
    });

    loadTasks();
  };

  return (
    <>
      <h1>Task List</h1>
      {tasks.length === 0 ? (
        <p> No data :c </p>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.title}
            style={{
              marginBottom: "0.5rem",
              backgroundColor: "#1e272e",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography color="white">{task.title}</Typography>
                <Typography color="white">{task.description}</Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(`/tasks/new/${task.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={(e) => handleDelete(e, task.id)}
                  style={{ marginLeft: ".5rem" }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default TaskList;
