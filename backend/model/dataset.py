import torch
from torch.utils.data import Dataset

class NextWordDataset(Dataset):
    def __init__(self, tokens, seq_len=3):
        self.x = []
        self.y = []

        for i in range(len(tokens) - seq_len):
            self.x.append(tokens[i:i+seq_len])
            self.y.append(tokens[i+seq_len])

    def __len__(self):
        return len(self.x)

    def __getitem__(self, idx):
        return torch.tensor(self.x[idx]), torch.tensor(self.y[idx])
