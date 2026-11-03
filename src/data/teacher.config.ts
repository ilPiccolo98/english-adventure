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
  learningJourney: {
    skill: string;
    description: string;
    icon: string;
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
  whatsappMessage: 'Hello Teacher Tina! I saw English Adventure and would like to ask about individual lessons for my child.',
  email: '', // e.g. 'teacher.tina@example.com'
  bookingUrl: '', // e.g. 'https://calendly.com/...'
  photos: {
    book: './images/teacher-tina/teacher-tina-book.jpg',
    welcome: './images/teacher-tina/teacher-tina-welcome.jpg',
    lesson: './images/teacher-tina/teacher-tina-lesson.jpg',
    reading: './images/teacher-tina/teacher-tina-reading.jpg',
    thumbsUp: './images/teacher-tina/teacher-tina-thumbs-up.jpg',
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
};

