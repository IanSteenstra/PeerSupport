# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import pandas as pd

file_name = 'data3.xlsx' 
df = pd.read_excel(file_name)[['text', 'suicidal_ideation']]


for index, row in df.iterrows():
    X = row['text']
    Y = row['suicidal_ideation']
    print('*'*100)
    print("Text #: ", index)
    print("Could the following text indicate the want to commit suicide?")
    print(X)
    check = True
    while(check):
        ans = input("Please enter y for YES or n for NO: ").lower()
        if ans == "yes" or ans =='y':
            df["suicidal_ideation"][index] = 1
            check = False
        elif ans == "no" or ans =='n':
            df["suicidal_ideation"][index] = 0
            check = False
        else:
            print("!!!!Invalid input!!!!")
    break


df.to_csv('annotated_data3.csv', index=False)