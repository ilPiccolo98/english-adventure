export interface TeacherConfig {
  name: string;
  role: string;
  title: string;
  tagline: string;
  lessonFormat: string;
  methodologyDescription: string;
  benefits: string[];
  contactStatus: 'available' | 'coming-soon';
  whatsappNumber?: string;
  whatsappMessage?: string;
  email?: string;
  bookingUrl?: string;
  photos: {
    book: string;
    welcome: string;
    lesson: string;
    reading: string;
    thumbsUp: string;
  };
  realPhotos: {
    welcoming: string;
    standing: string;
    blackboard: string;
    guidance: string;
    portrait: string;
  };
  learningJourney: {
    skill: string;
    description: string;
    icon: string;
  }[];
  courses: {
    id: string;
    ageRange: string;
    badge: string;
    title: { it: string; en: string };
    tagline: { it: string; en: string };
    features: { it: string[]; en: string[] };
    icon: string;
    color: string;
  }[];
  faqs: {
    q: { it: string; en: string };
    a: { it: string; en: string };
  }[];
}

export const TINA_CONFIG: TeacherConfig = {
  name: 'Teacher Tina',
  role: 'Certified English Teacher for Children',
  title: 'Meet Teacher Tina',
  tagline: 'Fun, personalized individual English lessons for young explorers!',
  lessonFormat: 'Individual Lessons (1-on-1 Only)',
  methodologyDescription:
    'Teacher Tina specializes in gentle, high-encouragement English teaching tailored specifically for children aged 5 to 10. By focusing strictly on 1-on-1 lessons, each child learns at their own natural pace with 100% personal attention.',
  benefits: [
    'Fun & engaging play-based activities',
    'Personal attention adapted to your child’s speed',
    'Careful pronunciation support for Arabic-speaking learners',
    'No pressure or fear of making mistakes',
    '1-on-1 individual focus for maximum speaking practice',
  ],
  // Owner configuration: set status to 'available' and provide phone or link when ready
  contactStatus: 'coming-soon',
  whatsappNumber: '', // e.g. '+391234567890'
  whatsappMessage:
    'Hello Teacher Tina! I saw English Adventure and would like to ask about individual lessons for my child.',
  email: '', // e.g. 'teacher.tina@example.com'
  bookingUrl: '', // e.g. 'https://calendly.com/...'
  photos: {
    book: './images/teacher-tina/teacher-tina-book.jpg',
    welcome: './images/teacher-tina/teacher-tina-welcome.jpg',
    lesson: './images/teacher-tina/teacher-tina-lesson.jpg',
    reading: './images/teacher-tina/teacher-tina-reading.jpg',
    thumbsUp: './images/teacher-tina/teacher-tina-thumbs-up.jpg',
  },
  realPhotos: {
    welcoming: './images/teacher-tina/real/tina-welcoming.jpg',
    standing: './images/teacher-tina/real/tina-standing.jpg',
    blackboard: './images/teacher-tina/real/tina-blackboard.jpg',
    guidance: './images/teacher-tina/real/tina-guidance.jpg',
    portrait: './images/teacher-tina/real/tina-portrait.jpg',
  },
  learningJourney: [
    {
      skill: 'Vocabulary Mastery',
      description: 'Building a rich foundation of everyday words: animals, colors, family, and home.',
      icon: '🏝️',
    },
    {
      skill: 'Sentence Building & Grammar',
      description: 'Speaking in full sentences naturally through playful patterns, not dry rules.',
      icon: '🏰',
    },
    {
      skill: 'Clear Pronunciation',
      description: 'Mastering challenging sounds like P/B, V/F, and final consonants with joy.',
      icon: '🦜',
    },
    {
      skill: 'Story Reading & Comprehension',
      description: 'Fostering a genuine love for storybooks, reading confidence, and understanding.',
      icon: '📖',
    },
    {
      skill: 'Attentive Listening',
      description: 'Understanding spoken English instructions, dialogues, and everyday conversations.',
      icon: '🎧',
    },
  ],
  courses: [
    {
      id: 'little-explorers',
      ageRange: '5–7 Anni / Years',
      badge: '🐣 Principianti / Beginners',
      title: {
        it: 'Little Explorers: Primi Passi & Fonetica',
        en: 'Little Explorers: First Steps & Phonics',
      },
      tagline: {
        it: 'Un approccio giocoso e naturale per scoprire i primi suoni e vocaboli',
        en: 'A playful and gentle approach to discover initial sounds and core words',
      },
      features: {
        it: [
          'Alfabeto fonetico e associazione suono-immagine',
          'Vocaboli quotidiani: animali, colori, famiglia, cibi e giocattoli',
          'Canzoni allegre, rime e giochi di memorizzazione visiva',
          '100% senza ansia: ogni progresso viene celebrato con un sorriso',
        ],
        en: [
          'Phonics alphabet & sound-to-image association',
          'Everyday vocabulary: animals, colors, family, food, toys',
          'Catchy songs, rhymes, and visual memory games',
          '100% anxiety-free: every small victory is celebrated',
        ],
      },
      icon: '🐣',
      color: 'from-amber-400 to-orange-400',
    },
    {
      id: 'super-explorers',
      ageRange: '8–10 Anni / Years',
      badge: '🦁 Intermedio / Intermediate',
      title: {
        it: 'Super Explorers: Conversazione & Frasi Complete',
        en: 'Super Explorers: Conversation & Full Sentences',
      },
      tagline: {
        it: 'Costruire frasi, leggere racconti e acquisire sicurezza nel parlato',
        en: 'Building sentences, reading stories, and gaining spoken confidence',
      },
      features: {
        it: [
          'Formulazione spontanea di frasi e domande',
          'Dialoghi guidati e simulazioni di situazioni quotidiane',
          'Lettura di storie illustrate con comprensione del testo',
          'Fiducia e disinvoltura nell’inglese scolastico',
        ],
        en: [
          'Spontaneous sentence structure and questions',
          'Guided dialogues and real-world conversational roleplay',
          'Illustrated storybook reading with comprehension',
          'Confidence and ease in school English tests and presentations',
        ],
      },
      icon: '🦁',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'phonics-lab',
      ageRange: '5–10 Anni / All Ages',
      badge: '🎯 Pronuncia & Supporto Fonetico',
      title: {
        it: 'Phonics Lab: Pronuncia Chiara & Supporto Dedicato',
        en: 'Phonics Lab: Clear Pronunciation & Sound Mastery',
      },
      tagline: {
        it: 'Superare le difficoltà fonetiche più ostiche con la guida paziente di Teacher Tina',
        en: 'Overcoming tricky phonetic hurdles with Teacher Tina’s patient guidance',
      },
      features: {
        it: [
          'Differenziazione pratica dei suoni P / B e V / F',
          'Articolazione chiara delle consonanti finali',
          'Suoni vocalici brevi e lunghi spiegati con giochi ritmici',
          'Supporto fonetico mirato per bambini arabofoni e bilingui',
        ],
        en: [
          'Practical discrimination between P / B and V / F sounds',
          'Clear pronunciation of word-ending consonants',
          'Short vs. long vowels practiced through rhythmic games',
          'Targeted phonetic coaching for Arabic-speaking and bilingual children',
        ],
      },
      icon: '🦜',
      color: 'from-emerald-400 to-teal-500',
    },
  ],
  faqs: [
    {
      q: {
        it: 'Come si svolgono le lezioni individuali 1-on-1?',
        en: 'How do the 1-on-1 private lessons take place?',
      },
      a: {
        it: 'Le lezioni si tengono online (via Zoom o Google Meet) in videochiamata privata 1-on-1 con Teacher Tina. Sono sessioni dinamiche e divertenti di 30–45 minuti piene di giochi interattivi, letture condivise e tanta conversazione.',
        en: 'Lessons take place online via private 1-on-1 video call (Zoom or Google Meet) with Teacher Tina. They are engaging, 30–45 minute interactive sessions filled with games, shared reading, and real conversation.',
      },
    },
    {
      q: {
        it: 'Mio figlio non sa quasi nulla di inglese, è un problema?',
        en: 'My child knows very little English, is that a problem?',
      },
      a: {
        it: 'Assolutamente no! Teacher Tina è specializzata nell’accoglienza di bambini principianti assoluti. Il metodo è visivo, allegro e non punitivo, senza mai far sentire il bambino sotto pressione.',
        en: 'Not at all! Teacher Tina specializes in absolute beginners. The teaching method is visual, warm, and highly supportive, ensuring your child never feels intimidated or judged.',
      },
    },
    {
      q: {
        it: 'In che modo il videogioco si collega alle lezioni private?',
        en: 'How does the video game connect to the private lessons?',
      },
      a: {
        it: 'Il videogioco "English Adventure" permette a tuo figlio di fare pratica autonoma a casa divertendosi con 15 stage nei 5 mondi. Nelle lezioni 1-on-1, Teacher Tina riprende i vocaboli e le strutture del gioco per trasformarle in conversazione fluida.',
        en: 'The "English Adventure" video game allows your child to practice autonomously at home across 15 stages in 5 magical worlds. During 1-on-1 lessons, Teacher Tina builds upon those game milestones to develop natural spoken fluency.',
      },
    },
    {
      q: {
        it: 'Perché scegliere lezioni individuali 1-on-1 anziché corsi di gruppo?',
        en: 'Why choose 1-on-1 individual tutoring instead of group classes?',
      },
      a: {
        it: 'Nei gruppi numerosi (15–20 bambini), ciascun bambino ha solo 2–3 minuti effettivi di parlato e i più timidi restano spesso in silenzio. Con Teacher Tina, il tuo bambino parla l’80% del tempo, riceve attenzione esclusiva e impara al proprio ritmo ideale.',
        en: 'In crowded group classes (15–20 children), each child speaks for only 2–3 minutes and shy kids often stay silent. With Teacher Tina 1-on-1, your child speaks 80% of the lesson time, receives 100% personalized care, and progresses with joy.',
      },
    },
    {
      q: {
        it: 'Come posso prenotare una lezione o parlare con Teacher Tina?',
        en: 'How can I book a session or speak with Teacher Tina?',
      },
      a: {
        it: 'Ti basta cliccare sul pulsante WhatsApp su questa pagina: si aprirà direttamente una chat con Teacher Tina per richiedere informazioni, concordare gli orari o fissare un incontro conoscitivo.',
        en: 'Simply tap the WhatsApp button on this page: it will open a direct chat with Teacher Tina to discuss availability, ask questions, or schedule an introductory meet-and-greet.',
      },
    },
  ],
};
