import random
import nltk
from urllib import request
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import FreqDist
#nltk.download('popular')

#pre-processing and grab text
url_start = "https://www.gutenberg.org/files/"
bookid = "768"
full_url = url_start + bookid + "/" + bookid + ".txt"

def grab_text_and_process(full_url):
    response = request.urlopen(full_url)
    raw = response.read().decode('utf8')
    tokens = nltk.word_tokenize(raw)
    text = nltk.Text(tokens)
    return text

#sentiment analysis
nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()
def sentan_scores(raw):
    scores = sid.polarity_scores(raw)
    #format is dict containing: {'neg': 0.072, 'neu': 0.859, 'pos': 0.069, 'compound': -0.8426}
    return scores

#similar words (words used in the same context -> ex monstrous)
def similar_words(text, w="monstrous"):
    return text.similar(w)

#num words in text
def num_words_total(text):
    return len(text)

#percentage distinct words
def lexical_diversity(text):
    len(set(text)) / len(text)

#finds common words (hopefully excluding stop words, words like "said", etc.)
def common_words(text):
    fdist = FreqDist(text)
    return sorted(w for w in set(text) if fdist[w] >= 10 and fdist[w] <=35)

# random pseudo common word from set
def random_common_word(cw):
    cw.remove("CHAPTER")
    cw.remove("Chapter")
    return random.choice(cw)

text = grab_text_and_process(full_url)
print(common_words(text))