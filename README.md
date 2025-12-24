# 🚀 Mini Next-Word Prediction Model (From Scratch)

A mini language model built from scratch using PyTorch and served with FastAPI, with a React (Vite) frontend for real-time word prediction. This project demonstrates the core ideas behind GPT-style models without using any pretrained models or tokenizers.

---

## 📸 Demo

![Application Demo](screenshots/Screenshot%20from%202025-12-24%2023-50-14.png)

---

## ✨ Features

- 🧠 **Custom tokenizer** (no pretrained vocab)
- 🔤 **Next-word prediction** using LSTM
- 🔁 **Sliding-window language modeling**
- ⚡ **FastAPI backend** for inference
- 🎨 **React UI** with real-time predictions
- 🔌 **Vite proxy** for seamless frontend–backend integration
- 📦 **Clean project structure** (ML + API + UI)

---

## 🏗️ Tech Stack

### Backend / ML
- Python
- PyTorch
- FastAPI
- Uvicorn

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react

---

## 📂 Project Structure

```
mini-next-word-predictor/
│
├── backend/
│   ├── data/
│   │   └── corpus.txt
│   │
│   ├── model/
│   │   ├── tokenizer.py
│   │   ├── dataset.py
│   │   ├── model.py
│   │   └── train.py
│   │
│   ├── api/
│   │   └── main.py
│   │
│   ├── model.pt
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🧠 How It Works

1. **Text corpus** is tokenized using a custom vocabulary
2. **Training data** is generated using a sliding window
3. An **LSTM-based language model** learns:
   ```
   P(next_word | previous_words)
   ```
4. Model is trained from **random initialization**
5. **FastAPI** exposes `/predict-next-word` endpoint
6. **React frontend** fetches predictions as you type

---

## 📊 Example

### Input
```
machine learning is
```

### Output
```json
["fun"]
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/anish-sharan/Next-Word-Prediction.git
cd Next-Word-Prediction
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Train the model:**

```bash
python model/train.py
```

**Start FastAPI server:**

```bash
uvicorn api.main:app --reload
```

Server runs at: `http://127.0.0.1:8000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoint

### `POST /predict-next-word`

**Request:**
```json
{
  "text": "machine learning is"
}
```

**Response:**
```json
{
  "next_word": "fun"
}
```

---

## 🧪 Model Details

| Component | Description |
|-----------|-------------|
| **Architecture** | Embedding → LSTM → Linear |
| **Loss Function** | Cross-Entropy |
| **Optimizer** | Adam |
| **Training** | From scratch (no pretrained weights) |
| **Context Window** | Last 3 tokens |

---

## 🚧 Limitations

- Small model (educational purpose)
- Limited vocabulary
- No semantic understanding like GPT
- CPU-friendly (not optimized for scale)

---

## 🚀 Future Improvements

- [ ] Temperature-based sampling
- [ ] Top-K / Top-P decoding
- [ ] Predict multiple words
- [ ] Transformer-based mini-GPT
- [ ] Larger datasets (WikiText-2 / WikiText-103)
- [ ] Model versioning & checkpoints
- [ ] Dockerized deployment

---

## 🎯 Why This Project Matters

This project demonstrates:

- ✅ Deep understanding of language modeling
- ✅ Ability to train ML models from scratch
- ✅ Full-stack ML engineering (Model → API → UI)
- ✅ Clear separation of concerns
- ✅ Production-style architecture

**Perfect for:**
- ML portfolios
- Technical interviews
- Learning how LLMs work internally

---

## 📜 License

MIT License

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/anish-sharan/Next-Word-Prediction).

---

## 👨‍💻 Author

**Anish Sharan**

- GitHub: [@anish-sharan](https://github.com/anish-sharan)
- LinkedIn: [Anish Sharan](https://www.linkedin.com/in/anish-sharan-7173571b3/)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ and PyTorch**