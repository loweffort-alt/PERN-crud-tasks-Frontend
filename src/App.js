import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskUpdateForm from './components/TaskUpdateForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Routes>
          <Route path='/' element={<TaskList/>}/>
          <Route path='/tasks/new' element={<TaskForm/>}/>
          <Route path='/tasks/new/:id' element={<TaskUpdateForm/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
