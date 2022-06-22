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
            setUserData={setUserData}/>
            }>
            </Route>
            <Route path='/dashboard' 
            element={
              <RequiredAuth isLoggedIn={isLoggedIn}>
                <Dashboard userData={userData}/>
              </RequiredAuth>
            }/>
          </Routes>
        </Router>
      </div> 
  );
}

export default App; 

