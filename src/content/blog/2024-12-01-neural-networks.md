---
title: 'Understanding Neural Networks'
description: 'A deep dive into the architecture of neural networks.'
pubDate: '2024-12-01'
heroImage: '/blog-placeholder-2.jpg'
---

## The Perceptron

The building block of neural networks is the perceptron.

### Activation Functions

Common activation functions include:

- **ReLU**: $f(x) = \max(0, x)$
- **Sigmoid**: $\sigma(x) = \frac{1}{1 + e^{-x}}$

## Implementation in PyTorch

```python
import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(10, 5)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(5, 1)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x
```
