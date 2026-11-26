Based on the **Capstone Project Learner Guide**, here are the specific elements, learning units, and practical activities required for a complete capstone submission that are missing or incomplete in the current **AlgoPulse** draft:

-----

### 1\. Learning Unit 1: The Empathy Engine

  * **Empathic Data / Research Documentation (Activity 2 & Checklist):**
      * The guide requires documenting real or simulated empathic research data, such as a complete transcript/log of an AI-assisted persona interview, a full persona profile (including name, background, goals), or a visual/mapped **User Journey Map** showing emotional highs/lows (e.g., *Receive Assignment/Setup → Hit Error → Seek Help → Resolution*).

-----

### 2\. Learning Unit 2: From Insight to Impact

  * **User Storyboard (Phase 5, Activity 5 & Checklist):**
      * A 6–8 frame visual/narrative **storyboard** illustrating the user's emotional arc—from the initial trigger (e.g., getting burned by panic selling during a drop) to interacting with AlgoPulse, reaching the "Aha\!" moment, and achieving resolution.
  * **Acceptance Criteria (Section 3.4.2):**
      * Detailed *Given-When-Then* scenarios for critical user stories (e.g., validation rules for risk entry or backtest execution behavior).

-----

### 3\. Learning Unit 3: Prototyping

  * **Prototype Artifacts & Fidelity Phases (Activities 1–4):**
      * **Low-Fidelity Sketches:** Paper sketches or digital wireframe iterations for key screens prior to coding.
      * **Interactive Proof of Concept (PoC):** Details on using AI-powered IDEs (e.g., Windsurf) to generate boilerplate UI layouts and wire components.
  * **User Testing & Iteration Log (Phase 5, Activity 5):**
      * Documentation of informal user feedback from testing the prototype with peers/traders, along with a log of at least **3 documented refinements** made based on that feedback.

-----

### 4\. Learning Unit 4: Mock Data & Test Cases

  * **Structured Mock Data Samples (Activity 2):**
      * Actual generated **JSON datasets** (e.g., user profiles, trade history, market price ticks) and alternate data formats (**CSV** export logs or **SQL** seed data) ensuring referential integrity across users, strategies, and orders.
  * **Unit Test Ideas & Automation (Section 3.3.4):**
      * Code-level unit test definitions for core functions (such as SMA/RSI calculation or P\&L execution logic).

-----

### 5\. Learning Unit 5: Project Documentation & Version Control

  * **Repository Documentation Files (Activity 2 & 4):**
      * **`README.md`**: Project overview, installation steps, tech stack breakdown, and screenshots.
      * **User Guide / Manual (`docs/user-guide.md`)**: Step-by-step non-technical tutorial, FAQs, and troubleshooting.
      * **Technical Documentation (`docs/technical.md`)**: Architecture overview, API endpoints, data flow, and database schema explanation.
  * **Git Commit History & Conventional Commits (Activity 3 & 4):**
      * Examples and log of formatted **Git commit messages** following the *Conventional Commits* specification (`feat(...)`, `fix(...)`, `docs(...)`).

-----

### 6\. Learning Unit 6: AI-Powered Integration

  * **In-App AI Integration Architecture (LO6 & Activities 1–6):**
      * **API Access & Configuration:** Details on configuring an LLM API (e.g., Google Gemini API key handling via environment variables).
      * **Structured JSON Mode:** Using LLMs programmatically to return structured JSON data (e.g., strategy performance summaries or risk warnings).
      * **Function Calling / Tool Use (Section 3.4):** Implementing tool declarations (`functionDeclarations`) so the AI can perform actions within the app (e.g., querying strategy parameters or executing backtest requests).
      * **Resilience & UX Polish:** Implementation of retry logic, rate limiting, error fallbacks, and UI loading states.

-----

### 7\. Final Reflection & Presentation (Section 8.0)

  * **One-Page Final Reflection:** A narrative section detailing key challenges, AI-assisted workflow insights, and personal learnings.
  * **5-Minute Project Demonstration Structure:** An outlined presentation flow demonstrating all 6 Learning Units.
