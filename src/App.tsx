import './App.css'; 
// import {useState} from 'react' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
function App() {  

  return ( 
    <div className="App"> 
         
      <Router> 
        <Routes>  
          <Route path='/' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div> 
  );
}

export default App; 

// set up react router... 

// Configure the register form to direct to login form...  
  // Add an animation between the two forms 
  // Add an icon to allow user to toggle password visibility 
  // Add a way to verify email after user input is complete  

// Configure login form to direct to user 
