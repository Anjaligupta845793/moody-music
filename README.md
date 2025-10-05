# Moody-Music 🎵: Your Personal AI DJ

**A conversational AI that understands your mood and curates the perfect music playlist just for you. Built for the [Your Hackathon Name Here]!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![made-with-react](https://img.shields.io/badge/Made%20with-React-1f425f.svg)](https://reactjs.org/)
[![styled-with-tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-38b2ac.svg)](https://tailwindcss.com/)

---

## 🚀 The Problem

Finding the right music to match your current emotional state is a constant challenge. You scroll endlessly through generic playlists, skip tracks, and waste time searching for that perfect song. Existing music recommendation engines are good, but they lack a deep, real-time understanding of your feelings.

## ✨ Our Solution

**Moody-Music** bridges the gap between emotion and music. We provide a seamless, conversational interface where you can chat with an intelligent AI. Simply talk about your day, your thoughts, or how you're feeling, and our AI will:

1.  **Analyze** the sentiment and context of your conversation.
2.  **Understand** your unique mood.
3.  **Generate** a personalized list of music tracks tailored to you in that very moment.

Our vision is to fully integrate with Spotify and YouTube, allowing you to instantly create and save these mood-based playlists to your favorite platform.

---

## 🎥 Demo

*(It is HIGHLY recommended to add a short GIF or video of your application in action here. It's the best way to showcase your work.)*

![Moody-Music Demo GIF](https://your-link-to-demo.gif)

---

## 🌟 Key Features

* **🧠 Conversational AI Chat**: Engage in a natural, free-flowing conversation with our AI companion.
* **🎶 Dynamic Mood Analysis**: Utilizes a powerful language model to perform real-time sentiment analysis and mood detection from your chat.
* **🎧 Instant Music Curation**: Generates a list of song recommendations perfectly aligned with your detected mood.
* **(Next Step) One-Click Playlist Generation**: Seamlessly create and save your curated playlists to Spotify or YouTube using OAuth2 authentication.
* **🌐 Modern & Responsive UI**: A clean, intuitive, and beautiful user interface built for any device.

---

## ⚙️ How It Works

1.  **Chat**: The user interacts with the AI through a simple chat interface.
2.  **Analyze**: The backend sends the conversation transcript to a Large Language Model (e.g., Gemini, OpenAI GPT) to extract key emotions and themes, determining a "mood vector".
3.  **Generate**: This mood vector is used to query music APIs (e.g., Spotify's API with audio features like valence, energy, and danceability) to find matching tracks.
4.  **Display**: The curated song list is presented to the user.
5.  **(Future) Connect & Save**: The user authenticates with Spotify/YouTube via OAuth. The application then uses the respective APIs to create a new playlist with the generated tracks in the user's account.

---

## 🛠️ Tech Stack

* **Frontend**: Next js, Tailwind CSS
* **AI / LLM**: [Cerebras api key with llama-4-scout model]
* **Deployment**: [ Vercel]

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* Node.js (v18 or later)
* npm / yarn
* A `.env` file with your API keys (see `.env.example`)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Anjaligupta845793/moody-music](https://github.com/Anjaligupta845793/moody-music/edit/main/README.md)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd moody-music
    ```

3.  **Install dependencies (for both frontend and backend):**
    ```sh
    # In the root directory
    npm install

    # Navigate to client/frontend folder if it's separate
    cd client && npm install

    # Navigate to server/backend folder if it's separate
    cd ../server && npm install
    ```

4.  **Set up your environment variables:**
    Create a `.env` file in the root of your `server` directory and add the following:
    ```
    # Example .env file
    PORT=8080
    AI_API_KEY=your_gemini_or_openai_api_key
    
    ```

### Running the Application

1.  **Start the backend server:**
    ```sh
    # From the /server directory
    npm run start
    ```

2.  **Start the frontend development server:**
    ```sh
    # From the /client directory
    npm run dev
    ```

3.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## 🔮 Future Scope & Next Steps

We're excited about the future of Moody-Music! Our roadmap includes:

* **Complete Spotify & YouTube Integration**: Finish implementing the OAuth flow for playlist saving.
* **Multi-Platform Support**: Add support for Apple Music, SoundCloud, and other services.
* **Enhanced Mood Nuance**: Train or fine-tune the model to understand more complex moods like "nostalgic," "focused," or "adventurous."
* **Long-Term Memory**: Allow the AI to remember past conversations and music preferences for even better recommendations over time.
* **Shareable Playlists**: Create a feature to share generated playlists with friends directly from the app.

---

## 🏆 Hackathon Goals

For this hackathon, we successfully implemented the core functionality: a real-time conversational interface linked to an AI for mood analysis and music generation. Our next immediate goal is to finalize the OAuth integration, which is already in development.

---

## 🧑‍💻 The Team

* **[Anjali Gupta]** - [Full stack blockchain developer] - [https://www.linkedin.com/in/anjaliblockchaindev]


---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
