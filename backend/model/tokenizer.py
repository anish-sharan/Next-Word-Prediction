class Tokenizer:
    def __init__(self, text):
        words = text.lower().split()
        self.vocab = sorted(set(words))
        self.stoi = {w: i for i, w in enumerate(self.vocab)}
        self.itos = {i: w for w, i in self.stoi.items()}

    def encode(self, text):
        return [self.stoi[w] for w in text.lower().split() if w in self.stoi]

    def decode(self, idx):
        return self.itos[idx]
