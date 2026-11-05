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
  foundationCourse: {
    title: { en: string; ar: string };
    subtitle: { en: string; ar: string };
    phonicsDescription: { en: string; ar: string };
    skills: {
      id: string;
      icon: string;
      name: { en: string; ar: string };
      description: { en: string; ar: string };
    }[];
    structure: {
      duration: { en: string; ar: string };
      frequency: { en: string; ar: string };
      standard: { en: string; ar: string };
      parentFollowUp: { en: string; ar: string };
    };
    levels: {
      intro: { en: string; ar: string };
      fastTrack: { en: string; ar: string };
      extendedCare: { en: string; ar: string };
      philosophy: { en: string; ar: string };
    };
  };
  courses: {
    id: string;
    ageRange: string;
    badge: string;
    title: { it?: string; en: string; ar?: string };
    tagline: { it?: string; en: string; ar?: string };
    features: { it?: string[]; en: string[]; ar?: string[] };
    icon: string;
    color: string;
  }[];
  faqs: {
    q: { it?: string; en: string; ar?: string };
    a: { it?: string; en: string; ar?: string };
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
  email: 'Easyeng111111@gmail.com',
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
  foundationCourse: {
    title: {
      en: 'English Foundation Course for Children',
      ar: 'كورس تأسيس اللغة الإنجليزية للأطفال',
    },
    subtitle: {
      en: 'A comprehensive foundation program designed to build a strong English language foundation in accordance with Cambridge CEFR standards, developing all four essential skills.',
      ar: 'برنامج تأسيسي شامل يهدف إلى بناء قاعدة قوية في اللغة الإنجليزية وفقًا لمعايير Cambridge CEFR، مع التركيز على تنمية جميع المهارات اللغوية الأساسية.',
    },
    phonicsDescription: {
      en: 'Primarily based on the Phonics approach, where children learn to read correctly by understanding letter sounds, blending sounds, and gradually progressing to reading words and sentences according to their individual levels. Writing skills are developed alongside reading to ensure balanced progress.',
      ar: 'يعتمد الكورس بشكل أساسي على منهج الصوتيات (Phonics)، حيث يتعلم الطفل القراءة بطريقة صحيحة من خلال فهم أصوات الحروف، ودمج الأصوات، وقراءة الكلمات والجمل تدريجيًا بما يتناسب مع مستواه، بالتوازي مع التدريب على الكتابة الصحيحة.',
    },
    skills: [
      {
        id: 'reading',
        icon: '📖',
        name: { en: 'Reading', ar: 'القراءة (Reading)' },
        description: {
          en: 'Phonics letter sounds, blending, progressive vocabulary, and story reading.',
          ar: 'فهم أصوات الحروف، دمج الأصوات، وقراءة الكلمات والجمل والقصص تدريجيًا.',
        },
      },
      {
        id: 'writing',
        icon: '✍️',
        name: { en: 'Writing', ar: 'الكتابة (Writing)' },
        description: {
          en: 'Correct letter formation and balanced writing skills alongside reading development.',
          ar: 'التدريب على الكتابة الصحيحة بالتوازي مع تطور مهارات القراءة بتوازن.',
        },
      },
      {
        id: 'speaking',
        icon: '🗣️',
        name: { en: 'Speaking', ar: 'التحدث (Speaking)' },
        description: {
          en: 'Active conversational roleplay, natural sentence structure, and confident speaking.',
          ar: 'أنشطة تفاعلية ومحادثات حية لبناء الثقة في التحدث بالإنجليزية دون تردد.',
        },
      },
      {
        id: 'listening',
        icon: '🎧',
        name: { en: 'Listening', ar: 'الاستماع (Listening)' },
        description: {
          en: 'Auditory discrimination of native sounds, story listening, and instruction comprehension.',
          ar: 'تنمية مهارات الاستماع والتمييز الصوتي وفهم التوجيهات بالإنجليزية.',
        },
      },
    ],
    structure: {
      duration: {
        en: '50–60 minutes per lesson (adapted to child’s age and concentration span)',
        ar: '50–60 دقيقة للحصة (وفقًا لعمر الطالب وقدرته على التركيز)',
      },
      frequency: {
        en: '3 lessons per week (12 lessons per month)',
        ar: '3 حصص أسبوعيًا (12 حصة شهريًا)',
      },
      standard: {
        en: 'Taught strictly in accordance with Cambridge CEFR standards for proper academic progression',
        ar: 'يتم التدريس وفقًا لمعايير Cambridge CEFR لضمان التدرج الأكاديمي السليم',
      },
      parentFollowUp: {
        en: 'Regular progress updates and direct follow-up directly with Teacher Tina',
        ar: 'يتم المتابعة مع ولي الأمر بشكل دوري مع تيتشر تينا مباشرة',
      },
    },
    levels: {
      intro: {
        en: 'The program consists of multiple levels, with each level taking approximately 3 months to complete. However, the actual duration varies from child to child depending on their learning pace and progress:',
        ar: 'يتكون البرنامج من عدة مستويات، ويستغرق كل مستوى في المتوسط 3 أشهر. ومع ذلك، تختلف مدة الدراسة من طفل لآخر حسب سرعة التعلم ومستوى التقدم:',
      },
      fastTrack: {
        en: 'Fast Track (~2 Months): If a child masters all learning objectives quickly, they may complete the level in approximately 2 months.',
        ar: 'المسار السريع (حوالي شهرين): إذا أتقن الطالب أهداف المستوى بسرعة، فقد ينهيه في حوالي شهرين دون تأخير.',
      },
      extendedCare: {
        en: 'Flexible Extension: If a child needs more time, the level is extended so they achieve all objectives comfortably without being rushed.',
        ar: 'تمديد مرن: وإذا احتاج إلى وقت إضافي، يتم تمديد المستوى حتى يحقق جميع أهدافه دون استعجال.',
      },
      philosophy: {
        en: 'We believe that every child has their own unique learning pace, which is why study plans are tailored to individual needs.',
        ar: 'نؤمن بأن لكل طفل وتيرته الخاصة في التعلم، لذلك يتم تصميم خطة الدراسة بما يناسب احتياجاته الفردية.',
      },
    },
  },
  courses: [
    {
      id: 'foundation-phonics',
      ageRange: 'Cambridge CEFR',
      badge: '🎯 Flagship Foundation',
      title: {
        it: 'Corso Fondazione Inglese per Bambini (Cambridge CEFR)',
        en: 'English Foundation Course for Children',
        ar: 'كورس تأسيس اللغة الإنجليزية للأطفال (معايير Cambridge)',
      },
      tagline: {
        it: 'Metodo Phonics e 4 abilità linguistiche: lettura, scrittura, parlato e ascolto',
        en: 'Comprehensive foundation in Reading, Writing, Speaking & Listening with Phonics',
        ar: 'برنامج تأسيسي شامل يركز على المهارات الأربع: القراءة والكتابة والتحدث والاستماع',
      },
      features: {
        it: [
          '50–60 minuti a lezione • 3 lezioni a settimana (12 al mese)',
          'Standard accademici Cambridge CEFR',
          'Sviluppo parallelo di lettura corretta e scrittura',
          'Miglioramento continuo con feedback diretto da Teacher Tina',
        ],
        en: [
          '50–60 min lessons • 3 lessons per week (12 per month)',
          'Cambridge CEFR academic standards',
          'Phonics letter sounds, blending & parallel writing',
          'Regular progress updates & direct follow-up with Teacher Tina',
        ],
        ar: [
          'مدة الحصة: 50–60 دقيقة • 3 حصص أسبوعيًا (12 حصة شهريًا)',
          'معايير أكاديمية معتمدة وفقًا لـ Cambridge CEFR',
          'تأسيس القراءة والكتابة بمنهج الصوتيات (Phonics)',
          'متابعة دورية مستمرة مع ولي الأمر مباشرة مع تيتشر تينا',
        ],
      },
      icon: '🎓',
      color: 'from-amber-400 to-orange-400',
    },
    {
      id: 'little-explorers',
      ageRange: '5–7 Years / سنوات',
      badge: '🐣 Beginners / مبتدئ',
      title: {
        it: 'Little Explorers: Primi Passi & Fonetica',
        en: 'Little Explorers: Phonics & First Words',
        ar: 'ليتل إكسبلوررز: الصوتيات والكلمات الأولى',
      },
      tagline: {
        it: 'Un approccio giocoso e naturale per scoprire i primi suoni e vocaboli',
        en: 'Gentle step-by-step phonics sounds, everyday vocabulary and joyful discovery',
        ar: 'خطوات أولى ممتعة لاكتشاف أصوات الحروف ومفردات الحياة اليومية بالصوتيات',
      },
      features: {
        it: [
          'Alfabeto fonetico e associazione suono-immagine',
          'Vocaboli quotidiani: animali, colori, famiglia, cibi',
          'Canzoni, filastrocche e giochi visivi',
          '100% senza ansia da errore',
        ],
        en: [
          'Phonics alphabet & sound-to-image association',
          'Everyday words: animals, colors, family, food, toys',
          'Rhymes, songs and visual memory games',
          '100% anxiety-free: warm encouragement for every small win',
        ],
        ar: [
          'الربط الصوتي والمرئي للحروف والأصوات',
          'مفردات الحياة اليومية: الحيوانات، الألوان، العائلة، الأطعمة',
          'ألعاب ذاكرة وأناشيد تعليمية محببة للأطفال',
          'بيئة تعليمية دافئة وخالية تمامًا من أي ضغوط أو خوف من الخطأ',
        ],
      },
      icon: '🐣',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'super-explorers',
      ageRange: '8–10 Years / سنوات',
      badge: '🦁 Intermediate / متوسط',
      title: {
        it: 'Super Explorers: Conversazione & Frasi Complete',
        en: 'Super Explorers: Conversation & Fluency',
        ar: 'سوبر إكسبلوررز: المحادثة والطلاقة اللغوية',
      },
      tagline: {
        it: 'Costruire frasi, leggere racconti e acquisire sicurezza nel parlato',
        en: 'Sentence building, storybook reading, and confident classroom speaking',
        ar: 'بناء الجمل، وقراءة القصص، والتحدث بثقة تامة أمام الزملاء وفي المدرسة',
      },
      features: {
        it: [
          'Formulazione spontanea di frasi e domande',
          'Dialoghi guidati e simulazioni di situazioni reali',
          'Lettura di storie illustrate con comprensione',
          'Fiducia nelle interrogazioni scolastiche',
        ],
        en: [
          'Spontaneous sentence construction and dialogue',
          'Storybook reading with active comprehension',
          'Pronunciation refinement for tricky sounds',
          'Confidence in school exams and presentations',
        ],
        ar: [
          'تكوين الجمل والأسئلة بالإنجليزية بعفوية وسهولة',
          'قراءة القصص المصورة مع تدريب الفهم والاستيعاب',
          'معالجة مخارج الحروف والتركيز على النطق الصحيح',
          'تعزيز ثقة الطفل في التحدث بالإنجليزية في المدرسة والامتحانات',
        ],
      },
      icon: '🦁',
      color: 'from-emerald-400 to-teal-500',
    },
  ],
  faqs: [
    {
      q: {
        it: 'Come si svolgono le lezioni individuali 1-on-1?',
        en: 'How do the 1-on-1 private lessons take place?',
        ar: 'كيف تُعقد الحصص الفردية الخاصة (1-on-1)؟',
      },
      a: {
        it: 'Le lezioni si tengono online (via Zoom o Google Meet) in videochiamata privata 1-on-1 con Teacher Tina. Sono sessioni dinamiche e divertenti di 50–60 minuti piene di giochi interattivi, letture condivise e tanta conversazione.',
        en: 'Lessons take place online via private 1-on-1 video call (Zoom or Google Meet) directly with Teacher Tina. Each lesson lasts 50–60 minutes and is packed with interactive Phonics activities, shared reading, and active conversation.',
        ar: 'تُعقد الحصص عبر مكالمات فيديو فردية خاصة (عبر Zoom أو Google Meet) مباشرة مع تيتشر تينا. مدة الحصة 50–60 دقيقة مليئة بأنشطة الصوتيات التفاعلية والقراءة المشتركة والتحدث.',
      },
    },
    {
      q: {
        it: 'Qual è la frequenza settimanale e la durata del corso?',
        en: 'What is the lesson frequency and course duration?',
        ar: 'ما هو نظام الدراسة وعدد الحصص ومدة المستوى؟',
      },
      a: {
        it: 'Il corso prevede 3 lezioni a settimana (12 al mese). Ogni livello dura in media circa 3 mesi, con flessibilità (circa 2 mesi per chi impara velocemente o estensione senza fretta se necessario).',
        en: 'The schedule consists of 3 lessons per week (12 lessons per month). Each level takes approximately 3 months on average, with adaptive pacing (~2 months for fast learners or comfortable extension if needed).',
        ar: 'يتضمن النظام 3 حصص أسبوعيًا (12 حصة شهريًا). يستغرق المستوى في المتوسط حوالي 3 أشهر، مع وتيرة مرنة (حوالي شهرين في حال الإتقان السريع، أو التمديد دون استعجال لضمان التأسيس المتين).',
      },
    },
    {
      q: {
        it: 'In cosa consiste il metodo Phonics e gli standard Cambridge CEFR?',
        en: 'What is the Phonics approach and Cambridge CEFR standards?',
        ar: 'ما هو منهج الصوتيات (Phonics) ومعايير Cambridge CEFR؟',
      },
      a: {
        it: 'Il metodo Phonics insegna al bambino i suoni effettivi delle lettere e come fonderli per leggere e scrivere senza memorizzare a memoria. Gli standard Cambridge CEFR garantiscono un percorso accademico riconosciuto a livello internazionale.',
        en: 'The Phonics method teaches children the actual phonetic sounds of letters and how to blend them, building reading and writing naturally. Cambridge CEFR standards ensure an academically sound, internationally recognized progression.',
        ar: 'يعتمد منهج الصوتيات (Phonics) على تعليم الطفل أصوات الحروف وكيفية دمجها لنطق وقراءة الكلمات بطريقة طبيعية وتأسيس الكتابة السليمة، وفق التدرج الأكاديمي المعتمد من Cambridge CEFR.',
      },
    },
    {
      q: {
        it: 'Come avviene la comunicazione con i genitori?',
        en: 'How does Teacher Tina communicate with parents?',
        ar: 'كيف تتم المتابعة والتواصل مع ولي الأمر؟',
      },
      a: {
        it: 'I genitori ricevono aggiornamenti periodici sui progressi del bambino e possono comunicare direttamente con Teacher Tina via email per coordinare orari e obiettivi.',
        en: 'Parents receive regular progress updates, observations, and direct follow-up with Teacher Tina personally via email.',
        ar: 'تتم المتابعة الدورية مع ولي الأمر بانتظام وبشكل مباشر مع تيتشر تينا عبر البريد الإلكتروني للاطلاع على مستوى تقدم الطفل وملاحظات الأداء.',
      },
    },
    {
      q: {
        it: 'Mio figlio non sa quasi nulla di inglese, va bene comunque?',
        en: 'My child knows very little English, is that okay?',
        ar: 'طفلي لا يعرف أي شيء تقريبًا في الإنجليزية، هل هذا الكورس مناسب؟',
      },
      a: {
        it: 'Assolutamente sì! Il Foundation Course è progettato proprio per partire da zero con gentilezza, incoraggiamento e supporto visivo.',
        en: 'Absolutely! The Foundation Course is specifically designed for beginners to build a rock-solid foundation from scratch with zero intimidation and warm support.',
        ar: 'بالتأكيد! كورس التأسيس مصمم خصيصًا للأطفال من الصفر، بأسلوب بصري ممتع وتدرج لطيف يمنح الطفل حب اللغة والأمان الكامل.',
      },
    },
  ],
};
