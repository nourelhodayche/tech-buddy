import { Link } from 'react-router-dom';
import { Search, BookOpen, Bot, Gamepad2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-secondary-50 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-secondary-900 mb-6 tracking-tight">
            Welcome to <span className="text-primary-600">TechBuddy</span>
          </h1>
          <p className="text-2xl text-secondary-800 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
            Your simple and patient assistant to understand technology. We make learning easy and fun!
          </p>
          
          <div className="max-w-2xl mx-auto flat-card p-4 flex items-center gap-4 mb-12">
            <span className="text-primary-500 pl-4"><Search size={32} /></span>
            <input 
              type="text" 
              placeholder="What do you want to learn today?" 
              className="flex-1 bg-transparent text-xl text-secondary-900 placeholder-secondary-400 focus:outline-none py-3"
            />
            <button className="bg-primary-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-primary-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1 */}
          <div className="flat-card p-10 flex flex-col justify-between">
            <div>
              <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-8">
                <BookOpen size={40} />
              </div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Simple Tutorials</h2>
              <p className="text-secondary-600 text-xl mb-10 leading-relaxed font-medium">Step-by-step, easy-to-read guides to use your phone and the internet.</p>
            </div>
            <Link to="/tutorials" className="inline-flex items-center justify-center w-full bg-secondary-900 text-white px-6 py-5 rounded-2xl text-xl font-bold hover:bg-secondary-800 transition-colors">
              Start learning
            </Link>
          </div>

          {/* Card 2 */}
          <div className="flat-card p-10 flex flex-col justify-between border-2 border-primary-200">
            <div>
              <div className="w-20 h-20 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center mb-8">
                <Bot size={40} />
              </div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Voice Assistant</h2>
              <p className="text-secondary-600 text-xl mb-10 leading-relaxed font-medium">Stuck on a problem? Ask your question out loud to our smart assistant.</p>
            </div>
            <Link to="/chatbot" className="inline-flex items-center justify-center w-full bg-primary-600 text-white px-6 py-5 rounded-2xl text-xl font-bold hover:bg-primary-700 transition-colors">
              Ask a question
            </Link>
          </div>

          {/* Card 3 */}
          <div className="flat-card p-10 flex flex-col justify-between">
            <div>
              <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-8">
                <Gamepad2 size={40} />
              </div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Fun Quizzes</h2>
              <p className="text-secondary-600 text-xl mb-10 leading-relaxed font-medium">Test what you've learned stress-free and track your progress.</p>
            </div>
            <Link to="/quiz" className="inline-flex items-center justify-center w-full bg-secondary-900 text-white px-6 py-5 rounded-2xl text-xl font-bold hover:bg-secondary-800 transition-colors">
              Take a Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;