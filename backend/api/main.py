import torch
from fastapi import FastAPI
from pydantic import BaseModel
from model.model import MiniLanguageModel

app = FastAPI()

checkpoint = torch.load("model.pt")
stoi = checkpoint["stoi"]
itos = checkpoint["itos"]

model = MiniLanguageModel(len(stoi))
model.load_state_dict(checkpoint["model"])
model.eval()

class InputText(BaseModel):
    text: str

@app.post("/predict-next-word")
def predict(data: InputText):
    words = data.text.lower().split()
    tokens = [stoi[w] for w in words if w in stoi]

    if len(tokens) < 3:
        return {"error": "Minimum 3 words required"}

    x = torch.tensor([tokens[-3:]])

    with torch.no_grad():
        logits = model(x)
        pred = torch.argmax(logits, dim=1).item()

    return {"next_word": itos[pred]}
