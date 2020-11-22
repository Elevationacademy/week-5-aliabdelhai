const express = require('express')
const router = express.Router()
const urllib = require('urllib');



//API that returns a random word
router.get('/randomWord', function (req, res) {
    let words = ['Bonanza', 'Elusive', 'Hindrance', 'Astute', 'Polaroid', 'Phonic', 'Yonder']
    res.send(words[Math.floor(Math.random() * words.length)])
})


router.get('/books/:word', function (req, res) {
    let word = req.params.word
    urllib.request(`https://www.googleapis.com/books/v1/volumes?q=intitle:${word}`, function(err, response){
        const data = JSON.parse(response.toString())
        res.send(data)
    })
})

router.get('/gifs/:word', function (req, res) {
    let word = req.params.word
    urllib.request(`http://api.giphy.com/v1/gifs/search?q=${word}&api_key=XtKfO02MaHWV000rlrFS58c0hjGxDKJu`, function(err, response){
        const data = JSON.parse(response.toString()).data
        const embedURLs = data.map(x => x.embed_url);
        const giphy = embedURLs[0]
        res.send(giphy)
    })
})

//API that returns synonyms for a word
router.get('/synonyms/:word', function (req, res) {
    let thesauraus = {
        'Absolute': ['Definitive', 'Certain', 'Sure', 'Unequivocal'],
        'Astute': ['Sharp', 'Poignant', 'Clever'],
        'Azure': ['Blue', 'Cyan', 'Sky-blue'],
        'Bright': ['Luminous', 'Brilliant'],
        'Bonanza': ['Plethora', 'Smorgasboard', 'Copious', 'Plenty'],
        'Elusive': ['Slick', 'Slippery', 'Ethereal', 'Loose'],
        'Erode': ['Destroy', 'Wear out', 'Tarnish'],
        'Hindrance': ['Bother', 'Disturbance', 'Problematic'],
        'Phonic': ['Soundful'],
        'Ploy': ['Plan', 'Ruse'],
        'Polaroid': ['Photograph'],
        'Yap': ['Bark', 'Blab', 'Chatter'],
        'Yonder': ['There', 'Away', 'Far', 'Afar']
    }

    let word = req.params.word
    res.send(thesauraus[word])
})

//API that returns the sentiment of a word: Positive (1), Negative (-1), or Neutral (0)
router.get('/sentiment/:word', function (req, res) {
    let word = req.params.word
    let wordSentiment = {
        'Absolute': 1,
        'Astute': 1,
        'Azure': 0,
        'Bright': 1,
        'Bonanza': 1,
        'Elusive': -1,
        'Erode': -1,
        'Hindrance': -1,
        'Phonic': 0,
        'Ploy': 0,
        'Polaroid': 0,
        'Yap': -1,
        'Yonder': -1
    }

    res.send(JSON.stringify(wordSentiment[word]))
})


module.exports = router
