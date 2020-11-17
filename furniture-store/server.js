
const express = require('express')
const app = express()
const path = require('path')


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }
]

///////////////// EX1 ///////////////////////

app.get('/', function (request, response) {
    response.send("Server is up and running smoothly")
})


///////////////// EX2 + EX3 ///////////////////////

app.get('/priceCheck/:name', function(request, response){
    let name = request.params.name;
    for(let item of store)
    {
        if(item.name == name)
        {
            response.send({price: item.price})
            return;
        }
    }
    response.send({price: null});
})

///////////////// EX4 + EX5 ///////////////////////

app.get('/buy/:name', function (request, response) {
    let name = request.params.name
    
    for(let item of store)
    {
        if(item.name == name)
        {
            item.inventory--
            response.send(item)

        }
    }
})


///////////////// EX6 ///////////////////////

app.get('/sale', function (request, response) {
    let admin = request.query.admin
    if (admin === "true")
    for (let item of store)
    {
        if (item.inventory > 10)
        {
            item.price = Math.floor(item.price/2);
        }
    }
    response.send(store)
})



const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})
