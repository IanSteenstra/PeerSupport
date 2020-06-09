import pandas as pd
import numpy as np

class SuicidalIdeationModel:
    def __init__(self, content):
        self.content = content
    
    def predict(self):
        return len(self.content)