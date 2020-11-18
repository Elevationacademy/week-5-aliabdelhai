
const express = require('express')
const { data } = require('jquery')
const router = express.Router()

const wordCounter = {  haha: 1, ali:3, dania:4, hehe: 90, is: 2, shoobei: 10, tamir: 8}


router.get('/sanity', function (req, res) {
    console.log("Server up and running ")
    res.send('haha')
})


router.get('/word/:word', function (req, res) {
    const word = req.params.word
    if(wordCounter[word])
    {
        const obj = {count: wordCounter[word]}
        res.send(obj)
    }
    else{

    }
    res.send({count: 0})
})



router.post('/word', function (req, res) {
    const word =  req.body.word;
    if(wordCounter[word])
    {
        wordCounter[word]++
    }
    else{
        wordCounter[word] = 1;
    }
    const addedData = {text: `Added ${word}`, currentCount: `${wordCounter[word]}`}
    const finalData = JSON.stringify(addedData)
    res.send(finalData);
    
})


router.post('/words', function (req, res) {
    const sentence =  req.body.sentence;
    const words = sentence.split(" ");
    let numNewWords = 0;
    let numOldWords = 0;
    for (let word of words)
    {
        if (wordCounter[word])
        {
            numOldWords++
            wordCounter[word]++
        }
        else
        {
            numNewWords++
            wordCounter[word] = 1
        }
    }
    const addedData = {text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: -1}
    const finalData = JSON.stringify(addedData)
    res.send(finalData);
    
})


router.get('/total', function (req, res) {
    let sum =0;
    Object.entries(wordCounter).forEach(([key, value]) => {
        sum += value
    });
    res.send({text: "Total count", count: sum });

})



router.get('/popular', function (req, res) {
    const arr = Object.values(wordCounter);
    const max = Math.max(...arr);
    const word = Object.keys(wordCounter).find(key => wordCounter[key] === max); 
    res.send({text: word, count: max });
    
})

router.get('/ranking', function (req, res) {

    const array = Object.entries(wordCounter)
    array.sort(function(a, b){return b[1]-a[1]})
    const sortedArray = []
    for(let i=0; i< 5; i++){
        const words = {}
        const key = array[i][0]
        words[key]= array[i][1]
        sortedArray.push(words)
    }
    res.send({ranking: sortedArray});  

})




module.exports = router
