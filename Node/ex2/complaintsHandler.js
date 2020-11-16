

const handleComplaints = function(complaint){
    switch(complaint.type){
        case obj.FINANCE :
            console.log("Money doesn't grow on trees, you know.")
            break;
        case obj.WEATHER :
            console.log("It is the way of nature. Not much to be done.")
            break;
        default:    
            console.log("It'll pass, as all things do, with time.")

    }
}

const obj = require('./consts')
module.exports.handleComplaints = handleComplaints
