import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import Quiz from './pages/Quiz';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:id" element={<TutorialDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;