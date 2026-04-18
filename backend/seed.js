const mongoose = require('mongoose');
require('dotenv').config();
const Tutorial = require('./models/Tutorial');
const Quiz = require('./models/Quiz');

const tutorials = [
  {
    title: "Comment faire un appel vidéo",
    description: "Apprenez à utiliser WhatsApp, Zoom et FaceTime",
    content: "Étape 1 : Ouvrez WhatsApp. Étape 2 : Appuyez sur un contact. Étape 3 : Appuyez sur l'icône de la caméra. Étape 4 : Attendez qu'ils répondent !",
    level: "Débutant",
    category: "Communication"
  },
  {
    title: "Comment utiliser les emails",
    description: "Envoyez, recevez et organisez vos courriels",
    content: "Étape 1 : Ouvrez votre application d'email. Étape 2 : Appuyez sur 'Nouveau message'. Étape 3 : Tapez l'adresse email de la personne. Étape 4 : Écrivez votre message. Étape 5 : Appuyez sur Envoyer !",
    level: "Débutant",
    category: "Communication"
  },
  {
    title: "Comment éviter les arnaques en ligne",
    description: "Restez en sécurité face aux fraudes",
    content: "Étape 1 : Ne partagez jamais votre mot de passe. Étape 2 : Ne cliquez pas sur des liens suspects. Étape 3 : Si quelqu'un demande de l'argent en ligne, c'est probablement une arnaque. Étape 4 : En cas de doute, demandez à un proche !",
    level: "Important",
    category: "Sécurité"
  },
  {
    title: "Comment chercher sur Google",
    description: "Trouvez des informations facilement",
    content: "Étape 1 : Ouvrez votre navigateur internet. Étape 2 : Allez sur google.com. Étape 3 : Tapez ce que vous cherchez dans la barre de recherche. Étape 4 : Appuyez sur Entrée. Étape 5 : Cliquez sur le résultat le plus pertinent !",
    level: "Débutant",
    category: "Internet"
  },
  {
    title: "Comment envoyer une photo par SMS",
    description: "Partagez vos souvenirs avec vos proches",
    content: "Étape 1 : Ouvrez l'application Messages. Étape 2 : Choisissez une conversation. Étape 3 : Appuyez sur l'icône 'Plus' ou l'icône 'Appareil photo'. Étape 4 : Sélectionnez votre photo dans la galerie. Étape 5 : Appuyez sur Envoyer !",
    level: "Débutant",
    category: "Communication"
  },
  {
    title: "Comment mettre à jour son téléphone",
    description: "Gardez votre appareil rapide et sécurisé",
    content: "Étape 1 : Allez dans les Paramètres de votre téléphone. Étape 2 : Cherchez 'Système' ou 'Général'. Étape 3 : Appuyez sur 'Mise à jour logicielle'. Étape 4 : Si une mise à jour est disponible, appuyez sur 'Télécharger et installer'.",
    level: "Important",
    category: "Système"
  },
  {
    title: "Comment se connecter au Wi-Fi",
    description: "Accédez à internet gratuitement chez vous",
    content: "Étape 1 : Ouvrez les Paramètres. Étape 2 : Appuyez sur Wi-Fi. Étape 3 : Activez le Wi-Fi si ce n'est pas fait. Étape 4 : Sélectionnez le nom de votre box internet. Étape 5 : Entrez le mot de passe (souvent écrit sous la box).",
    level: "Débutant",
    category: "Internet"
  }
];

const quizQuestions = [
  {
    question: "À quoi sert le Wi-Fi ?",
    options: ["À se connecter à internet sans fil", "À passer des appels téléphoniques uniquement", "À imprimer des documents", "À regarder des chaînes TV"],
    correctAnswer: 0,
    explanation: "Le Wi-Fi vous permet de vous connecter à internet sans aucun câble !"
  },
  {
    question: "Que faire si quelqu'un vous demande votre mot de passe ?",
    options: ["Le lui donner", "Ne jamais le partager avec personne", "Le partager avec des amis", "L'écrire dans un email"],
    correctAnswer: 1,
    explanation: "Ne partagez jamais votre mot de passe avec personne — pas même avec des personnes qui semblent dignes de confiance !"
  },
  {
    question: "Qu'est-ce qu'un appel vidéo ?",
    options: ["Un appel téléphonique sans son", "Parler à quelqu'un tout en le voyant à l'écran", "Envoyer un fichier vidéo", "Regarder un film en ligne"],
    correctAnswer: 1,
    explanation: "Un appel vidéo vous permet de voir et de parler à quelqu'un via l'écran de votre téléphone ou de votre ordinateur !"
  },
  {
    question: "Que signifie le symbole @ dans une adresse email ?",
    options: ["Que l'email est gratuit", "Il sépare le nom de l'utilisateur et le fournisseur d'email", "Que l'email est privé", "C'est juste pour faire joli"],
    correctAnswer: 1,
    explanation: "Le symbole @ sépare votre nom du fournisseur d'accès, par exemple nom@gmail.com !"
  },
  {
    question: "Que faire si vous recevez un lien suspect par SMS ou email ?",
    options: ["Cliquer dessus immédiatement", "Le partager avec des amis", "Le supprimer et ne pas cliquer", "Répondre à l'expéditeur"],
    correctAnswer: 2,
    explanation: "Ne cliquez jamais sur des liens suspects — supprimez-les immédiatement pour rester en sécurité !"
  },
  {
    question: "Où se trouve généralement le bouton pour fermer une application ou une fenêtre ?",
    options: ["En bas au centre", "En haut à droite (une croix rouge ou un 'X')", "Sur le côté gauche", "Il n'y a pas de bouton"],
    correctAnswer: 1,
    explanation: "Sur la plupart des écrans, le bouton pour fermer (souvent un 'X') se trouve dans le coin supérieur droit."
  },
  {
    question: "À quelle fréquence devriez-vous éteindre et redémarrer complètement votre téléphone ?",
    options: ["Une fois par an", "Jamais", "Au moins une fois par semaine", "Toutes les heures"],
    correctAnswer: 2,
    explanation: "Redémarrer votre téléphone une fois par semaine permet de le garder rapide et d'éviter des bugs !"
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