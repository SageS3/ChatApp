import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import EntryPage from './components/EntryPage';
import Dashboard from './components/Dashboard';
import RequiredAuth from './components/config/RequiredAuth'; 

function App() {    
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<object>({})
  // user will be logged out because the default value of isLoggedIn is false.
  // when the component rerenders is then set to false.
  return (  
      <div className="App">   
        <Router>  
          <Routes>  
            <Route path='/' element={<EntryPage  
            setIsLoggedIn={setIsLoggedIn} 
            setUserData={setUserData} 
            isLoggedIn={isLoggedIn}
            /> 
            }>
            </Route>
            <Route path='/dashboard' 
            element={
              // <RequiredAuth isLoggedIn={isLoggedIn}>
              //   <Dashboard userData={userData}/>
              // </RequiredAuth> 
              <Dashboard userData={userData}/>
            }/>
          </Routes>
        </Router>
      </div> 
  );
}

export default App; 

