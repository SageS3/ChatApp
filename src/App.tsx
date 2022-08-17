import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css'; 
import EntryPage from './components/entrypage/EntryPage';
import Dashboard from './components/dashboard/Dashboard'
import RequiredAuth from './components/config/RequiredAuth'; 

function App() {
 
  return (  
      <div className="App">   
        <Router>  
          <Routes>  
            <Route path='/' element={<EntryPage/> 
            }>
            </Route>
            <Route path='/dashboard' 
            element={
            <RequiredAuth>
              <Dashboard/>
            </RequiredAuth> 
            }/>
          </Routes>
        </Router>
      </div> 
  );
}

export default App; 

