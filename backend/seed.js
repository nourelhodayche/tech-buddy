const mongoose = require('mongoose');
require('dotenv').config();
const Tutorial = require('./models/Tutorial');
const Quiz = require('./models/Quiz');

const tutorials = [
  {
    title: 'How to make a video call',
    description: 'Learn to use WhatsApp, Zoom & FaceTime',
    content: 'Step 1: Open WhatsApp. Step 2: Tap on a contact. Step 3: Tap the video camera icon. Step 4: Wait for them to answer!',
    level: 'Beginner',
    category: 'Communication'
  },
  {
    title: 'How to use email',
    description: 'Send, receive & organize your emails',
    content: 'Step 1: Open your email app. Step 2: Tap "Compose" or "New". Step 3: Type the email address of the person. Step 4: Write your message. Step 5: Tap Send!',
    level: 'Beginner',
    category: 'Communication'
  },
  {
    title: 'How to avoid online scams',
    description: 'Stay safe from fraud & phishing',
    content: 'Step 1: Never share your password. Step 2: Do not click suspicious links. Step 3: If someone asks for money online, it is likely a scam. Step 4: When in doubt, ask a family member!',
    level: 'Important',
    category: 'Safety'
  },
  {
    title: 'How to search on Google',
    description: 'Find information easily & safely',
    content: 'Step 1: Open your browser. Step 2: Go to google.com. Step 3: Type what you are looking for. Step 4: Press Enter. Step 5: Click on the result that looks most helpful!',
    level: 'Beginner',
    category: 'Internet'
  }
];

const quizQuestions = [
  {
    question: 'What does WiFi allow you to do?',
    options: ['Connect to the internet without cables', 'Make phone calls only', 'Print documents', 'Watch TV channels'],
    correctAnswer: 0,
    explanation: 'WiFi lets you connect to the internet without any cables!'
  },
  {
    question: 'What should you do if someone asks for your password online?',
    options: ['Give it to them', 'Never share it with anyone', 'Share it with friends', 'Write it in an email'],
    correctAnswer: 1,
    explanation: 'Never share your password with anyone — not even people who seem trustworthy!'
  },
  {
    question: 'What is a video call?',
    options: ['A phone call with no sound', 'Talking to someone while seeing them on screen', 'Sending a video file', 'Watching a movie online'],
    correctAnswer: 1,
    explanation: 'A video call lets you see and talk to someone through your phone or computer screen!'
  },
  {
    question: 'What does the @ symbol mean in an email address?',
    options: ['It means the email is free', 'It separates your name from the email provider', 'It means the email is private', 'It is just decoration'],
    correctAnswer: 1,
    explanation: 'The @ symbol separates your name from the email provider, for example name@gmail.com!'
  },
  {
    question: 'What should you do if you receive a suspicious link?',
    options: ['Click on it immediately', 'Share it with friends', 'Delete it and do not click', 'Reply to the sender'],
    correctAnswer: 2,
    explanation: 'Never click suspicious links — delete them immediately to stay safe!'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Tutorial.deleteMany();
    await Quiz.deleteMany();
    await Tutorial.insertMany(tutorials);
    await Quiz.insertMany(quizQuestions);
    console.log('✅ Database seeded successfully!');
    process.exit();
  })
  .catch((err) => {
    console.log('❌ Error:', err);
    process.exit(1);
  });