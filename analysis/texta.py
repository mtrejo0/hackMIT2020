import random
import nltk
import requests
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import FreqDist
#nltk.download('popular')

#pre-processing and grab text
url_start = "https://www.gutenberg.org/files/"
bookid = "768"
full_url = url_start + bookid + "/" + bookid + ".txt"

#create  Text object
def grab_text_and_process(full_url):
    r = requests.get(full_url)
    tokens = nltk.word_tokenize(r.text)
    text = nltk.Text(tokens)
    return text

#create pos tagger
def pos_tagged(text):
    return nltk.pos_tag(text)

#sentiment analysis
nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()
def sentan_scores(raw):
    scores = sid.polarity_scores(raw)
    #format is dict containing: {'neg': 0.072, 'neu': 0.859, 'pos': 0.069, 'compound': -0.8426}
    return scores

def sent(scores):
    if scores["neg"] - scores["pos"] > 0:
        return "neg"
    elif scores["neg"] - scores["pos"] < 0:
        return "pos"
    else:
        return "neut"

#similar words (words used in the same context -> ex monstrous)
def similar_words(text, w="monstrous"):
    return text.similar(w)

#num words in text
def num_words_total(text):
    return len(text)

#percentage distinct words
def lexical_diversity(text):
    len(set(text)) / len(text)

#finds most common words
def common_words_50(text):
    fdist = FreqDist(text)
    return fdist.most_common(50)

# random pseudo common word from set
def random_common_word(cw):
    cw.remove("CHAPTER")
    cw.remove("Chapter")
    return random.choice(cw)

#returns all of some part of speech "tag" in text
#tags are: NN (noun), RB (adverb), VB (verb), JJ (ajective)
def only_pos(postag, tag="NN"):
    return [i for i, j in postag if tag in j]

def top_num(w, num="10"):
    return w[:num]

def piechart(postag, numwords):
    pie = []
    count = 0

    pn = len(only_pos(postag, "NN"))/numwords
    pie += [{"category": "NN", "value": pn}]
    count += pn

    pn = len(only_pos(postag, "JJ"))/numwords
    pie += [{"category": "ADJ", "value": pn}]
    count += pn

    pn = len(only_pos(postag, "VB"))/numwords
    pie += [{"category": "VB", "value": pn}]
    count += pn

    pn = len(only_pos(postag, "RB"))/numwords
    pie += [{"category": "ADV", "value": pn}]
    count += pn

    pie += [{"category": "OTHER", "value": count}]

    return pie


def analyse_book(id):
    url_start = "https://www.gutenberg.org/files/"
    full_url = url_start + id + "/" + id + "-0.txt"
    print(full_url)
    text = grab_text_and_process(full_url)
    postag = pos_tagged(text)
    num = num_words_total(text)
    data = {
        'common_words': common_words_50(only_pos(postag)),
        'pie': piechart(postag, num)
    }
    return data


# text = grab_text_and_process(full_url)
# postag = pos_tagged(text)
# num = num_words_total(text)
# print(top_10(only_pos(postag)))
# print(common_words_50(only_pos(postag)))
# print(piechart(postag, num))

'''
possibliities with these functions:
- return the most commonly used words of a pos category by the author (list)
        - top from all words (max 50, includes punctuation)
        -top num most common nouns, adverbs, adjectives (list)
        - display a random common word (from a pos category or not) (string)
- display the sentiment of the entire book (dict of sentiments)
        - get if "pos", "neg" or "neut" (string)
- display words used in the same context as a certain query word (list)
- display the lexical diversity of the book (decimal)
- display num words in book (int)
- create piechart with 5 categories (noun, adj, adv, vb, other)
        -returns dict of "NN", "ADJ", "ADV", "VB", "OTHER" with corresponding decimals (percentages)
'''