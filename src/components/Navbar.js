import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { initial_path } from "../db";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              <Link
                to={initial_path}
                style={{ textDecoration: "none", color: "white" }}
              >
                PERN Stack
              </Link>
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(`${initial_path}/tasks/new`)}
            >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
