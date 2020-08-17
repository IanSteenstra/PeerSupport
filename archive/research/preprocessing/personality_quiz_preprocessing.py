import pandas as pd

df = pd.read_csv("personality_quiz_responses.csv")

cat_columns = df.select_dtypes(['object']).columns[1:]
for col in cat_columns:
    df[col] = df[col].astype('category')

df[cat_columns] = df[cat_columns].apply(lambda x: x.cat.codes)

df.to_csv(r'C:\Users\steeni\Documents\Github\PeerSupport\research\training\processed_personality_quiz_responses.csv')
