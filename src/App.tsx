import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import EntryPage from './components/EntryPage';
import Dashboard from './components/Dashboard';
import RequiredAuth from './components/config/RequiredAuth'; 

function App() {    
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<object>({})
 
  return (  
      <div className="App">   
        <Router>  
          <Routes>  
            <Route path='/' element={<EntryPage  
            setIsLoggedIn={setIsLoggedIn} 
            isLoggedIn={isLoggedIn}
            /> 
            }>
            </Route>
            <Route path='/dashboard' 
            element={
              <RequiredAuth isLoggedIn={isLoggedIn} setUserData={setUserData}>
                <Dashboard userData={userData} setIsLoggedIn={setIsLoggedIn}/>
              </RequiredAuth> 
            }/>
          </Routes>
        </Router>
      </div> 
  );
}

export default App; 

