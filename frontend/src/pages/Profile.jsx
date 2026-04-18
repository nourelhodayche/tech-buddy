import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl text-primary-600">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-16 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-extrabold text-secondary-900 mb-4">Hello, {user.username}! 👋</h1>
            <p className="text-2xl text-secondary-800 font-medium">Welcome to your personal dashboard.</p>
          </div>
          <button 
            onClick={logout}
            className="bg-red-50 text-red-700 px-8 py-4 rounded-2xl font-bold hover:bg-red-100 transition-colors border-4 border-red-200 text-xl shrink-0"
          >
            Log out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Favorites Section */}
          <div className="flat-card p-10">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 flex items-center gap-3">⭐ My Favorites</h2>
            {user.favorites && user.favorites.length > 0 ? (
              <div className="flex flex-col gap-6">
                {user.favorites.map(tutorial => (
                  <Link 
                    key={tutorial._id} 
                    to={`/tutorials/${tutorial._id}`}
                    className="block bg-white p-6 rounded-2xl border-4 border-secondary-200 hover:border-primary-400 hover:bg-primary-50 transition-all"
                  >
                    <h3 className="text-2xl font-bold text-secondary-900">{tutorial.title}</h3>
                    <p className="text-secondary-700 text-lg mt-2 font-medium">{tutorial.description?.substring(0, 60)}...</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border-4 border-secondary-200 text-center">
                <p className="text-secondary-800 text-xl font-medium mb-6">You don't have any favorite tutorials yet.</p>
                <Link to="/tutorials" className="text-primary-600 text-xl font-bold hover:underline">Discover tutorials</Link>
              </div>
            )}
          </div>

          {/* Scores Section */}
          <div className="flat-card p-10">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 flex items-center gap-3">🎮 My Quiz Scores</h2>
            {user.quizScores && user.quizScores.length > 0 ? (
              <div className="flex flex-col gap-6">
                {user.quizScores.slice().reverse().map((score, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-6 rounded-2xl border-4 border-secondary-200">
                    <div>
                      <p className="text-secondary-800 text-xl font-bold">On {new Date(score.date).toLocaleDateString('en-US')}</p>
                    </div>
                    <div className="text-3xl font-bold text-primary-600">
                      {score.score} <span className="text-xl text-secondary-500">/ {score.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border-4 border-secondary-200 text-center">
                <p className="text-secondary-800 text-xl font-medium mb-6">You haven't played any quizzes yet.</p>
                <Link to="/quiz" className="text-primary-600 text-xl font-bold hover:underline">Play a Quiz</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
