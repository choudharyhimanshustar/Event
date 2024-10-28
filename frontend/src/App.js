import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Intro from './components/Intro';
import AddEvent from './components/AddEvent';
import Edit from './components/Edit'
function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/AddEvent' element={<AddEvent />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/Edit/:id' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
