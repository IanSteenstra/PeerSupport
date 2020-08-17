import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import preprocessing
import re
import joblib
import os


class SuicidalIdeationModel:
    def __init__(self, text):
        dir_path = os.path.dirname(os.path.realpath(__file__))

        self.text = text
        self.model = joblib.load(dir_path + '\\suicidal_classifier.pkl')

    def predict(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))

        data = pd.DataFrame(columns=('text', 'suicidal_ideation'))
        for i in range(10):
            data = pd.concat(
                [data, pd.read_csv(dir_path + '\\datasets\\annotated_data'+str(i)+'.csv')], sort=False)

        X = data['text']
        X = X.apply(lambda text: re.sub(r"http\S+", "", text).lower())

        text = pd.DataFrame({'text': [self.text]})

        print(text)
        # tfidf = TfidfVectorizer(analyzer='word', ngram_range=(1, 2))
        # features = pd.DataFrame(tfidf.fit_transform([self.text]).toarray())
        # print(features)
        # features = features.values
        # min_max_scaler = preprocessing.MinMaxScaler()
        # features_scaled = min_max_scaler.fit_transform(features)
        # features = pd.DataFrame(features_scaled)
        # prediction = self.model.predict(features)
        # return prediction


if __name__ == '__main__':
    content = 'I want to die'
    s = SuicidalIdeationModel(content)
    print(s.predict())
