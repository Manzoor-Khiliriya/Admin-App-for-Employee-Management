import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Home from './screen/Home';
import Employees from './components/employees/Employees';
import CreateEmployee from './components/createEmployee/CreateEmployee';
import UpdateEmployee from './components/updateEmployee/UpdateEmployee';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/create-employee' element={<CreateEmployee />} />
        <Route path='/update-employee/:id' element={<UpdateEmployee />} />
      </Routes>
    </>
  );
}

export default App;
