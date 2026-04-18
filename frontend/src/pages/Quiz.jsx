import { useEffect, useState, useContext } from 'react';
import { getQuizQuestions, saveQuizScore } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    getQuizQuestions()
      .then(res => { setQuestions(res.data); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, []);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].correctAnswer) setScore(prev => prev + 1);
  };

  const handleNext = async () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      if (user) {
        try {
          // Send score to backend
          const res = await saveQuizScore(score, questions.length);
          setUser(res.data); // Update context with new scores
        } catch (error) {
          console.error("Error saving score", error);
        }
      }
    }
    else { setCurrent(prev => prev + 1); setSelected(null); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <p className="text-3xl text-primary-600 font-bold">Loading quiz... ⏳</p>
    </div>
  );

  if (finished) return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center relative overflow-hidden">
      <div className="flat-card p-12 text-center max-w-xl w-full mx-4 relative z-10">
        <div className="text-7xl mb-8">🎉</div>
        <h1 className="text-5xl font-extrabold text-secondary-900 mb-6">Quiz Finished!</h1>
        <div className="bg-secondary-50 rounded-2xl p-8 mb-6 border-4 border-secondary-200">
          <p className="text-3xl text-secondary-700 mb-4 font-medium">Your score</p>
          <p className="text-6xl font-bold text-primary-600 mb-2">{score} <span className="text-4xl text-secondary-500">/ {questions.length}</span></p>
        </div>
        <p className="text-2xl font-bold text-secondary-800 mb-10">
          {score === questions.length ? '🌟 Perfect score!' : score >= questions.length / 2 ? '👍 Good job!' : '💪 Keep practicing!'}
        </p>
        <button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); }}
          className="w-full bg-secondary-900 text-white px-8 py-5 rounded-2xl text-2xl font-bold hover:bg-primary-600 transition-colors">
          Try again 🔄
        </button>
      </div>
    </div>
  );

  const question = questions[current];

  return (
    <div className="min-h-screen bg-secondary-50 py-16 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm mb-6 text-4xl">🎮</div>
          <h1 className="text-5xl font-extrabold text-secondary-900 mb-4">Quiz Time!</h1>
          <p className="text-center text-secondary-800 text-2xl mb-8 font-medium">Question {current + 1} of {questions.length}</p>
        </div>
        
        <div className="flat-card p-10 md:p-14">
          <h2 className="text-3xl font-bold text-secondary-900 mb-10 leading-relaxed">{question.question}</h2>
          <div className="flex flex-col gap-6 mb-10">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}
                className={`p-6 rounded-2xl text-left text-2xl border-4 transition-all font-bold ${
                  selected === null ? 'border-secondary-200 bg-white hover:border-primary-400 hover:bg-primary-50 text-secondary-800'
                  : index === question.correctAnswer ? 'border-green-500 bg-green-50 text-green-900'
                  : selected === index ? 'border-red-400 bg-red-50 text-red-900'
                  : 'border-secondary-100 bg-secondary-50 text-secondary-400'
                }`}>
                {option}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="mb-10 p-8 bg-primary-50 border-4 border-primary-200 rounded-2xl">
              <p className="text-2xl text-primary-900 font-medium leading-relaxed">💡 {question.explanation}</p>
            </div>
          )}
          {selected !== null && (
            <button onClick={handleNext} className="w-full bg-secondary-900 text-white py-5 rounded-2xl text-2xl font-bold hover:bg-primary-600 transition-colors">
              {current + 1 >= questions.length ? 'See results 🎉' : 'Next question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;