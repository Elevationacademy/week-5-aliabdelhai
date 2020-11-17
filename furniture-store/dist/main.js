
let money = 500;

$('#money').text(`Current money: $${money}`);


const search = function () {
    let input = $("#my-input").val()

    $.get(`priceCheck/${input}`, function (data) {
        $("body").append(`<div>Price: $${data.price}</div>`)
    })
}


const buy = function () {
    let input = $("#buy").val()

    $.get(`buy/${input}`, function (data) {
        if(money > data.price)
        {
            $("body").append(`<div> Congratulations, you've just bought ${data.name} for $${data.price}. There are ${data.inventory} left now in the store.
            </div>`)
            money -= data.price;
            $('#money').text(`Current money: $${money}`);
        }
        else{
            $("body").append(`<div> You should get a job </div>`)

        }
    })
}
