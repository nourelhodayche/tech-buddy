import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTutorials } from '../services/api';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTutorials()
      .then(res => { setTutorials(res.data); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <p className="text-3xl text-primary-600 font-bold">Loading tutorials... ⏳</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-secondary-900 mb-4">Tutorials</h1>
          <p className="text-2xl text-secondary-800 font-medium">Choose a topic to start learning!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutorials.map(tutorial => (
            <div key={tutorial._id} className="flat-card p-10 flex flex-col justify-between">
              <div>
                <span className={`text-lg font-bold px-4 py-2 rounded-xl inline-block mb-6 ${tutorial.level === 'Important' ? 'bg-orange-100 text-orange-800 border-2 border-orange-200' : 'bg-primary-100 text-primary-800 border-2 border-primary-200'}`}>
                  {tutorial.level}
                </span>
                <h2 className="text-3xl font-bold text-secondary-900 mb-4 leading-tight">{tutorial.title}</h2>
                <p className="text-secondary-800 text-xl mb-10 leading-relaxed line-clamp-3">{tutorial.description}</p>
              </div>
              <Link to={`/tutorials/${tutorial._id}`} className="inline-flex items-center justify-center w-full bg-secondary-900 text-white px-6 py-5 rounded-2xl text-xl font-bold hover:bg-primary-600 transition-colors">
                Read Tutorial →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;