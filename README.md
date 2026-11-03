# 🌟 English Adventure — 2D Arcade English Game for Kids

> **A cheerful, accessible, static browser-based English-learning game designed for children aged 5–10 whose first language is Arabic, introducing parents to Tina Teacher's individual 1-on-1 English lessons.**

---

## 🎮 Features & Highlights

- **Arcade-Inspired Design**: Bright, tactile 2D graphics, rounded corners, soft shadows, cheerful vector avatars, and Google Fonts (**Fredoka** and **Nunito**).
- **Two Learning Paths**:
  - 🐣 **Little Explorer** (suggested ages 5–7): Single words, picture matching, 2–4 word phrases, memory cards, and listening.
  - 🚀 **Super Explorer** (suggested ages 8–10): Sentence building, basic grammar in context, reading comprehension, and pronunciation minimal pairs.
- **5 Themed Worlds & 15 Playable Levels (150 Total Exercises)**:
  1. 🏝️ **Vocabulary Island**: Greetings, Animals, Colors & Numbers 1–10.
  2. 🏰 **Grammar Castle**: Pronouns (I/he/she/it/they), Verb Tower (am/is/are), Sentence Builder (a/an & word order).
  3. 🦜 **Pronunciation Jungle**: Phonetic focus for Arabic-speaking learners (/p/ vs /b/, /f/ vs /v/, /θ/ /ð/ and final consonants) with Web Speech model audio + *"I DID IT!"* self-affirmation button.
  4. 🌲 **Reading Forest**: First words, little sentences, and illustrated story quests with comprehension questions.
  5. 🔮 **Listening Cave**: Listen & find, everyday school instructions (*"Stand up"*, *"Open the book"*), and listening missions.
- **Non-Punitive Progression**:
  - ⭐ **1–3 Stars**: Mistakes can be retried without losing previously earned stars. A completed level always receives at least 1 star!
  - 🪙 **Coins**: Rewarded upon level completion.
  - 🏆 **Badges**: Milestone rewards (*"First Steps"*, *"Word Explorer"*, *"Grammar Hero"*, *"Sound Detective"*, *"Reading Star"*, *"Super Listener"*, *"English Champion"*).
- **Meet Tina Teacher (Screen G / For Parents)**:
  - Trustworthy section explaining Tina's **individual 1-on-1 lessons** only.
  - *"Your Learning Journey"* overview of the 5 skills.
  - Safe, configurable contact setup with zero fabricated details.
- **€0 Budget Target**:
  - No backend, no database, no user accounts, no paid APIs, no tracking.
  - 100% client-side with versioned `localStorage` save state (`english-adventure-save-v1`).
  - Deployable on **Cloudflare Pages** or **GitHub Pages** for free.

---

## 🚀 Quick Start (Local Development)

### Requirements
- **Node.js** LTS (v18+ or v20+)
- **npm** (v9+)

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open your browser at `http://localhost:5173` to play!

---

## 🧪 Testing & Code Quality

```bash
# Run the automated curriculum & scoring test suite (150 exercises verified)
npm test

# Run Oxlint / ESLint code quality checks
npm run lint

# Build the production bundle
npm run build

# Preview the static production build locally
npm run preview
```

---

## 🛠️ Project Structure

```text
english-adventure/
├── public/                         # Static assets and favicon
├── src/
│   ├── app/
│   ├── components/
│   │   ├── game/
│   │   │   ├── TinaMascot.tsx      # SVG mascot (Avatar, Standing, Expressive poses)
│   │   │   └── TopHUD.tsx          # Star & coin HUD, avatar, path badge & settings
│   │   ├── icons/
│   │   │   └── GameIcons.tsx       # Avatar circular frame display
│   │   └── ui/
│   │       ├── Button.tsx          # 3D tactile arcade buttons
│   │       ├── AudioButton.tsx     # Web Speech synthesis speaker button
│   │       ├── ProgressBar.tsx     # Animated progress bar
│   │       ├── StarRating.tsx      # Golden stars with animations
│   │       └── Modal.tsx           # Accessible modal popup
│   ├── data/
│   │   ├── teacher.config.ts       # ⚙️ Editable Tina Teacher contact configuration
│   │   ├── badges.data.ts          # Achievement badge definitions
│   │   ├── avatars.data.ts         # Cartoon explorer avatar profiles
│   │   ├── worlds.data.ts          # 5 Worlds metadata & navigation helpers
│   │   └── worlds/                 # 15 Levels & 150 structured exercises
│   │       ├── 01-vocabulary-island.ts
│   │       ├── 02-grammar-castle.ts
│   │       ├── 03-pronunciation-jungle.ts
│   │       ├── 04-reading-forest.ts
│   │       └── 05-listening-cave.ts
│   ├── features/
│   │   ├── welcome/                # Screen 1: Welcome & arcade CTA
│   │   ├── player/                 # Screen 2: Path & avatar setup
│   │   ├── world-map/              # Screen 3: 5-World interactive trail
│   │   ├── worlds/                 # Screen 4: World level selection
│   │   ├── exercises/              # Screen 5: Exercise session engine & renderers
│   │   ├── rewards/                # Screen 6: Results & badges modal
│   │   └── teacher/                # Screen 7: For Parents / Meet Tina Teacher
│   ├── services/
│   │   ├── audio.service.ts        # window.speechSynthesis & Web Audio UI chimes
│   │   ├── scoring.service.ts      # Non-punitive star & coin calculator
│   │   └── confetti.service.ts     # Celebration confetti (respects reducedMotion)
│   ├── store/
│   │   └── game.store.ts           # Zustand store with LocalStorage persistence
│   ├── types/
│   │   ├── game.types.ts           # Player, settings & badge types
│   │   └── exercise.types.ts       # Discriminated union of all 8 exercise types
│   ├── styles/
│   │   └── index.css               # Tailwind v4 theme & 3D button classes
│   ├── router.tsx                  # HashRouter for static deployment
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   └── curriculum.test.ts          # Automated test suite
├── package.json
└── vite.config.ts
```

---

## ⚙️ How to Configure Tina Teacher's Contact Details

Open [`src/data/teacher.config.ts`](file:///c:/Users/Utente/Desktop/projects/english-videogame/src/data/teacher.config.ts) in your editor:

```typescript
export const TINA_CONFIG: TeacherConfig = {
  name: 'Tina Teacher',
  title: 'Meet Tina Teacher',
  tagline: 'Fun, personalized individual English lessons for young explorers!',
  lessonFormat: 'Individual Lessons (1-on-1 Only)',
  
  // Set to 'available' when you have Tina's contact info ready!
  contactStatus: 'available', 
  whatsappNumber: '+391234567890', // Enter WhatsApp phone number with country code
  whatsappMessage: 'Hello Tina! I would like to ask about individual lessons for my child.',
  email: 'tina.teacher@example.com',
  bookingUrl: 'https://calendly.com/...',
  ...
};
```

When `contactStatus` is `'coming-soon'`, the parent page safely displays **"Contact Details Coming Soon"** without any broken links or fabricated info.

---

## 🌐 Zero-Cost Static Deployment

### Option A: Cloudflare Pages (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and set:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**. Your game is immediately live at `https://your-project.pages.dev` with free SSL, CDN, and unlimited bandwidth!

### Option B: GitHub Pages
1. In `vite.config.ts`, ensure `base: './'` is configured (already pre-configured).
2. Go to your GitHub repository **Settings** > **Pages**.
3. Under **Build and deployment**, select **GitHub Actions** and choose the **Static HTML** or **Node.js** workflow.
4. Run `npm run build` and deploy the `dist/` directory.

---

## 🔒 Child Privacy & Accessibility

- **No Data Collected**: Real names, emails, dates of birth, school info, and phone numbers are never requested.
- **Local Storage Only**: Progress is stored purely in the user's browser via `localStorage` key `english-adventure-save-v1`.
- **Keyboard & Touch Ready**: Every exercise supports touch taps and keyboard interaction (`Tab`, `Space`, `Enter`).
- **Reduced Motion Support**: An in-game toggle in the Settings modal disables celebration confetti and heavy animations.
- **Audio Independence**: All activities can be completed visually even if audio synthesis is unavailable on the user's device.
