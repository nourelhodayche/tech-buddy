import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTutorialById, toggleFavorite } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Star } from 'lucide-react';

const TutorialDetail = () => {
  const { id } = useParams();
  const [tutorial, setTutorials] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isFavorite = user?.favorites?.some(fav => fav._id === id || fav === id);

  const handleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await toggleFavorite(id);
      setUser(res.data); // Update user context with new favorites
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  useEffect(() => {
    getTutorialById(id)
      .then(res => { setTutorials(res.data); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <p className="text-3xl text-primary-600 font-bold">Loading... ⏳</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 py-16 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <Link to="/tutorials" className="inline-flex items-center text-primary-600 font-bold text-2xl mb-8 hover:text-primary-700 hover:-translate-x-1 transition-all">
          ← Back to tutorials
        </Link>
        <div className="flat-card p-10 md:p-14">
          <span className={`text-lg font-bold px-4 py-2 rounded-xl inline-block mb-6 ${tutorial.level === 'Important' ? 'bg-orange-100 text-orange-800 border-2 border-orange-200' : 'bg-primary-100 text-primary-800 border-2 border-primary-200'}`}>
            {tutorial.level}
          </span>
          
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-5xl font-extrabold text-secondary-900 leading-tight pr-4">{tutorial.title}</h1>
            <button 
              onClick={handleFavorite}
              className={`p-4 rounded-2xl border-2 transition-all shrink-0 ${isFavorite ? 'bg-yellow-100 text-yellow-500 border-yellow-200 hover:bg-yellow-200' : 'bg-secondary-100 text-secondary-400 border-secondary-200 hover:bg-yellow-50 hover:text-yellow-500'}`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star size={36} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          
          <p className="text-secondary-800 text-2xl mb-12 leading-relaxed font-medium">{tutorial.description}</p>
          
          <div className="bg-secondary-50 border-4 border-secondary-100 rounded-3xl p-10">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
              <span>📋</span> Step-by-Step Guide
            </h2>
            <div className="flex flex-col gap-8">
              {tutorial.content.split('.').filter(s => s.trim()).map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="bg-primary-600 text-white rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <p className="text-secondary-900 text-2xl pt-2 font-medium leading-relaxed">{step.trim()}.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;