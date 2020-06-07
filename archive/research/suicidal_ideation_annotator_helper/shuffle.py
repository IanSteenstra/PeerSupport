# -*- coding: utf-8 -*-
"""
Created on Fri Apr  3 17:47:50 2020

@author: steeni
"""

import pandas as pd
import numpy as np

df = pd.read_excel('combined_data.xlsx')

df = df.sample(frac=1)

split_df = np.array_split(df, 10)

for idx, sp in enumerate(split_df):
    sp.to_excel('data'+str(idx)+'.xlsx')