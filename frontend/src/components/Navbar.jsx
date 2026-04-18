import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ZoomIn, ZoomOut, User, MonitorSmartphone } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [textSize, setTextSize] = useState(100);
  const { user } = useContext(AuthContext);
  
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    document.documentElement.style.fontSize = `${textSize}%`;
  }, [textSize]);

  const increaseText = () => setTextSize(prev => Math.min(prev + 10, 150));
  const decreaseText = () => setTextSize(prev => Math.max(prev - 10, 90));

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-secondary-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary-500 text-white p-2 rounded-xl">
            <MonitorSmartphone size={28} />
          </div>
          <span className="text-3xl font-extrabold text-secondary-800 tracking-tight">
            Tech<span className="text-primary-600">Buddy</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link 
            to="/tutorials" 
            className={`text-xl font-bold transition-colors ${isActive('/tutorials') ? 'text-primary-600' : 'text-secondary-800 hover:text-primary-600'}`}
          >
            Tutoriels
          </Link>
          <Link 
            to="/chatbot" 
            className={`text-xl font-bold transition-colors ${isActive('/chatbot') ? 'text-primary-600' : 'text-secondary-800 hover:text-primary-600'}`}
          >
            Assistant
          </Link>
          <Link 
            to="/quiz" 
            className={`text-xl font-bold transition-colors ${isActive('/quiz') ? 'text-primary-600' : 'text-secondary-800 hover:text-primary-600'}`}
          >
            Quiz
          </Link>
          <div className="flex items-center gap-2 bg-secondary-100 rounded-full px-2 py-1 ml-2">
            <button 
              onClick={decreaseText}
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-white rounded-full transition-colors"
              title="Decrease text size"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm font-bold text-secondary-700 select-none min-w-[3ch] text-center">{textSize}%</span>
            <button 
              onClick={increaseText}
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-white rounded-full transition-colors"
              title="Increase text size"
            >
              <ZoomIn size={20} />
            </button>
          </div>
          
          {user ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2 bg-secondary-900 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-primary-600 transition-colors ml-2 text-lg"
            >
              <User size={24} /> Profil
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-primary-700 hover:shadow transition-all ml-2 text-lg"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
