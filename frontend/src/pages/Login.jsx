import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <div className="flat-card w-full max-w-lg p-10 md:p-14">
        <h1 className="text-4xl font-extrabold text-secondary-900 mb-8 text-center">Connexion</h1>
        {error && <div className="bg-red-50 text-red-800 p-4 rounded-2xl mb-6 border-2 border-red-200 text-xl font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-secondary-900 text-xl font-bold mb-3">Nom d'utilisateur</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-4 border-secondary-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-600 bg-white text-2xl text-secondary-900"
              required
            />
          </div>
          <div>
            <label className="block text-secondary-900 text-xl font-bold mb-3">Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-4 border-secondary-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-600 bg-white text-2xl text-secondary-900"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white font-bold text-2xl py-5 rounded-2xl mt-6 hover:bg-primary-700 transition-colors">
            Se connecter
          </button>
        </form>
        <p className="mt-8 text-center text-secondary-800 text-xl">
          Pas encore de compte ? <Link to="/register" className="text-primary-600 font-bold hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
