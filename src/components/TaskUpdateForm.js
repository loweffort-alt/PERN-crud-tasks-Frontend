import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backend_url, initial_path } from "../db";

const TaskUpdateForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();

  const getSingleTask = async () => {
    const res = await fetch(`${backend_url}/tasks/${id}`);
    const data = await res.json();
    setTask({ ...task, title: data.title, description: data.description });
  };

  useEffect(() => {
    getSingleTask();
  }, []);

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(`${backend_url}/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);

    navigate(initial_path);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Create Task
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                sx={{
                  display: "block",
                  margin: "0.5rem 0",
                }}
                name="title"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                value={task.title}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: "0.5rem 0",
                }}
                name="description"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                value={task.description}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TaskUpdateForm;
