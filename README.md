# AI Arena 🏛️  
**Multiple Local AIs. One Referee. One Final Answer.**

AI Arena is a **privacy-first multi-agent AI playground** where multiple AI models generate answers in parallel, evaluate each other through a council-style judging system, and deliver one **enhanced, reliable, and transparent** final response.

This project was built for **Open Innovation** and integrates Google’s AI ecosystem with local model execution for maximum privacy and unbiased results.

---

## 🚀 What Problem Does AI Arena Solve?

- Users can’t verify which AI model gives the **best or most accurate answer**
- Single-model dependency leads to **bias, incomplete logic, or hallucinated responses**
- No built-in system to **validate or score AI responses**
- Cloud-only AI raises **privacy and data security concerns**

---

## 💡 Our Solution

AI Arena runs a **Multi-Agent Council System**:

1. Multiple AI agents generate answers simultaneously  
2. An AI referee evaluates responses on:
   - **Correctness**
   - **Clarity**
   - **Usefulness**
   - **Completeness**
3. The best answer is enhanced using **Google Gemini API**
4. Results and reasoning are shown **side-by-side with real-time scoring**
5. All conversations are saved for future reference

---

## ⭐ What Makes AI Arena Different?

### 1. **Multi-Agent Council System**
- Multiple AI models run in **parallel**
- Peer evaluation ensures **diverse perspectives**
- Ranking logic reduces bias and improves answer accuracy

### 2. **Privacy-First Architecture**
- Supports **local model execution via Ollama**
- No data leaves your device when using local agents
- Full control over queries and conversation history

### 3. **3-Stage Quality Assurance**
- Independent agent answers  
- Peer scoring & ranking  
- Chairman synthesis for the best possible final answer

### 4. **Transparency & Explainability**
- View **all agent responses**
- Understand **why one answer wins**
- Analytics & history tracking built in

---

## 🔧 Technologies Used

### **Google Technologies**
- **Google Gemini API** (Agent + Referee + Enhancement)
  - Model used: `gemini-1.5-flash`
  - Fast, efficient, and high-quality response refinement
- **Google Firebase**
  - Google OAuth Authentication
  - User session & profile management
  - Security-first access control

### **Additional Tech Stack**
- **Frontend:** React, TypeScript, Vite, TailwindCSS  
- **Backend:** FastAPI (Python) + OpenRouter API  
- **Local AI:** Ollama (Mistral models)  
- **UI/UX:** Framer Motion, Lenis Smooth Scroll, Radix UI, shadcn/ui  

---

## 🧠 How It Works (Council Flow)

