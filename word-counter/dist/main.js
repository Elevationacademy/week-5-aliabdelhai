


const searchForWords = function()
{
    const word = {word: "hello"};
    $.post("/word", word, function(response)
    {
        $('#results').empty().append(response);
    });
};

const searchForSentences = function()
{
    const sentence = {sentence: "hello my name is ali"};
    $.post("/words", sentence, function(response)
    {
        $('#results').empty().append(response);
    });
};
