import torch
from torch.utils.data import DataLoader
from tokenizer import Tokenizer
from dataset import NextWordDataset
from model import MiniLanguageModel

# Load corpus
text = open("data/corpus.txt").read()

# Tokenize
tokenizer = Tokenizer(text)
tokens = tokenizer.encode(text)

# Dataset
dataset = NextWordDataset(tokens)
loader = DataLoader(dataset, batch_size=2, shuffle=True)

# Model
model = MiniLanguageModel(len(tokenizer.vocab))
loss_fn = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Training loop
for epoch in range(300):
    total_loss = 0
    for x, y in loader:
        optimizer.zero_grad()
        output = model(x)
        loss = loss_fn(output, y)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    if epoch % 50 == 0:
        print(f"Epoch {epoch} | Loss {total_loss:.4f}")

# Save
torch.save({
    "model": model.state_dict(),
    "stoi": tokenizer.stoi,
    "itos": tokenizer.itos
}, "model.pt")

print("Model trained & saved")
