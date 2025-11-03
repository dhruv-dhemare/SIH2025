# Digital Platform for Centralized Alumni Data Management and Engagement

Welcome to the repository for **Team Delulu_Guys'** project for **Smart India Hackathon 2025**.  
This project addresses problem statement **SIH25017**: _Digital Platform for Centralized Alumni Data Management and Engagement_, under the **Smart Education** theme.

---

## 🚀 Project Description

This project is a centralized, AI-powered digital platform designed to connect students, alumni, clubs, recruiters, and college administrators. The solution is more than a database—it's an active, intelligent, and engaged community ecosystem.

The platform leverages a polyglot technology stack (React, Node.js, PostgreSQL, MongoDB, and Python) to deliver a robust, scalable, and intelligent platform.  
Key AI-powered features include:

- **Smart profile builder** that parses resumes and LinkedIn profiles.
- **AI recommendation system** for mentorship and jobs.
- **Automated system** for selecting alumni chapter representatives.

---

## ✨ Core Features

- **Centralized Alumni Database:** Unified platform for all users (students, alumni, admin, recruiters) to search and connect by name, batch, location, or domain.
- **ML-Powered Smart Profile Builder:** ML models (Gemini, PaddleOCR) extract data from LinkedIn, resumes, and portfolios. Enable one-click profile creation and updates.
- **AI-Powered Recommendation System:** Suggests mentors, internships, and job opportunities based on user profiles, interests, and activity logs.
- **Structured Communication System:** Inbuilt chat for personal messages, domain-based groups, and batch/region-wise communities.
- **Active Alumni Chapters:** Region- and batch-wise alumni communities with ML-selected representatives for leadership and engagement.
- **Long-Term Engagement:** Fosters connection through mentorship, collaboration, club integrations, job/internship board, and fundraising portal.
- **Performance Analytics:** Dashboard for administrators to track engagement, placement history, and other key metrics.

---
## 🎥 Demo Video

Watch a demo of our platform here: [YouTube Demo](https://www.youtube.com/watch?v=MCv1bbrVREs)

---

## 💻 Technology Stack

| Category             | Technology                                  |
|----------------------|---------------------------------------------|
| Frontend             | React.js, [Vite](https://vitejs.dev)        |
| Backend              | Node.js, Express.js                         |
| Databases            | PostgreSQL, MongoDB, Redis (for caching)    |
| AI/ML & Data         | Python, Gemini, spaCy, PaddleOCR            |

---

## 🧠 ML Model Workflows

The platform's intelligence is driven by three core ML models:

1. **Alumni Representative Selection:**  
   Selects chapter leaders by computing a "Willingness Score" from user flags and an "Engagement Score" from activity logs. Ranks candidates for best fit.

2. **Profile Parsing & Auto-Build:**  
   Uses NLP (Gemini, spaCy) and OCR (PaddleOCR) to extract & structure key information (name, skills, education, experience) from resumes/LinkedIn for seamless profile updates.

3. **Personalized Recommendation System:**  
   Extracts key features from user data to recommend mentors, alumni-student connections, jobs, and internships.

---

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Python 3.8+
- PostgreSQL
- MongoDB
- Redis

### Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/dhruv-dhemare/SIH2025.git
cd SIH2025
```

#### 2. Install Backend Dependencies (Node.js)
```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies (React)
```bash
cd ../frontend
npm install
```

#### 4. Environment Setup
- Copy `.env.example` → `.env` in **backend**, **frontend**, and **python_service** folders.
- Fill required variables (DB connection strings for PostgreSQL, MongoDB, Redis; API keys for Gemini, etc.)

#### 5. Database Setup
- Ensure PostgreSQL, MongoDB, and Redis are running.
- Run any migrations or setup scripts as provided.

#### 6. Set Up Python ML Services
```bash
cd ../python_service
pip install -r requirements.txt
```

#### 7. Run the Application
In separate terminals:

- **Backend**
  ```bash
  cd backend
  npm start
  ```
- **Frontend**
  ```bash
  cd frontend
  npm start
  ```
- **Python Service**
  ```bash
  cd python_service
  python app.py
  ```

---

## 💡 Usage

Once running locally:

- **Frontend**: [http://localhost:3000](http://localhost:3000) (or as specified by Vite)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Python API**: [http://localhost:8000](http://localhost:8000) (or as configured)

Users can register, sign in, and explore features based on their role:

- Student
- Alumni
- Recruiter
- Club
- College Administration

---

## 🧑‍💻 Team: Delulu_Guys

- Dhruv Dhemare (Team Leader)
- Disha Bhelke
- Apoorv Deshmukh
- Sharvari Jamkar
- Gargi Kalekar
- Shreya Magar

---

## 🤝 Contributing

Your contributions are welcome! Please fork the repo and create a pull request.  
For discussions or issues, please use the [GitHub Issues](https://github.com/dhruv-dhemare/SIH2025/issues) section.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

For queries, reach out via GitHub Issues or contact the project maintainers.
