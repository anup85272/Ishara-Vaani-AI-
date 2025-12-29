
# 🤟 IsharaVaani

**IsharaVaani** is a state-of-the-art Sign Language Recognition and Translation platform designed to empower the Deaf community. By leveraging MediaPipe, TensorFlow.js, and Google's Gemini AI, IsharaVaani translates Indian Sign Language (ISL) into text and speech in real-time, bridging communication gaps across English and Hindi.

## 🚀 Key Features

- **Real-time Recognition**: Low-latency sign-to-text translation using webcam tracking.
- **Reverse Translation**: Convert text phrases into visual signing guides and instructions.
- **Multilingual Support**: High-fidelity translation between English, Hindi, and ISL.
- **Gamified Learning**: Progress-based curriculum with streak tracking and XP rewards.
- **Glassmorphic UI**: High-end aesthetic designed for accessibility and modern user experience.

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Framer Motion.
- **AI/ML Core**: MediaPipe Hands (Hand Landmark Detection).
- **LLM Integration**: Google Gemini 3 Flash for semantic sign interpretation.
- **State Management**: React Hooks & Context API.
- **Real-time Processing**: Client-side coordinate sampling for low latency.

## 📦 Project Structure

```bash
/
├── components/          # Reusable UI modules (Sidebar, Cards, etc.)
├── hooks/               # Custom React hooks (Camera, MediaPipe)
├── services/            # API integration (Gemini, Speech)
├── types.ts             # Global TypeScript interfaces
├── App.tsx              # Application routing and layout
└── index.tsx            # Entry point
```

## 🏗️ Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/IsharaVaani.git
    cd IsharaVaani
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file and add your Google AI (Gemini) API Key:
    ```env
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run the application**:
    ```bash
    npm start
    ```

## 🧠 Design Philosophy

IsharaVaani follows a **Trust-First** design approach:
- **Colors**: Deep Blue (#1E3A8A) for reliability and Teal (#14B8A6) for vitality.
- **Accessibility**: High-contrast ratios, large interactive zones, and full screen-reader support.
- **Performance**: Edge-computing for landmark tracking ensures data privacy and speed.

---

*IsharaVaani - Your Hands, Their Voice.*
