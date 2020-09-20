import requests

def get_url(query):
    client_id = 'g33KGfzujYBlkqa8mPNB4GQOEafcAK7H9tWdhD9aufg'
    url = 'https://api.unsplash.com/search/photos'
    # Retrieving unsplash image
    unsplash_image = requests.get(url, params={'client_id': client_id, 'query': query}).json()['results'][2]['urls']['small']
    return unsplash_image

# returns google dreamed picture url
def dreamed_pic(img_url):
    r = requests.post(
        "https://api.deepai.org/api/deepdream",
        data={
            'image': img_url,
        },
        headers={'api-key': '70c20313-7eed-4100-becf-19d0b102aaed'}
    )
    json_url = r.json()
    return json_url["output_url"]

#tests the query feature
#print(dreamed_pic(dreamed_pic(get_url("tree"))))