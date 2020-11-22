
///////// EX1 + EX2 ////////////////////////

$.get('/randomWord')
    .then(function (word) {
        let book = $.get(`/books/${word}`)
        let giphy = $.get(`/gifs/${word}`)
        Promise.all([book, giphy])
                .then(function (results) {
                    const bookTitle = results[0].items[0].volumeInfo.title
                    const gif = results[1]
                    $('body').append(
                        $(`<div class = 'title'>${bookTitle}</div>
                                <div><iframe src="${gif}"></iframe></div>`)
                        )

                })

    })
    


