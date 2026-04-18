import { useState, useRef } from 'react';
import { sendMessage } from '../services/api';
import ReactMarkdown from 'react-markdown';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! 👋 I am TechBuddy, your friendly tech assistant. Ask me any technology question!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const inputRef = useRef('');

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Désolé, votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language || 'fr-FR';
    recognition.interimResults = true;
    recognition.continuous = false;

    inputRef.current = input;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setInput((inputRef.current ? inputRef.current + " " : "") + currentTranscript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        alert("Veuillez autoriser l'accès au microphone dans les paramètres de votre navigateur.");
      }
    };
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const toggleSpeak = (text) => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // We can make this dynamic later
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synth.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    
    // We send the *current* messages as history, before adding the new userMessage 
    // because the backend already appends the new message itself.
    const currentHistory = [...messages];
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await sendMessage(input, currentHistory);
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I had trouble answering. Please check your API Key or try again! 😊' }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm mb-6 text-4xl">🤖</div>
          <h1 className="text-5xl font-extrabold text-secondary-900 mb-4">Assistant Intelligent</h1>
          <p className="text-2xl text-secondary-800 font-medium">Posez-moi n'importe quelle question sur la technologie !</p>
        </div>
        
        <div className="flat-card p-6 md:p-10 mb-8 h-[550px] overflow-y-auto flex flex-col gap-8 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`px-8 py-5 rounded-3xl text-2xl max-w-[85%] shadow-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-secondary-100 text-secondary-900 rounded-bl-none border-2 border-secondary-200'
                }`}
              >
                {msg.role === 'user' ? (
                  msg.text
                ) : (
                  <div className="prose prose-xl max-w-none prose-p:leading-relaxed prose-li:marker:text-primary-600">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    <button 
                      onClick={() => toggleSpeak(msg.text)}
                      className="mt-6 flex items-center gap-3 text-primary-700 bg-white px-5 py-3 rounded-2xl text-lg font-bold border-2 border-primary-200 hover:bg-primary-50 transition-colors"
                    >
                      {isSpeaking ? <><VolumeX size={24}/> Arrêter la lecture</> : <><Volume2 size={24}/> Lire à voix haute</>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-secondary-100 border-2 border-secondary-200 px-8 py-5 rounded-3xl rounded-bl-none text-2xl shadow-sm flex items-center gap-3">
                <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <button 
            onClick={startListening}
            className={`flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-2xl font-bold border-4 transition-all shadow-sm md:w-auto w-full ${isListening ? 'bg-red-50 text-red-700 border-red-500 animate-pulse' : 'bg-white text-secondary-800 border-secondary-200 hover:border-primary-400 hover:bg-primary-50'}`}
          >
            {isListening ? <><MicOff size={32} /> Écoute...</> : <><Mic size={32} /> Parler</>}
          </button>
          <div className="flex flex-1 items-center bg-white rounded-2xl shadow-sm border-4 border-secondary-200 overflow-hidden focus-within:border-primary-500 transition-colors">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Tapez votre question ici..."
              className="flex-1 bg-transparent px-6 py-5 text-2xl text-secondary-900 focus:outline-none placeholder-secondary-500"
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()}
              className="bg-primary-600 text-white px-10 py-5 text-2xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed m-1 rounded-xl"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;