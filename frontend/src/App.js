import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/questions/Home';
import Quiz from './components/questions/Quiz';
import ProtectedRoute from './components/ProtectedRoute';
import Results from './components/results/Results';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<ProtectedRoute />}>

            <Route path='/' element={<Home />} />
            <Route path='/allquiz' element={<Quiz />} />
            <Route path='/results/:userId' element={<Results/>} />

          </Route>
          
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
